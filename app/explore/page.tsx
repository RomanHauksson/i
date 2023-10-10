"use client";

import React, { useState, useEffect } from "react";
import ProfileCard from "@/components/profile-card";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";

export default function Explore() {
  const supabase = createClientComponentClient<Database>();

  const [searchQuery, setSearchQuery] = useState("");
  const [profiles, setProfiles] = useState<Database['public']['Tables']['profiles']['Row'][]>([]);
  const [filteredUsers, setFilteredUsers] = useState<Database['public']['Tables']['profiles']['Row'][]>([]);

  useEffect(() => {
    async function fetchUsers() {
      let { data, error } = await supabase.from('profiles').select();
      if (data) {
        setProfiles(data);
      }
    }
    fetchUsers();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  useEffect(() => {
    const results = profiles.filter(user =>
      (user.full_name != null) ? user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) : false
    );
    setFilteredUsers(results);
  }, [searchQuery, profiles]);

  return (
    <div className="flex-col gap-16 flex-1 grow flex items-start relative">
      <div className="flex h-24 items-end">
        <h1 className="leading-none">explore</h1>
      </div>
      <div className="flex flex-col items-start gap-[48px] relative self-stretch w-full flex-[0_0_auto]">
        <input
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="h-12 pl-3 pr-[56px] py-2 relative self-stretch w-full rounded-[8px] border border-solid border-[#cbd5e1] font-subtle font-[number:var(--subtle-font-weight)] text-slate-400 text-[length:var(--subtle-font-size)] tracking-[var(--subtle-letter-spacing)] leading-[var(--subtle-line-height)] whitespace-nowrap [font-style:var(--subtle-font-style)]"
          placeholder="search people..."
          type="text"
        />
        <div className="flex flex-col items-start gap-[24px] relative self-stretch w-full flex-[0_0_auto]">
          {filteredUsers.map(user => 
            <ProfileCard key={user.id} profile={user}/>
          )}
        </div>
      </div>
    </div>
  );
};
