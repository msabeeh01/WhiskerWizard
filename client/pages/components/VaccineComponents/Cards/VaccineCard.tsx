import { supabase } from "@/lib/supabase"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useState } from "react"

interface VaccineCardProps {
    vaccineTitle: string
    vaccineDesc: string
}

const VaccineCard: React.FC<VaccineCardProps> = ({ vaccineTitle, vaccineDesc }) => {
    const [hidden, setHidden] = useState(true);

    return (
        <div className="grid bg-white rounded-lg p-5 max-w-md min-w-md overflow-scroll break-all" onMouseEnter={() => setHidden(false)} onMouseLeave={() => setHidden(true)}>
            <div className="">
                <h1>{vaccineTitle}</h1>
            </div>

            <div className=""> 
                    <p>{vaccineDesc}</p>
                </div>
        </div>
    )
}

export default VaccineCard