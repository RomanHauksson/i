import { SewingPinIcon } from '@radix-ui/react-icons'
import Image from "next/image";
import Link from 'next/link';

interface UserCardProps {
  name: string;
  description: string;
  city: string;
  id: string;
}

export default function UserCard({name, description, city, id}: UserCardProps) {
    return (
        <Link href={"/profile/" + id}
        className={`flex items-start gap-[16px] p-[18px] w-full bg-[#ffffff] rounded-[8px] border border-solid`}
      >
        <Image className="rounded-full" alt="Avatar" src="/Roman.jpg" width={64} height={64}/>
        <div className="inline-flex flex-col items-start gap-[8px] flex-[0_0_auto]">
          <div className="text-xl leading-none">
            {name}
          </div>
          <div className="text-base">
            {description}
          </div>
          <div className="inline-flex h-[18px] items-center gap-[4px]">
            <SewingPinIcon className="relative w-[16px] h-[16px]" color="#64748B" />
            <div className="w-fit font-card-description-subtle font-[number:var(--card-description-subtle-font-weight)] text-[#64748b] text-[length:var(--card-description-subtle-font-size)] tracking-[var(--card-description-subtle-letter-spacing)] leading-[var(--card-description-subtle-line-height)] whitespace-nowrap [font-style:var(--card-description-subtle-font-style)]">
              {city}
            </div>
          </div>
        </div>
      </Link>
    );
}