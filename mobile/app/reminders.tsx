import ReminderCard from "../components/ReminderComponents/ReminderCard";
import { View, Text } from "../components/Themed"
import { ScrollView } from "react-native";
import { StyleSheet } from "react-native"
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import React from "react";

//expo imports
import { useLocalSearchParams } from "expo-router";


const Reminders = () => {
    const [session, setSession] = useState<Session | null>(null)
    const [reminders, setReminders] = useState<any>([])

    //expo consts
    const params = useLocalSearchParams();
    const { petID } = params;

    useEffect(() => {
        //get session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })
    }, [])

    useEffect(() => {
        if (!session) return
        fetchReminder()
    }, [session])

    //fetch reminders
    const fetchReminder = async () => {
        //fetch reminders from supabase
        const { data: reminder, error } = await supabase
            .from('reminders')
            .select('*')
            .eq('petID', petID)
        if (error) console.log(error)
        setReminders(reminder)
    }

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.contentCardParent}
                style={styles.cardParent}>
                    {reminders.map((reminder: any) => (
                        <View key={reminder.id} style={styles.directCardPrent}>
                            <ReminderCard
                                reminder={reminder.reminder}
                                phone={reminder.phone}
                            />
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
    },
    cardParent: {
        width: '100%',
    },
    directCardPrent:{
        width: '70%',
        height: 100,
    },
    contentCardParent:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        gap: 10
    }
});

export default Reminders