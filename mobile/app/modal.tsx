import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Input } from '@rneui/themed';
import ImagePickerExample from '../components/ImagePicker/ImagePicker';
import { Text, View } from '../components/Themed';
import { Button } from 'react-native-elements';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';


export default function ModalScreen() {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    //get session
    fetchSession()
  }, [])

  const fetchSession = async () => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Pet</Text>
      <Text style={styles.title}>{session?.user.id}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* <EditScreenInfo path="app/modal.tsx" /> */}
      <View style={styles.form}>
        <Input placeholder="Pet Name" onChange={(e) => setName(e.nativeEvent.text)}/>
        <Input placeholder="Pet Description" onChange={(e) => setDescription(e.nativeEvent.text)}/>
        {/* file upload */}
        <ImagePickerExample pet_description={description} pet_name={name}/>

        <Button title="Add Pet" onPress={() => { console.log('add reminder LOGIC HERE') }} />

      </View>


      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  form: {
    width: '90%',
  }
});
