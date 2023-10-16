import { useAtom } from "jotai"
import { ReactNode } from "react"
import { themeAtom } from "../../atoms/themeAtom"
import { View } from "react-native"
import { darkPageTheme, lightPageTheme } from "./ThemedPageContainer"

export const ThemedView = ({children}: {children: ReactNode}) => {
    const [theme, setTheme]= useAtom(themeAtom)
    const styles = theme === 'light'? lightPageTheme : darkPageTheme

    return(
        <View style={styles.container}>
            {children}
        </View>
    )
}