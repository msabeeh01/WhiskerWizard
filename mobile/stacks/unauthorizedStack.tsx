import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
//page imports
import LoginScreen from "../screens/LoginScreen";

type UnauthStackParamList = {
    Login: undefined;
};

type Props = NativeStackScreenProps<UnauthStackParamList>;

const Stack = createNativeStackNavigator<UnauthStackParamList>();


export const UnauthorizedStack = () => {
    return(
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login">
                {props => <LoginScreen/>}
            </Stack.Screen>
        </Stack.Navigator>
    )
};

