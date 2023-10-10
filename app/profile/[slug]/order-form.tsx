"use client";

// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
// import { cookies } from 'next/headers'
import React, { useState, useEffect } from 'react';
import { experimental_useFormStatus } from 'react-dom';
import { experimental_useFormState } from 'react-dom';
import { submitOrder } from '@/app/actions';

interface OrderFormProps {
    stockId: string;
    userId: string;
    // handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function OrderForm({ stockId, userId }: OrderFormProps) {
    const [orderType, setOrderType] = useState('buy');
    const [pricePerShare, setPricePerShare] = useState(0);
    const [numberOfShares, setNumberOfShares] = useState(0);
    // const supabase = createServerComponentClient({ cookies });
    // async function handleSubmit2(e) {
    //     console.log('handleSubmit');
    //     e.preventDefault();
    //     const form = e.target;
    //     const formData = new FormData(form);
    
    //     const { error } = await supabase
    //         .from('historical_orders')
    //         .insert({
    //             order_type: formData.get('orderType'),
    //             price: formData.get('pricePerShare'),
    //             num_shares: formData.get('numberOfShares'),
    //             stock_id: stockId,
    //             orderer_id: userId,
    //         });
    //     if (error) {
    //         console.log(error);
    //     }
    //     console.log(formData.get('orderType'));
    // }

  return (
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
            // min="0"
          />
        </label>
      </div>
      <button type="submit">submit order</button>
    </form>
  );
}