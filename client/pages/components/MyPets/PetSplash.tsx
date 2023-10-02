import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthProvider';
import { useRouter } from 'next/router';
import type { Meta, StoryObj } from '@storybook/react';


//styling
import { MdPets } from 'react-icons/md';

import { TbVaccineBottle } from 'react-icons/tb'
import { FaRegImages, FaRegStickyNote } from 'react-icons/fa'

type Pet = {
    pet_name: string,
    pet_desc: string,
    id: number,
    image: string
    // image: string
}

type CardProps = {
    title: string,
    description: string,
    image: string,
    id: number
}


const PetSplash = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [images, setImages] = useState<string[]>([]);
    const [search, setSearch] = useState<string>('');


    const { user } = useAuth();

    // fetch data from table in supabase
    useEffect(() => {
        if (!user) return
        getPets();
    }, [user])

    const getPets = async () => {
        try {
            let { data: pets, error } = await supabase
                .from('pets')
                .select('*')
                .eq('user_id', user?.id)

            if (error) throw error

            // Fetch image for each pet
            const petsWithImages = await Promise.all(pets!.map(async (pet) => {
                let { data: iPet } = await supabase
                    .storage
                    .from('petImages')
                    .list(`${user?.id}/`) // Assuming each pet has its own folder under the user's folder
                if (iPet && iPet.length > 0) {
                    const { data, error } = await supabase
                        .storage
                        .from('petImages')
                        .createSignedUrl(`${user?.id}/${user?.id}${pet!.pet_name}`, 60) // Fetch the first image of the pet
                    console.log("URLS", data)
                    if (error) throw error

                    return { ...pet, image: data.signedUrl } // Add image URL to pet object
                }

                return pet
            }))

            console.log(petsWithImages)
            setPets(petsWithImages)
        } catch (err: any) {
            console.log(err)
        }
    }

    const filteredPets = pets.filter((pet) => {
        return pet.pet_name.toLowerCase().includes(search.toLowerCase())
    })

    return (
        <div className="w-full h-full flex flex-col items-center rounded-md p-[1rem] gap-5">

            {/* Search Bar */}
            <div className="w-full flex justify-center">
                <input className="w-1/2 border-2 rounded-md p-2" type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
            </div>


            {/* generate cards for pets */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 items-center">
                {filteredPets.map((pet) => (
                    <div key={pet.id}>
                        <PetCard
                            title={pet.pet_name}
                            description={pet.pet_desc}
                            image={pet.image}
                            id={pet.id}
                        />
                    </div>
                ))}
                <div>
                    <AddButton />
                </div>
            </div>
        </div>
    )
}

const PetCard: React.FC<CardProps> = ({ title, description, image, id }) => {
    const [hidden, setHidden] = useState(false);
    const router = useRouter();
    return (
        <div className="card overflow-hidden rounded-lg" onMouseEnter={() => setHidden(true)} onMouseLeave={() => setHidden(false)}>
            <div className="block relative">
                <img src={image} alt={title} className={`${hidden ? 'opacity-50' : 'opacity-100'}`} />
                <div className={` ${hidden ? 'opacity-100' : 'opacity-0'} absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center`}>
                    <h1 className="text-blue-700">{title}</h1>
                    <h1>{description}</h1>
                </div>
                <div className={`absolute bottom-0 left-0 right-0 bg-white p-4 ${hidden ? 'translate-y-0' : 'translate-y-full'} transition-transform duration-300 ease-in-out`}>
                    <div className="grid grid-cols-3 place-items-center">
                        <div className="flex items-center mt-4" onClick={() => router.push(`/vaccines/${id}`)}>
                            <TbVaccineBottle size={25} className="text-green-500 mr-2" />
                        </div>
                        <div className="flex items-center mt-2 " onClick={() => router.push(`/photos/${id}`)}>
                            <FaRegImages size={25} className="text-gray-500 mr-2" />
                        </div>
                        <div className="flex items-center mt-2" onClick={() => router.push(`/reminders/${id}`)}>
                            <FaRegStickyNote size={25} className="text-gray-500 mr-2" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const AddButton = () => {
    const router = useRouter();

    const addPet = () => {
        router.push('/pets/new');
    }

    return (
        <div className='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 w-full text-center hover:text-white uppercase tracking-wide text-sm text-indigo-500 font-semibold transform transition duration-500 hover:scale-105 hover:bg-gray-700'>
            <button className="w-full h-full p-5" onClick={addPet}>
                Add
            </button>
        </div>
    )
}

export default PetSplash