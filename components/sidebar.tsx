import React from "react";
import { ReactElement } from "react";
import { MagnifyingGlassIcon, PersonIcon, GearIcon } from '@radix-ui/react-icons';
import { PresentationChartLineIcon } from '@heroicons/react/24/outline'
import Image from "next/image";
import { SidebarButton } from "./sidebarButton";
import SignOut from "./signOut";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export default async function Sidebar() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="flex flex-col w-36 items-start gap-16">
      <div className="w-24 h-24 flex items-end justify-center">
        <Image width={55} height={65} alt="Logo" src="/logo.svg" />
      </div>
      <div className="inline-flex flex-col items-start gap-2 relative flex-[0_0_auto]">
        <SidebarButton name="portfolio" path="/portfolio" icon={<PresentationChartLineIcon />} />
        <SidebarButton name="explore" path="/explore" icon={<MagnifyingGlassIcon />} />
        <SidebarButton name="account" path="/account" icon={<PersonIcon />} />
        <SidebarButton name="settings" path="/settings" icon={<GearIcon />} />
        <SignOut />
      </div>
    </div>
  );
};