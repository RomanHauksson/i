import React from "react";
import { MagnifyingGlassIcon, PersonIcon, GearIcon } from '@radix-ui/react-icons'

export const Sidebar = (): JSX.Element => {
  return (
    <div className="inline-flex flex-col items-start gap-[47px] relative">
      <img className="relative w-[80px] h-[80px] object-cover" alt="Logo" src="logo.jpg" />
      <div className="flex-col items-start gap-[18px] inline-flex relative flex-[0_0_auto]">
        <a className="items-center gap-[30px] inline-flex relative flex-[0_0_auto]" href="./explore">
          <MagnifyingGlassIcon className="!relative !w-[24px] !h-[24px]" />
          <div className="relative w-fit mt-[-1.00px] font-lead font-[number:var(--lead-font-weight)] text-[#000000] text-[length:var(--lead-font-size)] tracking-[var(--lead-letter-spacing)] leading-[var(--lead-line-height)] whitespace-nowrap [font-style:var(--lead-font-style)]">
            Explore
          </div>
        </a>
        <a href="./profile" className="items-center gap-[30px] inline-flex relative flex-[0_0_auto]">
          <PersonIcon className="!relative !w-[24px] !h-[24px]" />
          <div className="relative w-fit mt-[-1.00px] font-lead font-[number:var(--lead-font-weight)] text-[#000000] text-[length:var(--lead-font-size)] tracking-[var(--lead-letter-spacing)] leading-[var(--lead-line-height)] whitespace-nowrap [font-style:var(--lead-font-style)]">
            Profile
          </div>
        </a>
        <a className="items-center gap-[30px] inline-flex relative flex-[0_0_auto]">
          <GearIcon className="!relative !w-[24px] !h-[24px]" />
          <div className="relative w-fit mt-[-1.00px] font-lead font-[number:var(--lead-font-weight)] text-[#000000] text-[length:var(--lead-font-size)] tracking-[var(--lead-letter-spacing)] leading-[var(--lead-line-height)] whitespace-nowrap [font-style:var(--lead-font-style)]">
            Settings
          </div>
        </a>
      </div>
    </div>
  );
};
