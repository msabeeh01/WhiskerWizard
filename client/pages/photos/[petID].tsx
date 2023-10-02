import { useAuth } from "@/context/AuthProvider";
import Gallery from "../components/PhotoComponents/Gallery";
import { useRouter } from "next/router";

const PhotoGallery = () => {
    const router = useRouter();
    const {petID} = router.query
    const {user, loading} = useAuth()

    if(loading) return <div className="flex h-screen flex-col items-center justify-between p-24">Loading...</div>

    return(
        <div className="flex h-screen flex-col items-center justify-between p-24">
            <Gallery userID={user?.id} petID={petID}/>
        </div>
    )
}

export default PhotoGallery;