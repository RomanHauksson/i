import React from "react";
import { TwitterLogoIcon, LinkedInLogoIcon, Link1Icon } from '@radix-ui/react-icons'
import PriceHistoryChart from "./price-history-chart";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import OrderForm from "./order-form";
// import UserAvatar from "@/components/user-avatar-old";
import { Database } from "@/types/supabase";
import Price from "../../../components/price";
import UserAvatar from "@/components/user-avatar";

export default async function Profile({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session == null) {
    return <div>Not logged in.</div>;
  }

  let { data, error } = await supabase.from('profiles').select().eq('id', params.id).single();
  if (!data) {
    return <div>User not found.</div>;
  }
  return (
    <div className="inline-flex flex-col items-start gap-12 ">
      <div className="inline-flex flex-col items-start gap-12 relative flex-[0_0_auto]">
        <div className="items-center gap-[27px] inline-flex relative flex-[0_0_auto]">
          <UserAvatar size={116} userId={params.id}/>
          <div className="flex-col items-start justify-center gap-[3px] inline-flex relative flex-[0_0_auto]">
            <h1>
              {data.full_name}
            </h1>
            <div className="relative w-fit font-large font-[number:var(--large-font-weight)] text-[#000000] text-[length:var(--large-font-size)] tracking-[var(--large-letter-spacing)] leading-[var(--large-line-height)] whitespace-nowrap [font-style:var(--large-font-style)]">
              $ {data.symbol}
            </div>
          </div>
        </div>
        <p className="relative w-fit first-line:font-normal text-[#000000] text-[16px] tracking-[0] leading-[16px] whitespace-nowrap">
            {data.description}
        </p>
        <div className="inline-flex items-start gap-[32px] relative flex-[0_0_auto]">
          <TwitterLogoIcon className="!relative !w-[24px] !h-[24px]" />
          <LinkedInLogoIcon className="!relative !w-[24px] !h-[24px]" />
          <Link1Icon className="!relative !w-[24px] !h-[24px]" />
        </div>
      </div>
      <div className="inline-flex flex-col items-start gap-[15px] relative flex-[0_0_auto] w-full">
        <Price stockId={params.id}/>
        <PriceHistoryChart stockId={params.id}/>
        <OrderForm stockId={params.id}/>
      </div>
    </div>
  );
};
