import AddPetForm from "@/pages/components/PetForms/AddPetForm"

const NewPet = () => {
    return(
        <main className={`flex min-h-screen flex-col items-center justify-between p-24`}>
            <AddPetForm />
        </main>
    )
}

export default NewPet