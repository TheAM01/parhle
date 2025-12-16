import {Loader2} from "lucide-react";

export default function Loading() {
    return (
        <div className="w-screen h-screen items-center justify-center text-gray-medium bg-black">
            <Loader2 className="animate-spin w-6 h-6 mr-2" />
            Loading...
        </div>
    )
}