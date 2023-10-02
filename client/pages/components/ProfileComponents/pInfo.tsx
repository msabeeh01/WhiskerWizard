import { useAuth } from "@/context/AuthProvider"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { BiPencil } from "react-icons/bi"

const PersonalInfo = () => {
    const [email, setEmail] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")

    const { user } = useAuth()

    useEffect(() => {
        if (!user) return
        setEmail(user.email!)
        setPhone(user.phone!)
    }, [user])


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
    }

    return (
        <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Your Information
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-5">
                        <div>
                            {/* email */}
                            <h1>Email</h1>
                            <div className="flex items-center gap-5">
                                <input className="" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <button>
                                    <BiPencil />
                                </button>
                            </div>
                        </div>

                        <div>
                            {/* first name */}
                            <h1>First Name</h1>
                            <div className="flex items-center gap-5">
                                <input className="" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                <button>
                                    <BiPencil />
                                </button>
                            </div>
                        </div>

                        <div>
                            {/* last name */}
                            <h1>Last Name</h1>
                            <div className="flex items-center gap-5">
                                <input className="" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                <button>
                                    <BiPencil />
                                </button>
                            </div>
                        </div>

                        <div>
                            {/* phone */}
                            <h1>Phone</h1>
                            <div className="flex items-center gap-5">
                                <input className="" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                <button>
                                    <BiPencil />
                                </button>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default PersonalInfo