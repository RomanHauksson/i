import Link from "next/link";

export const LandingPage = () => {
    return (
        <div>
            <h1>I&apos;m</h1>
            <p>An app for investments in people, not companies.</p>
            <Link href="/login">
                sign in
            </Link>
        </div>
    );
}