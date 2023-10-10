import React, { ReactNode } from "react";
import { ReactElement } from "react";
import Link from "next/link";

interface SidebarButtonProps {
    name: string;
    path: string;
    icon: ReactElement;
}

export const SidebarButton = ({ name, path, icon }: SidebarButtonProps): ReactElement => {
    return (
        <Link href={path} className="p-6 pl-4 w-full inline-flex h-8 items-center gap-4 rounded-2xl transition-all hover:bg-slate-100">
            {React.cloneElement(icon, { className: "w-6 h-6" })}
            <div className="">
                {name}
            </div>
        </Link>
    );
};
