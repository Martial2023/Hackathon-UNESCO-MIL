import { BookOpen, ShieldAlert, Cpu, MoreHorizontal } from "lucide-react";

export const categories = [
    {
        label: "Education",
        icon: (
            <div className="mr-2 flex h-6 w-6 p-2 items-center justify-center rounded-full bg-[#0050FF] text-white">
                <BookOpen className="h-3 w-3 text-white text-xl" />
            </div>
        ),
    },
    {
        label: "Scam",
        icon: (
            <div className="mr-2 flex h-6 w-6 p-2 items-center justify-center rounded-full bg-red-500 text-white">
                <ShieldAlert className="h-3 w-3 text-white text-xl" />
            </div>
        ),
    },
    {
        label: "Technology",
        icon: (
            <div className="mr-2 flex h-6 w-6 p-2 items-center justify-center rounded-full bg-green-600 text-white">
                <Cpu className="h-3 w-3 text-white text-xl" />
            </div>
        ),
    },
    {
        label: "Others",
        icon: (
            <div className="mr-2 flex h-6 w-6 p-2 items-center justify-center rounded-full bg-gray-400 text-white">
                <MoreHorizontal className="h-3 w-3 text-white text-xl" />
            </div>
        ),
    },
]