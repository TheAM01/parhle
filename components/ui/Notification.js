import {Check, Trash} from "lucide-react";
import {useState} from "react";

export const DashboardNotification = ({sender, message, isRead=true}) => {
    const [read, setRead] = useState(isRead);
    const [visible, setVisible] = useState(true);
    return (
        <div className={`${visible ? "flex!" : "hidden!"} ${read ? "bg-gray-900 border border-gray-800" : "bg-gray-800"}  p-1 gap-2 justify-between flex-col sm:flex-row`}>
            <div className="p-2 flex-col">
                <div className="text-sm text-gray-dark">{sender}</div>
                <div className="gap-1 text-wrap">{message}</div>
            </div>
            <div className="p-2 gap-2 w-full sm:items-center sm:w-min">
                <button onClick={() => setRead(!read)} className={`${read ? "hidden!" : "flex!"} flex-1 sm:flex-none h-min`}>
                    <Check size={35} className={`p-2 bg-gray-900 ${read ? "cursor-not-allowed" : "cursor-pointer"} justify-center flex flex-1 sm:flex-none sm:w-[70px] `}/>
                </button>
                <button onClick={() => setVisible(false)} className={"flex flex-1 sm:flex-none h-min"}>
                    <Trash size={35} className={`p-2  ${read ? "bg-gray-800" : "bg-gray-900" }  cursor-pointer justify-center flex flex-1 sm:flex-none sm:w-[70px] `}/>
                </button>
            </div>
        </div>
    )
}