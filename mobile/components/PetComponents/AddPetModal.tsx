import React from "react"
import { View, Text } from "../Themed"
import { StyleSheet, Platform, KeyboardAvoidingView } from "react-native"
import { Input, Button } from "@rneui/themed"
import { useState, useEffect } from "react"
import { StatusBar } from "expo-status-bar"
import { Session } from "@supabase/supabase-js"
import { supabase } from "../../lib/supabase"
import { useNavigation } from "expo-router"


//components
import ImagePickerExample from "../ImagePicker/ImagePicker"

const AddPetModal = () => {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [session, setSession] = useState<Session | null>(null);

    //navigation
    const navigation = useNavigation();

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
            {/* <Text style={styles.title}>{session?.user.id}</Text> */}
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            {/* <EditScreenInfo path="app/modal.tsx" /> */}
            <View style={styles.form}>
                <Input placeholder="Pet Name" onChange={(e) => setName(e.nativeEvent.text)} />
                <Input placeholder="Pet Description" onChange={(e) => setDescription(e.nativeEvent.text)} />
                {/* file upload */}
                {session && session.user && <ImagePickerExample pet_description={description} pet_name={name} user_id={session?.user.id} />}
            </View>


            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    )
}

const styles = StyleSheet.create({
    keyboardView: {
        flex: 1
    },
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
    },

})

export default AddPetModal