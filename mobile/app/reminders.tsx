import ReminderCard from "../components/ReminderComponents/ReminderCard";
import { View, Text } from "../components/Themed"
import { ScrollView } from "react-native";
import { StyleSheet } from "react-native"
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

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
                contentContainerStyle={styles.cardParent}>
                <View style={styles.cardParent2}>
                    {reminders.map((reminder: any) => (
                        <View key={reminder.id} style={styles.card}>
                            <ReminderCard
                                reminder={reminder.reminder}
                                phone={reminder.phone}
                            />
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
    card: {
        width: '45%',
    },
    cardParent2: {
        gap: 20,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    cardParent: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Reminders