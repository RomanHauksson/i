'use server'
// TODO: figure out the way that i should use foreign keys
// TODO: make naming consistent with ask/bid instead of buy/sell
// TODO: update balances after order is executed
// TODO: update row-level policy to prevent people from submitting orders on behalf of other people
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase';
import { assert } from 'console';

type Order = Database['public']['Tables']['orders']['Row'];
type Stock = Database['public']['Tables']['profiles']['Row'];

// TODO: order by time if price is the same
async function higestBid(): Promise<Order | null> {
    const supabase = createServerComponentClient({ cookies });
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('order_type', 'buy')
        .order('price', { ascending: false })
    if (error) {
        console.error(error);
        return null;
    }
    if (data == null) {
        console.log("Couldn't find any bids.");
        return null;
    }
    return data[0];
}

// TODO: order by time if price is the same
async function lowestAsk(): Promise<Order | null> {
    const supabase = createServerComponentClient({ cookies });
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('order_type', 'sell')
        .order('price', { ascending: true })
    if (error) {
        console.error(error);
        return null;
    }
    if (data == null) {
        console.log("Couldn't find any asks.");
        return null;
    }
    return data[0];
}

async function executeOrders(stock: Stock) {
    const supabase = createServerComponentClient({ cookies });
    // steps to process order
    // 1. get the highest bid and lowest ask
    // 2. if the highest bid is lower than the lowest ask, you're done, no need to execute order
    // 3. otherwise, take the lower number of shares between the orders, remove that one from the orders list, and subtract its number of shares from the other order, and add this to the transactions list
    // 4. add the price * shares to the seller's balance and subtract it from the buyer's balance
    // 5. repeat steps 1-4 until the highest bid is lower than the lowest ask

    const ask = await lowestAsk();
    const bid = await higestBid();
    const stockId = stock.id;
    let whileTrueDefenseCount = 0;
    while (true) {
        whileTrueDefenseCount++;
        if (whileTrueDefenseCount > 100) {
            console.error("Something went wrong. Made more than 100 loops while executing orders.");
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

        // Get the number of shares the seller owns
        const { data: prevSellerSharesData } = await supabase
            .from('owned_shares')
            .select('num_shares')
            .eq('user_id', ask.orderer_id)
            .eq('stock_id', stockId)
            .single();
        if (prevSellerSharesData == null || prevSellerSharesData.num_shares == null) {
            console.error("Couldn't find the seller's owned shares. They might have tried to sell shares they don't own.");
            break;
        }
        const prevSellerShares = prevSellerSharesData.num_shares;

        // Get the number of shares the buyer owns
        const { data: prevBuyerSharesData } = await supabase
            .from('owned_shares')
            .select('num_shares')
            .eq('user_id', ask.orderer_id)
            .eq('stock_id', stockId)
            .single();
        if (prevBuyerSharesData == null || prevBuyerSharesData.num_shares == null) {
            const prevBuyerShares = 0;
        } else {
            const prevBuyerShares = prevBuyerSharesData.num_shares;
        }

        if (ask.num_shares > bid.num_shares) {
            // Ask is larger than bid

            const numShares = bid.num_shares;

            // Add trade to trades list
            const { error: a } = await supabase
                .from('trades')
                .insert([{
                    buy_order_id: bid.id,
                    sell_order_id: ask.id,
                    num_shares: numShares,
                    share_price: ask.price,
                }])
            if (a) {
                console.error(a);
                return;
            }

            // Subtract owned shares from seller
            const { error: b } = await supabase
                .from('owned_shares')
                .upsert([{
                    owner_id: ask.orderer_id,
                    stock_id: stockId,
                    num_shares: prevSellerShares - numShares,
                }])
            if (b) {
                console.error(a);
                return;
            }

            // Add owned shares to buyer
            await supabase
                .from('owned_shares')
                .upsert([{
                    owner_id: bid.orderer_id,
                    stock_id: stockId,
                    num_shares: prevSellerShares + numShares,
                }])

            // Remove bid from orders list
            await supabase
                .from('orders')
                .delete()
                .eq('id', bid.id)

            // Subtract shares from ask
            await supabase
                .from('orders')
                .update([{
                    num_shares: ask.num_shares - numShares,
                }])
                .eq('id', ask.id)

        } else if (ask.num_shares < bid.num_shares) {
            // Number of shares in the ask order is less than the number of shares in the bid order

            const numShares = ask.num_shares;

            // Add trade to trades list
            await supabase
                .from('trades')
                .insert([{
                    buy_order_id: bid.id,
                    sell_order_id: ask.id,
                    num_shares: numShares,
                    share_price: ask.price,
                }])
            
            // Subtract owned shares from seller
            await supabase
                .from('owned_shares')
                .update([{
                    owner_id: ask.orderer_id,
                    stock_id: stockId,
                    num_shares: prevSellerShares - numShares,
                }])

            // Add owned shares to buyer
            await supabase
                .from('owned_shares')
                .upsert([{
                    owner_id: bid.orderer_id,
                    stock_id: stockId,
                    num_shares: prevSellerShares + numShares,
                }])

            // Remove ask from orders list
            await supabase
                .from('orders')
                .delete()
                .eq('id', ask.id)

            // Subtract shares from bid
            await supabase
                .from('orders')
                .update([{
                    num_shares: bid.num_shares - numShares,
                }])
                .eq('id', bid.id)
        } else {
            // The number of shares in the ask order is equal to the number of shares in the bid order
            assert(ask.num_shares == bid.num_shares);
            const numShares = ask.num_shares;

            // Add trade to trades list
            await supabase
                .from('trades')
                .insert([{
                    buy_order_id: bid.id,
                    sell_order_id: ask.id,
                    num_shares: numShares,
                    share_price: ask.price,
                }])

            // Subtract owned shares from seller
            await supabase
                .from('owned_shares')
                .update([{
                    owner_id: ask.orderer_id,
                    stock_id: stockId,
                    num_shares: prevSellerShares - numShares,
                }]);

            // Add owned shares to buyer
            await supabase
                .from('owned_shares')
                .upsert([{
                    owner_id: bid.orderer_id,
                    stock_id: stockId,
                    num_shares: prevSellerShares + numShares,
                }]);

            // Remove ask from orders list
            await supabase
                .from('orders')
                .delete()
                .eq('id', ask.id);

            // Remove bid from orders list
            await supabase
                .from('orders')
                .delete()
                .eq('id', bid.id);
        }
        console.log("Done executing orders.");
    }
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

    const order = {
        orderer_id: (user.id),
        stock_id: String(formData.get("stock-id")),
        order_type: String(formData.get("order-type")),
        price: Number(formData.get("share-price")),
        num_shares: Number(formData.get("num-shares")),
    }

    // Add order to historical orders table
    const { error: h } = await supabase
        .from('historical_orders')
        .insert([order]);
    if (h) {
        console.error(h);
        return;
    }

    // Add order to active orders table
    const { error: o } = await supabase
        .from('orders')
        .insert([order]);
    if (o) {
        console.error(o);
        return;
    }

    const { data: stock, error: s } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', order.stock_id)
        .single();
    if (s) {
        console.error(s);
        return;
    }

    await executeOrders(stock);
    console.log("Done submitting order.");
    return;
}