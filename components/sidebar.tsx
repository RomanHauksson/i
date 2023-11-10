import React from "react";
import { MagnifyingGlassIcon, PersonIcon, GearIcon } from '@radix-ui/react-icons';
import { PresentationChartLineIcon } from '@heroicons/react/24/outline'
import Image from "next/image";
import { SidebarButton } from "./sidebarButton";
import SignOut from "./signOut";

export const dynamic = 'force-dynamic'

const tabs = [
  { name: 'portfolio', icon: <PresentationChartLineIcon /> },
  { name: 'explore', icon: <MagnifyingGlassIcon />},
  { name: 'account', icon: <PersonIcon /> },
  { name: 'settings', icon: <GearIcon /> },
]

export default async function Sidebar() {
  return (
    <div className="flex flex-col w-36 items-start gap-16 grow-0">
      <div className="w-24 h-24 flex items-end justify-center">
        <Image width={55} height={65} alt="Logo" src="/logo.svg" />
      </div>
      <div className="inline-flex flex-col items-start gap-2">
        {tabs.map((tab) => (
          <SidebarButton key={tab.name} name={tab.name} path={`/${tab.name}`} icon={tab.icon} />
        ))}
        <SignOut />
      </div>
    </div>
  );
};