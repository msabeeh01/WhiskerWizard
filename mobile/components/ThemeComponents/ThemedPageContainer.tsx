import { StyleSheet } from "react-native"

export const lightPageTheme = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: 'center',
    }
})

export const darkPageTheme = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: 'center',
    }
})

export const lightPageText = StyleSheet.create({
    text: {
        color: "black",
    }
});

export const darkPageText = StyleSheet.create({
    text: {
        color: "white",
    }
});