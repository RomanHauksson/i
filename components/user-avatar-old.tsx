import { Database } from "@/types/supabase";
import Image from "next/image";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface UserAvatarProps {
    profile: Profile;
    size: number;
}

function getInitials(name: string | null): string {
    if (!name) return "";
    const names = name.split(" ");
    let initials = "";
    for (let i = 0; i < names.length; i++) {
      initials += names[i].charAt(0);
    }
    return initials.slice(0, 2) || initials.charAt(0);
  }

export default function UserAvatar( { profile, size }: UserAvatarProps ) {
    if (profile.avatar_url) {
        return(
            <Image className="rounded-full" alt="Avatar" src={"/" + profile.avatar_url} width={size} height={size}/>
        );
    } else {
        const initials = getInitials(profile.full_name);
        return(
            <div className={`w-${size} h-${size} bg-red rounded-full`}>
                {initials}
            </div>
        );
    }
}