import { useAtom } from "jotai"
import { themeAtom } from "../../atoms/themeAtom"

import { Button } from "react-native"

type ThemedButtonProps = {
    onPress?: () => void,
    title: string,
}

export const ThemedButton = ({onPress, title}: ThemedButtonProps) =>{
    return <Button onPress={onPress} title={title}/>
}