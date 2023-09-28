import { SewingPinIcon } from '@radix-ui/react-icons'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

export default function UserCard() {
    return (
        <a href="./profile" className="flex w-[500px] items-start gap-[16px] p-[17px] relative flex-[0_0_auto] bg-[#ffffff] rounded-[6px] border border-solid border shadow-[0px_4px_4px_#aeaeae40]">
            <Avatar className="relative w-[40px] h-[40px]">
                <AvatarImage src="Roman.jpg" alt="Avatar" />
                <AvatarFallback>RH</AvatarFallback>
            </Avatar>
            <div className="inline-flex flex-col items-start gap-[4px] relative flex-[0_0_auto]">
            <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-[#0f172a] text-[14px] tracking-[0] leading-[20px] whitespace-nowrap">
                Roman Hauksson
            </div>
            <div className="relative w-[230px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#0f172a] text-[14px] tracking-[0] leading-[20px]">
                Software engineer
            </div>
            <div className="flex w-[230px] items-center gap-[4px] relative flex-[0_0_auto]">
                <SewingPinIcon className="!relative !w-[16px] !h-[16px]" color="#64748B" />
                <div className="relative w-[223px] mt-[-1.00px] mr-[-13.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#64748b] text-[12px] tracking-[0] leading-[16px]">
                Dallas, Texas
                </div>
            </div>
            </div>
        </a>
    );
}