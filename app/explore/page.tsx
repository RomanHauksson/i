import React from "react";
import UserCard from "@/components/userCard";

export default function Page() {
  return (
    <div className="inline-flex flex-col items-center justify-center gap-[42px] px-0 py-[52px] relative">
      <input
        className="w-[502px] pl-[12px] pr-[56px] py-[8px] relative mt-[-1.00px] ml-[-1.00px] mr-[-1.00px] bg-[#ffffff] rounded-[6px] border border-solid border-[#cbd5e1] font-subtle font-[number:var(--subtle-font-weight)] text-slate-400 text-[length:var(--subtle-font-size)] tracking-[var(--subtle-letter-spacing)] leading-[var(--subtle-line-height)] whitespace-nowrap [font-style:var(--subtle-font-style)]"
        placeholder="Search users..."
        type="text"
      />
      <UserCard />
      <UserCard />
      <UserCard />
    </div>
  );
};
