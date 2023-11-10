'use server'
// TODO: figure out the way that i should use foreign keys
// TODO: make naming consistent with ask/bid instead of buy/sell
// TODO: update balances after order is executed
// TODO: update row-level policy to prevent people from submitting orders on behalf of other people
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase';
import { assert } from 'console';

type Order = Database['public']['Tables']['active_orders']['Row'];
type Stock = Database['public']['Tables']['profiles']['Row'];
type Price = {
    created_at: Date;
    share_price: number;
}

function handleSupabaseError(response: any, errorMessage: string) {
    if (response.error) {
        console.error(errorMessage);
        console.log(response);
        throw new Error(response.error.message);
    }
    return response.data;
}

// TODO: order by time if price is the same
async function higestBid(): Promise<Order | null> {
    const supabase = createServerComponentClient({ cookies });
    const { data, error } = await supabase
        .from('active_orders')
        .select('*')
        .eq('order_type', 'buy')
        .order('price', { ascending: false })
        .limit(1);
    if (data == null || data.length == 0) {
        return null;
    }
    if (error) {
        console.error(error);
        return null;
    }
    return data[0];
}

// TODO: order by time if price is the same
async function lowestAsk(): Promise<Order | null> {
    const supabase = createServerComponentClient({ cookies });
    const { data, error } = await supabase
        .from('active_orders')
        .select('*')
        .eq('order_type', 'sell')
        .order('price', { ascending: true })
        .limit(1);
    if (data == null || data.length == 0) {
        return null;
    }
    if (error) {
        console.error(error);
        return null;
    }
    return data[0];
}

async function executeOrders(stock: Stock) {
    const supabase = createServerComponentClient({ cookies });
    // steps to process order
    // .error1. get the highest bid and lowest ask
    // 2. if the highest bid is lower than the lowest ask, you're done, no need to execute order
    // 3. otherwise, take the lower number of shares between the orders, remove that one from the orders list, and subtract its number of shares from the other order, and add this to the transactions list
    // 4. add the price * shares to the seller's balance and subtract it from the buyer's balance
    // 5. repeat steps 1-4 until the highest bid is lower than the lowest ask

    async function deleteActiveOrder(id: number) {
        handleSupabaseError(
            await supabase
            .from('active_orders')
            .delete()
            .eq('id', id),
            "Error: couldn't remove order from active orders list.");
        console.log("Removed order from active orders list.")
    }
    const stockId = stock.id;
    let whileTrueDefenseCount = 0;
    let ask;
    let bid;
    while (true) {
        whileTrueDefenseCount++;
        try {
            ask = await lowestAsk();
            bid = await higestBid();
        } catch (e) {
            console.error(e);
            return;
        }
        if (whileTrueDefenseCount > 50) {
            console.error("Something went wrong. Made more than 50 loops while executing orders.");
            break;
        }
        if (ask == null) {
            console.log("No active asks.");
            break;
        }

        if (bid == null) {
            console.log("No active bids.");
            break;
        }

        if (ask.price > bid.price) {
            console.log("Lowest ask is higher than higest ask.");
            break;
        }

        console.log(stockId, ask.orderer_id)
        // Get the number of shares the seller owns
        const prevSellerSharesData = handleSupabaseError(
            await supabase
            .from('owned_shares')
            .select('num_shares')
            .eq('owner_id', ask.orderer_id)
            .eq('stock_id', stockId)
            .single(),
            "Couldn't find the seller's owned shares. They might have tried to sell shares they don't own.");
2     
        const prevSellerShares = prevSellerSharesData.num_shares;

        // Get the number of shares the buyer owns
        const prevBuyerSharesData = handleSupabaseError(
            await supabase
            .from('owned_shares')
            .select('num_shares')
            .eq('owner_id', ask.orderer_id)
            .eq('stock_id', stockId)
            .single(),
            "Error: couldn't find the buyer's owned shares.");
        if (prevBuyerSharesData == null || prevBuyerSharesData.num_shares == null) {
            const prevBuyerShares = 0;
        } else {
            const prevBuyerShares = prevBuyerSharesData.num_shares;
        }

        if (ask.num_shares > bid.num_shares) {
            // Ask is larger than bid

            const numShares = bid.num_shares;

            // Add trade to trades list
            handleSupabaseError(
                await supabase
                .from('trades')
                .insert([{
                    buy_order_id: bid.historical_order_id,
                    sell_order_id: ask.historical_order_id,
                    num_shares: numShares,
                    share_price: ask.price,
                    stock_id: stockId,
                }]),
                "Error: couldn't add trade to trades list.");
            console.log("Added trade to trades list.")

            // Subtract owned shares from seller
            handleSupabaseError(
                await supabase
                .from('owned_shares')
                .upsert([{
                    owner_id: ask.orderer_id,
                    stock_id: stockId,
                    num_shares: prevSellerShares - numShares,
                }],
                {onConflict: 'owner_id, stock_id'}),
                "Error: couldn't remove shares from seller.");
            console.log("Removed shares from seller.")

            // Add owned shares to buyer
            handleSupabaseError(
                await supabase
                .from('owned_shares')
                .upsert([{
                    owner_id: bid.orderer_id,
                    stock_id: stockId,
                    num_shares: prevSellerShares + numShares,
                }],
                {onConflict: 'owner_id, stock_id'}),
                "Error: couldn't add shares to buyer."
            );
            console.log("Added shares to buyer.")

            // Remove bid from orders list
            await deleteActiveOrder(bid.id);

            const updatedAskShares = ask.num_shares - numShares;
            console.log("new number of shares in ask" + updatedAskShares)

            // Subtract shares from ask
            const a = handleSupabaseError(
                await supabase
                .from('active_orders')
                .update([{
                    num_shares: updatedAskShares,
                }])
                .eq('id', ask.id)
                .select(),
                "Error: couldn't subtract shares from ask.");
            console.log("Subtracted shares from ask.")
            console.log(a);
            console.log(ask.id)

        } else if (ask.num_shares < bid.num_shares) {
            // Number of shares in the ask order is less than the number of shares in the bid order

            const numShares = ask.num_shares;

            // Add trade to trades list
            handleSupabaseError(
                await supabase
                .from('trades')
                .insert([{
                    buy_order_id: bid.historical_order_id,
                    sell_order_id: ask.historical_order_id,
                    num_shares: numShares,
                    share_price: ask.price,
                    stock_id: stockId,
                }]),
                "Error: couldn't add trade to trades list.");
            console.log("Added trade to trades list.")
            
            // Subtract owned shares from seller
            handleSupabaseError(
                await supabase
                .from('owned_shares')
                .update([{
                    owner_id: ask.orderer_id,
                    stock_id: stockId,
                    num_shares: prevSellerShares - numShares,
                }]),
                "Error: couldn't remove shares from seller.");
            console.log("Removed shares from seller.")

            // Add owned shares to buyer
            handleSupabaseError(
                await supabase
                .from('owned_shares')
                .upsert([{
                    owner_id: bid.orderer_id,
                    stock_id: stockId,
                    num_shares: prevSellerShares + numShares,
                }]),
                "Error: couldn't add shares to buyer.");
            console.log("Added shares to buyer.")

            // Remove ask from orders list
            await deleteActiveOrder(ask.id);

            // Subtract shares from bid
            handleSupabaseError(
                await supabase
                .from('active_orders')
                .update([{
                    num_shares: bid.num_shares - numShares,
                }])
                .eq('id', bid.id),
                "Error: couldn't subtract shares from bid.");
            console.log("Subtracted shares from bid.");

        } else {
            // The number of shares in the ask order is equal to the number of shares in the bid order
            assert(ask.num_shares == bid.num_shares);
            const numShares = ask.num_shares;

            // Add trade to trades list
            handleSupabaseError(
                await supabase
                .from('trades')
                .insert([{
                    buy_order_id: bid.historical_order_id,
                    sell_order_id: ask.historical_order_id,
                    num_shares: numShares,
                    share_price: ask.price,
                    stock_id: stockId,
                }]),
                "Error: couldn't add trade to trades list.");
            console.log("Added trade to trades list.")

            // Subtract owned shares from seller
            // Remove owned shares from seller
            handleSupabaseError(
                await supabase
                .from('owned_shares')
                .update([{
                    owner_id: ask.orderer_id,
                    stock_id: stockId,
                    num_shares: prevSellerShares - numShares,
                }]),
                "Error: couldn't remove shares from seller.");
            console.log("Removed shares from seller.")

            // Add owned shares to buyer
            handleSupabaseError(
                await supabase
                .from('owned_shares')
                .upsert([{
                    owner_id: bid.orderer_id,
                    stock_id: stockId,
                    num_shares: prevSellerShares + numShares,
                }]),
                "Error: couldn't add shares to buyer.");
            console.log("Added shares to buyer.")

            // Remove ask from orders list
            await deleteActiveOrder(ask.id);

            // Remove bid from orders list
            await deleteActiveOrder(bid.id);
        }
        console.log("Done executing orders.");
    }
}

async function logTrade(stockId: string, buyOrderId: string, sellOrderId:string, numShares: number, sharePrice: number) {

}

export async function submitOrder(formData: FormData) {
    const supabase = createServerComponentClient({ cookies });
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (user == null) {
        console.error("Couldn't determine the user who placed the order.");
        return;
    }

    const historicalOrder = {
        orderer_id: (user.id),
        stock_id: String(formData.get("stock-id")),
        order_type: String(formData.get("order-type")),
        price: Number(formData.get("share-price")),
        num_shares: Number(formData.get("num-shares")),
    }

    // Add order to historical orders table
    const { data: historicalOrderData, error: h } = await supabase
        .from('historical_orders')
        .insert([historicalOrder])
        .select();
    if (h) {
        console.error(h);
        return;
    }

    const activeOrder = {
        orderer_id: (user.id),
        stock_id: String(formData.get("stock-id")),
        order_type: String(formData.get("order-type")),
        price: Number(formData.get("share-price")),
        num_shares: Number(formData.get("num-shares")),
        historical_order_id: historicalOrderData[0].id,
    }

    // Add order to active orders table
    const { error: o } = await supabase
        .from('active_orders')
        .insert([activeOrder]);
    if (o) {
        console.error(o);
        return;
    }

    const { data: stock, error: s } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', historicalOrder.stock_id)
        .single();
    if (s) {
        console.error(s);
        return;
    }

    await executeOrders(stock);
    console.log("Done submitting order.");
    return;
}

export async function getPriceHistory(stockId: string): Promise<Price[]> {
    const supabase = createServerComponentClient({ cookies });
    const { data, error } = await supabase
        .from('trades')
        .select('created_at, share_price')
        .eq('stock_id', stockId)
        .order('created_at', { ascending: true })
        // .limit(100);
    if (error) {
        console.error(error);
        throw new Error(error.message);
    }
    console.log("Done getting price history:")
    console.log(data);
    return data;
}

export async function getLatestPrice(stockId: string): Promise<number | null> {
    const supabase = createServerComponentClient({ cookies });
    const { data, error } = await supabase
        .from('trades')
        .select('share_price')
        .eq('stock_id', stockId)
        .order('created_at', { ascending: false })
        .limit(1);
    if (error) {
        console.error(error);
        throw new Error(error.message);
    }
    console.log("Done getting latest price:")
    console.log(data);
    if (data == null || data.length == 0) {
        return null;
    }
    return data[0].share_price;
}

// export async function getAvatarUrl(path: string) {
//     const supabase = createServerComponentClient({ cookies });
//     const { data } = await supabase
//         .storage
//         .from('avatars')
//         .getPublicUrl(path);
//     return data.publicUrl;
// }