import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Database } from "@/types/supabase";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface UserAvatarProps {
    profile: Profile;
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

export default function UserAvatar( { profile }: UserAvatarProps ) {
    return(
        <Avatar>
            <AvatarImage src={profile.avatar_url ? profile.avatar_url : ""} alt="Avatar" />
            <AvatarFallback>{getInitials(profile.full_name)}</AvatarFallback>
        </Avatar>
    );
}