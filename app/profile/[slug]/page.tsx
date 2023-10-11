import React from "react";
import { TwitterLogoIcon, LinkedInLogoIcon, Link1Icon } from '@radix-ui/react-icons'
import Chart from "./chart";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import OrderForm from "./order-form-new";
import UserAvatar from "@/components/user-avatar";
import { Database } from "@/types/supabase";

export default async function Profile({ params }: { params: { slug: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  let { data, error } = await supabase.from('profiles').select().eq('id', params.slug).single();
  if (!data) {
    return <div>User not found.</div>;
  }
  return (
    <div className="inline-flex flex-col items-start gap-[39px] relative">
      <div className="inline-flex flex-col items-start gap-[39px] relative flex-[0_0_auto]">
        <div className="items-center gap-[27px] inline-flex relative flex-[0_0_auto]">
            <UserAvatar profile={data} />
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
        <div className="inline-flex items-end gap-[9px] relative flex-[0_0_auto]">
          <div className="relative w-fit mt-[-1.00px] font-h-2 font-[number:var(--h-2-font-weight)] text-[#000000] text-[length:var(--h-2-font-size)] tracking-[var(--h-2-letter-spacing)] leading-[var(--h-2-line-height)] whitespace-nowrap [font-style:var(--h-2-font-style)]">
            $54.01
          </div>
          <div className="relative w-fit font-h-3 font-[number:var(--h-3-font-weight)] text-[#0a7121] text-[length:var(--h-3-font-size)] tracking-[var(--h-3-letter-spacing)] leading-[var(--h-3-line-height)] whitespace-nowrap [font-style:var(--h-3-font-style)]">
            +1.2%
          </div>
        </div>
        <Chart />
        <OrderForm stockId={params.slug} session={session} />
      </div>
    </div>
  );
};
