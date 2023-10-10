// import Link from 'next/link'
// import Messages from '@/app/login/messages'

export default function SignOut() {
  return (
    <form
    action="/auth/sign-out"
    method="post"
    >
        <button className="bg-green-700 rounded px-4 py-2 text-white mb-2">
            sign out
        </button>
    </form>
  )
}
