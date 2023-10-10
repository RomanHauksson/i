'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function submitOrder(prevState: any, formData: FormData) {
    const supabase = createServerComponentClient({ cookies });
    await supabase
        .from('historical_orders')
        .insert({
            order_type: formData.get('orderType'),
            price: formData.get('pricePerShare'),
            num_shares: formData.get('numberOfShares'),
            stock_id: formData.get('stockId'),
            orderer_id: "test",
        });
}