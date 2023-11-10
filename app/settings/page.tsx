import React from "react";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from "@/types/supabase";
import AccountForm from './account-form'
import PageTitle from "@/components/page-title";

export default async function Account() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return(
    <div className="flex flex-col gap-16 flex-1 grow items-start">
      <PageTitle>settings</PageTitle>
      <AccountForm session={session} />
    </div>
  );
};
