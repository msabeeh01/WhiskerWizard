import React from "react";
import { View, Text, Button } from "react-native";

//stylesheet
import { StyleSheet } from "react-native";
import InfoForm from "../components/LoginComponents/infoForm";
import { useAtom } from "jotai";
import { themeAtom } from "../atoms/themeAtom";
import { ThemedButton } from "../components/ThemeComponents/ThemedButton";
import { ThemedView } from "../components/ThemeComponents/ThemedView";
import { ThemedText } from "../components/ThemeComponents/ThemeText";




export default function LoginScreen() { 
    const [theme, setTheme] = useAtom(themeAtom)



    return (
        <ThemedView>
            <ThemedText>
                current theme is {theme}
            </ThemedText>
            <ThemedButton title="string" onPress={() => setTheme(theme === "light" ? "dark" : "light")}/>
            <InfoForm />
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "grey",
        alignItems: "center",
        justifyContent: 'center',
    },
});