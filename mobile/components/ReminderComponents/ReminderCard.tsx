import { View, Text } from "../Themed";
import { StyleSheet } from "react-native";
import React from "react";

interface ReminderCardProps {
    reminder: string,
    phone: string
}

const ReminderCard = ({reminder, phone}: ReminderCardProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.text}>
                <Text>{reminder}</Text>
                <Text>{phone}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10, // Rounded corners
        backgroundColor: "#F59359", // White background
        shadowColor: "#000", // Shadow color
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // Android elevation
        
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    text: {
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        backgroundColor: "#F59359",
    },
});

export default ReminderCard