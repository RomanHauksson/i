import React from "react";
import { TwitterLogoIcon, LinkedInLogoIcon, Link1Icon } from '@radix-ui/react-icons'
import Chart from "./chart";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import Price from "@/components/price";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from "@/types/supabase";

export default async function Account() {

  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session == null || session?.user == null) {
    return(<div>Error: user session not found; you might be signed out.</div>);
  }

  const userId = session.user.id;

  return (
    <div className="inline-flex flex-col items-start gap-[39px] relative">
      <div className="inline-flex flex-col items-start gap-[39px] relative flex-[0_0_auto]">
        <div className="items-center gap-[27px] inline-flex relative flex-[0_0_auto]">
            <Avatar className="relative w-[80px] h-[80px]">
                <AvatarImage src="Roman.jpg" alt="Avatar" />
                <AvatarFallback>RH</AvatarFallback>
            </Avatar>
          <div className="flex-col items-start justify-center gap-[3px] inline-flex relative flex-[0_0_auto]">
            <h1>
              Roman Hauksson
            </h1>
            <div className="relative w-fit font-large font-[number:var(--large-font-weight)] text-[#000000] text-[length:var(--large-font-size)] tracking-[var(--large-letter-spacing)] leading-[var(--large-line-height)] whitespace-nowrap [font-style:var(--large-font-style)]">
              $ROMAN
            </div>
          </div>
        </div>
        <p className="relative w-fit first-line:font-normal text-[#000000] text-[16px] tracking-[0] leading-[16px] whitespace-nowrap">
            Software engineer working on I&apos;m: an app for investments in people, not companies.
        </p>
        <div className="inline-flex items-start gap-[32px] relative flex-[0_0_auto]">
          <TwitterLogoIcon className="!relative !w-[24px] !h-[24px]" />
          <LinkedInLogoIcon className="!relative !w-[24px] !h-[24px]" />
          <Link1Icon className="!relative !w-[24px] !h-[24px]" />
        </div>
      </div>
      <div className="inline-flex flex-col items-start gap-[15px] relative flex-[0_0_auto] w-full">
        <Price stockId={userId}/>
        <Chart />
      </div>
    </div>
  );
};
