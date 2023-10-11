"use client"

import { Session } from "@supabase/supabase-js";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { submitOrder } from "@/app/actions";

interface OrderFormProps {
    stockId: string;
    session: Session | null;
}

export default function OrderForm({ stockId, session }: OrderFormProps) {
    const [orderType, setOrderType] = useState('buy');
    const [pricePerShare, setPricePerShare] = useState(0);
    const [numberOfShares, setNumberOfShares] = useState(0);
    const supabase = createClientComponentClient();
    if (session == null) {
        return(
            <div>
                <p>Error: couldn't retrieve login session.</p>
                <p>Try logging in again.</p>
            </div>
        );
    }
    async function submitOrder(e) {
        e.preventDefault();
        const { error } = await supabase
            .from('historical_orders')
            .insert({
                order_type: orderType,
                price: pricePerShare,
                num_shares: numberOfShares,
                stock_id: stockId,
                orderer_id: session?.user.id,
            });
        if (error) {
            console.log(error);
            return;
        }
        console.log('order submitted');
    }
    return(
        <form>
          <div>
            <label>
              order type:
              <select value={orderType} onChange={(e) => setOrderType(e.target.value)}>
                <option value="buy">buy</option>
                <option value="sell">sell</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              price per share:
              <input 
                type="number" 
                value={pricePerShare} 
                onChange={(e) => setPricePerShare(e.target.valueAsNumber)}
                placeholder="enter price per share"
                // step="0.01"
                // min="0"
              />
            </label>
          </div>
          <div>
            <label>
              Number of Shares:
              <input 
                type="number" 
                value={numberOfShares} 
                onChange={(e) => setNumberOfShares(e.target.valueAsNumber)}
                placeholder="enter number of shares"
                min="0"
              />
            </label>
          </div>
          <button onClick={submitOrder}>submit order</button>
        </form>
    );
}