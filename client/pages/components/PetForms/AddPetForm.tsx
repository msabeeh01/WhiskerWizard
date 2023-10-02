import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthProvider';
import { useRouter } from 'next/router';

const AddPetForm = () => {
    const [petName, setPetName] = useState('');
    const [petDesc, setPetDesc] = useState('');
    const [userID, setUserID] = useState('');
    const [image, setImage] = useState<File | null>(null);

    const { user } = useAuth();

    const router = useRouter();

    useEffect(() => {
        setUserID(user?.id!);
    }, [user])

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (image) {
            // Add the code to save the pet to your database here
            const { data, error } = await supabase
                .from('pets')
                .insert([
                    { pet_name: petName, pet_desc: petDesc, user_id: userID },
                ]);

            const { data: iData, error: iError } = await supabase
                .storage
                .from('petImages')
                .upload(`${userID}/${userID}${petName}`, image)
            if (error as any|| iError as any) {
                console.error('Error adding pet: ', error);
            }
            else {
                // Clear the form fields
                setPetName('');
                setPetDesc('');
                router.push('/');
            }
        } else {
            alert("Please select an image")
        }


    };

    const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        // if the image is selected, setit as astate that will be uploaded when i add a new pet
        const file = e.target.files![0];
        setImage(file);
        console.log(file)

    }

    return (

        <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Add a New Pet
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <input type="text" autoComplete="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Pet Name" onChange={(e) => setPetName(e.target.value)} />
                        </div>
                        <div>
                            <textarea autoComplete="" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Pet Desc" onChange={(e) => setPetDesc(e.target.value)} />
                        </div>
                    </div>

                    <input type='file' accept='image/*' onChange={handleImageSelect} />

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Add pet
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPetForm;