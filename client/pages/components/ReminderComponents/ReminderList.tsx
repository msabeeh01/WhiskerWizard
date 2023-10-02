import { supabase } from "@/lib/supabase"
import { useEffect, useState } from "react";
import ReminderItems from "./ReminderItem/ReminderItems";
import AddReminderButton from "./ReminderItem/AddReminderButton";
import AddReminderForm from "./ReminderItem/AddReminderForm";

interface Reminder {
    petID: string;
}

interface Pet {
    petID: string;
    phone: string;
    reminder: string
    id: string
}

const ReminderList: React.FC<Reminder> = ({ petID }) => {
    const [reminders, setReminders] = useState<Pet[]>([])
    const [isFormVisible, setIsFormVisible] = useState(false)


    useEffect(() => {
        if (!petID) return
        fetchReminders()
    }, [petID])

    //fetch all reminders under the petID
    const fetchReminders = async () => {
        try {
            let { data: reminders, error } = await supabase
                .from('reminders')
                .select('*')
                .eq('petID', petID)
            if (error) throw error
            setReminders(reminders!)
        } catch (err: any) {
            console.log(err)
        }
    }

    return (
        <div>
            <div className="grid items-center text-center gap-5" style={{ gridAutoRows: "minmax(100px, auto)" }}>
                <h1>Reminder List</h1>
                <div className="grid grid-cols-3 justify-center w-full">
                    {reminders.map((reminder) => {
                        return (
                            <div key={reminder.id} className="flex w-96">
                                <ReminderItems reminder={reminder.reminder} petID={reminder.petID} phone={reminder.phone} />
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Add button */}
            <div className="flex" onClick={() => setIsFormVisible(true)}>
                {!isFormVisible && <AddReminderButton />}
            </div>

            <div className="flex flex-col">
                {isFormVisible && <AddReminderForm yourPetID={petID} />}
            </div>
        </div>
    )
}

export default ReminderList;