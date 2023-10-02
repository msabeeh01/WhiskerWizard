import Image from 'next/image'
import { Inter } from 'next/font/google'
import { supabase } from '@/lib/supabase'

import PetSplash from './components/MyPets/PetSplash'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  return (
    <main className={`flex h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <PetSplash />
    </main>
  )
}
