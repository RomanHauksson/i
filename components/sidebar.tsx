import React from "react";
import { ReactElement } from "react";
import { MagnifyingGlassIcon, PersonIcon, GearIcon } from '@radix-ui/react-icons';
import { PresentationChartLineIcon } from '@heroicons/react/24/outline'
import Image from "next/image";
import { SidebarButton } from "./sidebarButton";

export const Sidebar = (): ReactElement => {
  return (
    // <div className="flex flex-col w-[144px] items-start gap-[64px] relative">
    //   <div className="inline-flex flex-col items-start gap-[32px] relative flex-[0_0_auto]">
    //     <a href="/portfolio" className="inline-flex h-[32px] items-center gap-[16px] relative">
    //       <PresentationChartLineIcon className="!relative !w-[24px] !h-[24px]" />
    //       <div className="relative w-fit mt-[-1.00px] font-sidebar-button font-[number:var(--sidebar-button-font-weight)] text-[#000000] text-[length:var(--sidebar-button-font-size)] tracking-[var(--sidebar-button-letter-spacing)] leading-[var(--sidebar-button-line-height)] whitespace-nowrap [font-style:var(--sidebar-button-font-style)]">
    //         portfolio
    //       </div>
    //     </a>
    //     <a href="explore" className="inline-flex h-[32px] items-center gap-[16px] relative">
    //       <MagnifyingGlassIcon className="!relative !w-[24px] !h-[24px]" />
    //       <div className="relative w-fit mt-[-1.00px] font-sidebar-button font-[number:var(--sidebar-button-font-weight)] text-[#000000] text-[length:var(--sidebar-button-font-size)] tracking-[var(--sidebar-button-letter-spacing)] leading-[var(--sidebar-button-line-height)] whitespace-nowrap [font-style:var(--sidebar-button-font-style)]">
    //         explore
    //       </div>
    //     </a>
    //     <a href="profile" className="inline-flex h-[32px] items-center gap-[16px] relative">
    //       <PersonIcon className="!relative !w-[24px] !h-[24px]" />
    //       <div className="relative w-fit mt-[-1.00px] font-sidebar-button font-[number:var(--sidebar-button-font-weight)] text-[#000000] text-[length:var(--sidebar-button-font-size)] tracking-[var(--sidebar-button-letter-spacing)] leading-[var(--sidebar-button-line-height)] whitespace-nowrap [font-style:var(--sidebar-button-font-style)]">
    //         profile
    //       </div>
    //     </a>
    //     <a href="settings" className="inline-flex h-[32px] items-center gap-[16px] relative">
    //       <GearIcon className="!relative !w-[24px] !h-[24px]" />
    //       <div className="relative w-fit mt-[-1.00px] font-sidebar-button font-[number:var(--sidebar-button-font-weight)] text-[#000000] text-[length:var(--sidebar-button-font-size)] tracking-[var(--sidebar-button-letter-spacing)] leading-[var(--sidebar-button-line-height)] whitespace-nowrap [font-style:var(--sidebar-button-font-style)]">
    //         settings
    //       </div>
    //     </a>
    //   </div>
    // </div>
    <div className="flex flex-col w-36 items-start gap-16">
      <div className="w-24 h-24 flex items-end justify-center">
        <Image width={55} height={65} alt="Logo" src="/logo.svg" />
      </div>
      <div className="inline-flex flex-col items-start gap-2 relative flex-[0_0_auto]">
        <SidebarButton name="portfolio" path="/portfolio" icon={<PresentationChartLineIcon />} />
        <SidebarButton name="explore" path="/explore" icon={<MagnifyingGlassIcon />} />
        <SidebarButton name="profile" path="/profile" icon={<PersonIcon />} />
        <SidebarButton name="settings" path="/settings" icon={<GearIcon />} />
      </div>
    </div>
  );
};