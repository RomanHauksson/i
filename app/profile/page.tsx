import React from "react";
import { TwitterLogoIcon, LinkedInLogoIcon, Link1Icon } from '@radix-ui/react-icons'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Chart from "./chart";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

export default function Page() {
  return (
    <div className="inline-flex flex-col items-start gap-[39px] relative">
      <div className="inline-flex flex-col items-start gap-[39px] relative flex-[0_0_auto]">
        <div className="items-center gap-[27px] inline-flex relative flex-[0_0_auto]">
            <Avatar className="relative w-[80px] h-[80px]">
                <AvatarImage src="Roman.jpg" alt="Avatar" />
                <AvatarFallback>RH</AvatarFallback>
            </Avatar>
          <div className="flex-col items-start justify-center gap-[3px] inline-flex relative flex-[0_0_auto]">
            <div className="relative w-fit mt-[-1.00px] font-h-2 font-[number:var(--h-2-font-weight)] text-[#000000] text-[length:var(--h-2-font-size)] tracking-[var(--h-2-letter-spacing)] leading-[var(--h-2-line-height)] whitespace-nowrap [font-style:var(--h-2-font-style)]">
              Roman Hauksson
            </div>
            <div className="relative w-fit font-large font-[number:var(--large-font-weight)] text-[#000000] text-[length:var(--large-font-size)] tracking-[var(--large-letter-spacing)] leading-[var(--large-line-height)] whitespace-nowrap [font-style:var(--large-font-style)]">
              $ROMAN
            </div>
          </div>
        </div>
        <p className="relative w-fit [font-family:'Inter-Regular',Helvetica] font-normal text-[#000000] text-[16px] tracking-[0] leading-[16px] whitespace-nowrap">
          <span className="[font-family:'Inter-Regular',Helvetica] font-normal text-[#000000] text-[16px] tracking-[0] leading-[16px]">
            Software engineer working on{" "}
          </span>
          <span className="[font-family:'Inter-Italic',Helvetica] italic">I’m, a</span>
          <span className="[font-family:'Inter-Regular',Helvetica] font-normal text-[#000000] text-[16px] tracking-[0] leading-[16px]">
            n app for investments in people, not companies.
          </span>
        </p>
        <div className="inline-flex items-start gap-[32px] relative flex-[0_0_auto]">
          <TwitterLogoIcon className="!relative !w-[24px] !h-[24px]" />
          <LinkedInLogoIcon className="!relative !w-[24px] !h-[24px]" />
          <Link1Icon className="!relative !w-[24px] !h-[24px]" />
        </div>
      </div>
      <div className="inline-flex flex-col items-start gap-[15px] relative flex-[0_0_auto]">
        <div className="inline-flex items-end gap-[9px] relative flex-[0_0_auto]">
          <div className="relative w-fit mt-[-1.00px] font-h-2 font-[number:var(--h-2-font-weight)] text-[#000000] text-[length:var(--h-2-font-size)] tracking-[var(--h-2-letter-spacing)] leading-[var(--h-2-line-height)] whitespace-nowrap [font-style:var(--h-2-font-style)]">
            $54.01
          </div>
          <div className="relative w-fit font-h-3 font-[number:var(--h-3-font-weight)] text-[#0a7121] text-[length:var(--h-3-font-size)] tracking-[var(--h-3-letter-spacing)] leading-[var(--h-3-line-height)] whitespace-nowrap [font-style:var(--h-3-font-style)]">
            +1.2%
          </div>
        </div>
        <div className="inline-flex flex-col items-start gap-[5px] relative flex-[0_0_auto]">
            <Tabs defaultValue="1D">
                <TabsList>
                    <TabsTrigger value="1D">1D</TabsTrigger>
                    <TabsTrigger value="5D">5D</TabsTrigger>
                    <TabsTrigger value="1M">1M</TabsTrigger>
                    <TabsTrigger value="6M">6M</TabsTrigger>
                    <TabsTrigger value="YTD">YTD</TabsTrigger>
                    <TabsTrigger value="1Y">1Y</TabsTrigger>
                    <TabsTrigger value="5Y">5Y</TabsTrigger>
                    <TabsTrigger value="Max">Max</TabsTrigger>
                </TabsList>
            </Tabs>
        </div>

        <Chart />
        
        <div className="flex items-start gap-[25px] relative self-stretch w-full flex-[0_0_auto]">
          <button className="bg-lime-700 flex items-center justify-center gap-[10px] px-[16px] py-[8px] relative flex-1 grow rounded-[6px] all-[unset] box-border">
            <div className="relative w-fit mt-[-1.00px] font-body-medium font-[number:var(--body-medium-font-weight)] text-[#ffffff] text-[length:var(--body-medium-font-size)] tracking-[var(--body-medium-letter-spacing)] leading-[var(--body-medium-line-height)] whitespace-nowrap [font-style:var(--body-medium-font-style)]">
              Buy
            </div>
          </button>
          <button className="bg-red-700 flex items-center justify-center gap-[10px] px-[16px] py-[8px] relative flex-1 grow rounded-[6px] all-[unset] box-border">
            <div className="relative w-fit mt-[-1.00px] font-body-medium font-[number:var(--body-medium-font-weight)] text-[#ffffff] text-[length:var(--body-medium-font-size)] tracking-[var(--body-medium-letter-spacing)] leading-[var(--body-medium-line-height)] whitespace-nowrap [font-style:var(--body-medium-font-style)]">
              Sell
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
