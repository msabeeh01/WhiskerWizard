import {AiOutlinePlusSquare} from 'react-icons/ai'

const AddReminderButton = () => {
    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
            <div className="md:flex">
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold"><AiOutlinePlusSquare size={125} /></div>
                </div>
            </div>
        </div>
    )
}

export default AddReminderButton