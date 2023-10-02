import { Image } from "react-native";
import { View, Text } from "../Themed";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

//icon import
import { Icon } from "@rneui/themed";
import Reminders from "../../app/reminders";
import { Link } from "expo-router";

interface PetCardProps {
  pet_name: string,
  pet_desc: string,
  pet_id: string
}

export default function PetCard(props: PetCardProps) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image resizeMode="cover" borderRadius={10} source={{ uri: 'https://picsum.photos/200' }} style={{ width: '75%', height: 200 }} />


      <View style={styles.iconContainer}>
        <Link href={{
          pathname: "/reminders",
          params: {
            petID: props.pet_id
          }
          }}>
          <Icon
            name="needle"
            type="material-community"
            color="green"
          />
        </Link >
        <Icon name="sticky-note" type="font-awesome" color="green" />
        <Icon name="photo" type="font-awesome" color="green" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 10, // Rounded corners
    backgroundColor: "#fff", // White background
    shadowColor: "#000", // Shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    justifyContent: "center",
    gap: 20,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Android elevation
    alignSelf: "center",
    width: "90%",
  },
  text: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
    width: "20%",
  }
});