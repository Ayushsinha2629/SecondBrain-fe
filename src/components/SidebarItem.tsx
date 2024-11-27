import { ReactElement } from "react";

export function SidebarItem({text, icon, onClick}: {
    text: string;
    icon: ReactElement
    onClick: () => void
}) {
    return <div onClick={onClick} className="flex text-gray-700 gap-4 items-center py-2 pl-2 hover:bg-gray-200 transition-all duration-300">
        <div className="text-2xl">
            {icon}
        </div>
        <div className="text-md">
             {text}
        </div>
            
    </div>
}
