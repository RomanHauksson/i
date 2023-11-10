// import { getAvatarUrl } from "@/app/actions";
import Image from "next/image";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";
import { Database } from "@/types/supabase";

function getInitials(name: string | null): string {
    if (!name) return "";
    const names = name.split(" ");
    let initials = "";
    for (let i = 0; i < names.length; i++) {
      initials += names[i].charAt(0);
    }
    return initials.slice(0, 2) || initials.charAt(0);
}

export default async function UserAvatar({ userId, size }: {userId: string, size: number}) {
    // const supabase = createServerComponentClient({ cookies });
    const supabase = createClientComponentClient<Database>()
    const { data: profile, error } = await supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('id', userId)
        .single();
    if (profile == null || profile.avatar_url == null) {
        return <div></div>
    }
    const { data: publicAvatarUrl } = await supabase
        .storage
        .from('avatars')
        .getPublicUrl(profile.avatar_url);

    if (publicAvatarUrl == null) {
        const initials = getInitials(profile.full_name);
        return(
            <div className={`w-${size} h-${size} bg-red rounded-full`}>
                {initials}
            </div>
        );
    }
    return(
        <Image className="rounded-full"
            src={publicAvatarUrl.publicUrl} width={size} height={size} alt="avatar"
        />
    );
}