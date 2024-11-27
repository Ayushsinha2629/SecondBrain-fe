import { FaYoutube, FaTwitter } from "react-icons/fa";
import { ShareIcon } from "./icons/ShareIcon";
interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube"
    username?: string;
    suggestions?: { suggestion: string; date: string }[];
}

export function Card({title, link, type, username, suggestions}: CardProps) {
    return <div className="bg-white max-w-72 rounded-md border-gray-200 border min-w-72 h-full">
        <div className="flex items-center justify-between p-2">
            <div className="flex gap-3 font-medium items-center">
                    {type === "twitter" && <FaTwitter className="text-blue-500" />}
                    {type === "youtube" && <FaYoutube className="text-red-500" />}
                    {title}
                </div>
            <div className="flex gap-3">
                <a href={link}>
                <ShareIcon size="lg"/>
                </a>
            </div>
        </div>

        <div className="w-full p-4">
            {type === "youtube" && <iframe className="w-full" src = {link.replace("watch", "embed").replace("?v=", "/")} allowFullScreen>
            </iframe>}

            {type === "twitter" && <blockquote className="twitter-tweet">
                <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>}
        </div>
        <div className="p-4 text-gray-500 text-sm">
            Created by: {username}
        </div>
        {/* @ts-ignore */}
        {suggestions?.length > 0 && (
                <div className="p-4 mt-2 border-t border-gray-200">
                    <h3 className="font-bold text-gray-700">Suggestions:</h3>
                    <ul className="list-disc ml-5">
                        {suggestions?.map(({ suggestion, date }, index) => (
                            <li key={index} className="text-gray-600">
                                {suggestion} - <span className="text-xs text-gray-400">{new Date(date).toLocaleDateString()}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>

}