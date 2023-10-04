import { ScrollView, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import React from 'react';

import { Text, View } from '../../components/Themed';
import { supabase } from '../../lib/supabase';
import { Session } from '@supabase/supabase-js'
import PetCard from '../../components/PetComponents/PetCard';
import { SearchBarIOS } from '@rneui/base/dist/SearchBar/SearchBar-ios';
import { Button } from '@rneui/themed';
import { Icon } from 'react-native-elements';
import { Link } from 'expo-router';

export default function TabOneScreen() {
  const [session, setSession] = useState<Session | null>(null)

  //pet states
  const [pets, setPets] = useState<any>([])

  //search states
  const [search, setSearch] = useState('')

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
    else {
      setPets(pets)
    }
  }

  const filteredPets = pets.filter((pet: any) => {
    return pet.pet_name.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Button onPress={()=>supabase.auth.signOut()} title="Logout" color="black"></Button>
        <View style={styles.searchBarContainer}>
          <SearchBarIOS containerStyle={{borderRadius: 30}} style={{borderRadius: 30}} placeholder='Search' onChange={(e) => setSearch(e.nativeEvent.text)} value={search} />
        </View>
        <View style={styles.buttonContainer}>
          <Link href="/modal" asChild>
            <Icon name="plus-square-o"  type="font-awesome" color="black"/>
          </Link>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.cardParent}
      >
        {filteredPets.map((pet: any) => (
          <View key={pet.id} style={{borderRadius: 30}}>
            <PetCard pet_name={pet.pet_name} pet_desc={pet.pet_desc} pet_id={pet.id} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  cardParent: {
    borderRadius: 30,
    flexDirection: 'column',
    gap: 30,
    width: '100%',
    alignItems: 'center',
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    borderRadius: 30,
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonContainer: {
    borderRadius: 30,
    flex: 0.1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBarContainer:{
    borderRadius: 30,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
