import { useAtom } from "jotai";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { themeAtom } from "../../atoms/themeAtom";
import { darkPageText, lightPageText } from "./ThemedPageContainer";

export const ThemedText = ({children}: {children: any}) => {
    const [theme, setTheme] = useAtom(themeAtom)
    const styles = theme === 'light'? lightPageText : darkPageText
    return(
        <Text style={styles.text}>
            {children}
        </Text>
    )
}