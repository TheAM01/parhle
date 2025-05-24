import {Check, Trash} from "lucide-react";
import {useState} from "react";

export const DashboardNotification = ({sender, message}) => {
    const [read, setRead] = useState(false);
    const [visible, setVisible] = useState(true);
    return (
        <div className={`${visible ? "flex!" : "hidden!"} ${read ? "bg-gray-900 border border-gray-800" : "bg-gray-800"}  p-1 items-center gap-2 justify-between `}>
            <div className="p-2 flex-col">
                <div className="text-sm text-gray-dark">{sender}</div>
                <div className="gap-1">{message}</div>
            </div>
            <div className="p-2 gap-2">
                <button onClick={() => setRead(!read)} className={`${read ? "hidden!" : "flex!"}`}>
                    <Check size={35} className={`p-2 bg-gray-900 ${read ? "cursor-not-allowed" : "cursor-pointer"} w-[100px] justify-center flex `}/>
                </button>
                <button onClick={() => setVisible(false)}>
                    <Trash size={35} className={`p-2  ${read ? "bg-gray-800" : "bg-gray-900" }  cursor-pointer w-[100px] justify-center flex`}/>
                </button>
            </div>
        </div>
    )
}