import { FaTwitter, FaYoutube, } from "react-icons/fa";
import { LuBrain } from "react-icons/lu";
import { SidebarItem } from "./SidebarItem";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export function Sidebar({ setFilter }: { setFilter: (filter: string) => void }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/signin');
    };

    return <div className="h-screen w-72 fixed left-0 top-0">
        <div className="flex gap-3 pt-5 items-center">
            <span className="text-purple-800 text-3xl pl-4">
                <LuBrain/>
            </span>
            <span className="text-xl">
                SecondBrain
            </span>
        </div>
        <div className="border mt-5 "></div>
        <div className="pt-7 pl-6 cursor-pointer flex flex-col justify-between min-h-[90vh]">
            <div>
                <SidebarItem onClick={() => setFilter("twitter")} icon={<FaTwitter className="text-blue-400"/>} text="Tweets"/>
                <SidebarItem onClick={() => setFilter("youtube")} icon={<FaYoutube className="text-red-500"/>} text="Youtube"/>
            </div>
            <div>
                <button onClick={handleLogout} className="flex gap-2 py-2 px-3 text-gray-400 items-center hover:text-black hover:bg-gray-200 transition-all duration-300">
                    <span>
                        logout
                    </span>
                    <span>
                        <LuLogOut/>
                    </span>
                </button>
            </div>
        </div>
    </div>
}