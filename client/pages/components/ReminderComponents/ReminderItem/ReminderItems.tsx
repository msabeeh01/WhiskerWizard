import { useState } from "react";

interface ReminderItemsProps {
    reminder: string;
    petID: string;
    phone: string;
}

const ReminderItems: React.FC<ReminderItemsProps> = ({ reminder, petID, phone }) => {
    return (
        <div className="w-full">
            <div className="flex items-center flex-col">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{petID}</div>
            </div>
            <div className="bg-white rounded-xl shadow-md flex flex-col">
                <div className="break-all overflow-scroll">
                    <div className="p-8">
                        <div className="uppercase text-sm text-indigo-500 font-semibold">
                            <p className="mt-2 text-gray-500 overflow-wrap break-word white-space-normal">{reminder}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReminderItems