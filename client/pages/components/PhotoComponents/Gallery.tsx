import { supabase } from "@/lib/supabase"
import { useAuth } from "@/context/AuthProvider";
import React, { useEffect, useState } from "react";
import { data } from "autoprefixer";

interface GalleryProps {
    petID: any
    userID: any
}

interface HiddenFormProps {
    userID: any
    petID: any
}

const Gallery: React.FC<GalleryProps> = ({ petID, userID }) => {
    const [photoList, setPhotoList] = useState<string[]>([])
    const [hiddenForm, setHiddenForm] = useState<boolean>(false)

    useEffect(() => {
        fetchPhotos()
    }, [])

    const fetchPhotos = async () => {
        let { data: photoData, error } = await supabase
            .storage
            .from('petImages')
            .list(`${userID}/${petID}`)
        console.log(photoData)
        photoData?.map(async (photo) => {
            const { data, error } = await supabase
                .storage
                .from('petImages')
                .createSignedUrl(`${userID}/${petID}/${photo.name}`, 60)
            if (error) throw error
            setPhotoList((prev) => [...prev, data.signedUrl])
        })
        if (error) console.log(error)
    }

    return (
        <div className="w-full grid grid-cols-3 place-items-center text-center">
            {hiddenForm &&
                <HiddenForm userID={userID} petID={petID} />
            }
            <div className="w-full h-full flex justify-center bg-white">
                <button className="w-full h-full" onClick={() => { setHiddenForm(!hiddenForm) }}>ADD</button>
            </div>
            {photoList.map((photo, i) => {
                return (
                    <div key={i} className="w-full flex justify-center">
                        <img src={photo} alt="" />
                    </div>
                )
            })}

        </div>
    )
}

const HiddenForm: React.FC<HiddenFormProps> = ({ userID, petID }) => {
    const [image, setImage] = useState<File | null>(null)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (image) {
            let { data, error } = await
                supabase
                    .storage
                    .from('petImages')
                    .upload(`${userID}/${petID}/${image.name}`, image)
            if (error) throw error
            console.log(data)
        }

    }

    const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        // if the image is selected, setit as astate that will be uploaded when i add a new pet
        const file = e.target.files![0];
        setImage(file);
    }
    return (
        <form onSubmit={handleSubmit} className="flex flex-col justify-center">
            <input type="file" onChange={handleImageSelect} />
            <button type="submit">Upload</button>
        </form>
    )
}

export default Gallery;