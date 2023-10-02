import { supabase } from "@/lib/supabase"
import VaccineCard from "./Cards/VaccineCard"
import { useRouter } from "next/router"
import { useQuery } from "@tanstack/react-query"

const VaccineList = () => {
    const router = useRouter()
    const { petID } = router.query

    const fetchVaccines = async () => {
        let { data, error } = await supabase
            .from("vaccines")
            .select("*")
            .eq("petID", petID)
        if (error) throw error
        return data
    }

    const { data, status, refetch } = useQuery(["vaccines"], fetchVaccines, {
        enabled: !!petID,
    })

return (
    <div className="grid grid-cols-3">
        {data?.map((vaccine) => (
            <VaccineCard vaccineTitle={vaccine.vaccineTitle} vaccineDesc={vaccine.vaccineDesc} />
        ))}
    </div>

)
}

export default VaccineList