import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Portfolio from './portfolio/page';
import AuthForm from './auth-form';

export default function Index() {
  return (
    <div className="row">
      <div className="col-6">
        <h1 className="header">Sign in to <em>I&apos;m</em></h1>
        <p className="">
          The app for investments in people, not companies.
        </p>
      </div>
      <div className="col-6 auth-widget">
        <AuthForm />
      </div>
    </div>
  );
}
