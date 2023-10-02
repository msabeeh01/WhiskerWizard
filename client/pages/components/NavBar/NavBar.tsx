import { useAuth } from "@/context/AuthProvider"
import { HiOutlineLogout } from 'react-icons/hi'
import { MdPets } from 'react-icons/md'


const NavBar = () => {
    const { user, logout } = useAuth();

    if (!user) return null

    return (
        <nav className="w-screen fixed bg-blue-200 z-50">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start w-full">
                        <div className="flex flex-row items-center gap-2">
                            <MdPets size={30} color="white"/>
                            <h2 className="text-white">WhiskerWizard</h2>
                        </div>
                        <div className="flex-grow flex sm:block w-full justify-center">
                            <div className="flex justify-center">
                                <a href="/" className="text-gray-800 hover:bg-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
                                <a href="/profile" className="text-gray-800 hover:bg-white px-3 py-2 rounded-md text-sm font-medium">My Profile</a>
                                <a href="/" className="text-gray-800 hover:bg-white px-3 py-2 rounded-md text-sm font-medium">About</a>
                            </div>
                        </div>
                    </div>
                    <div className="absolute right-0 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button onClick={logout} className="text-white p-1 rounded-full hover:text-[#DCAE96] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <HiOutlineLogout size={25} />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar