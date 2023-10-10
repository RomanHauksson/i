import React from "react";
import UserCard from "@/components/userCard";

export default function Page() {
  return (
    <div className="flex-col gap-16 flex-1 grow flex items-start relative">
      <div className="flex h-24 items-end">
        <h1 className="leading-none">explore</h1>
      </div>
      <div className="flex flex-col items-start gap-[48px] relative self-stretch w-full flex-[0_0_auto]">
        <input
          className="h-12 pl-3 pr-[56px] py-2 relative self-stretch w-full rounded-[8px] border border-solid border-[#cbd5e1] font-subtle font-[number:var(--subtle-font-weight)] text-slate-400 text-[length:var(--subtle-font-size)] tracking-[var(--subtle-letter-spacing)] leading-[var(--subtle-line-height)] whitespace-nowrap [font-style:var(--subtle-font-style)]"
          placeholder="search people..."
          type="text"
        />
        <div className="flex flex-col items-start gap-[24px] relative self-stretch w-full flex-[0_0_auto]">
          <UserCard />
        </div>
      </div>
    </div>
  );
};