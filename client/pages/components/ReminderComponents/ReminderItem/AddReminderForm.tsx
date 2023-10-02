import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface ReminderFormProps {
    yourPetID: string;
}

const AddReminderForm: React.FC<ReminderFormProps> = ({ yourPetID }) => {
    const [reminder, setReminder] = useState('');
    const [petID, setPetID] = useState(yourPetID);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // Add code here to handle form submission
        try{
            const { data, error } = await supabase
                .from('reminders')
                .insert([
                    { petID: petID, reminder: reminder },
                ])
            if (error) throw error
            window.location.reload()
                
        }catch(error: any){
            console.log(error);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md flex flex-col p-8">
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <label className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                    PET ID:
                    <input type="textarea" value={petID} className="mt-2 text-gray-500 overflow-wrap break-word white-space-normal"  readOnly/>
                </label>
                <label className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                    Reminder:
                    <textarea value={reminder} onChange={e => setReminder(e.target.value)} className="mt-2 text-gray-500 overflow-wrap break-word white-space-normal" />
                </label>
                <input type="submit" value="Submit" className="mt-2 text-gray-500 overflow-wrap break-word white-space-normal" />
            </form>
        </div>
    );
};

export default AddReminderForm;