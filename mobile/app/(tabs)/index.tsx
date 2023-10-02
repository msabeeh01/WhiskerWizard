import { ScrollView, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { supabase } from '../../lib/supabase';
import { Session } from '@supabase/supabase-js'
import PetCard from '../../components/PetComponents/PetCard';

export default function TabOneScreen() {
  const [session, setSession] = useState<Session | null>(null)

  //pet states
  const [pets, setPets] = useState<any>([])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
  }, [])

  useEffect(() => {
    if (!session) return
    fetchPets()
  }, [session])

  //fetch pets from supabase
  const fetchPets = async () => {
    let { data: pets, error } = await supabase
      .from('pets')
      .select('*')
      .eq("user_id", session?.user.id)
    if (error) console.log('error', error)
    else{
      setPets(pets)
    } 
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.cardParent}
      >
        <View style={styles.cardParent2}>

          {pets.map((pet: any) => (

            <View key={pet.id}>
              <PetCard pet_name={pet.pet_name} pet_desc={pet.pet_desc} pet_id={pet.id} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    //backgroundColor: 'blue',
  },
  cardParent2: {
    gap: 20,
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  cardParent: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
