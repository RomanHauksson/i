import supabase from '../supabase';
import { useState } from 'react';

export const LandingPage = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const login = async () => {
        setLoading(true);
        try {
            let { data, error } = await supabase.auth.signInWithOtp({
                email: email
            });
            if (error) {
                console.log(error);
            } else {
                setSuccess(true);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>I&apos;m</h1>
            <p>An app for investments in people, not companies.</p>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={login}>Log In</button>
        </div>
    );
}