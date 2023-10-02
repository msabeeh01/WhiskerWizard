import ReminderList from "../components/ReminderComponents/ReminderList";
import { useRouter } from "next/router";

const ListOfReminders = () => {
    const router = useRouter()
    const { petID } = router.query
    const petIDString = petID as string
    return (
            <div className="flex h-screen flex-col items-center justify-between p-24">
                <ReminderList petID={petIDString} />
            </div>
    )
}

export default ListOfReminders;