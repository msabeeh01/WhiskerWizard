import { Image } from "react-native";
import { View, Text } from "../Themed";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

//icon import
import { Icon } from "@rneui/themed";
import Reminders from "../../app/reminders";
import { Link } from "expo-router";
import React from "react";

interface PetCardProps {
  pet_name: string,
  pet_desc: string,
  pet_id: string
}

export default function PetCard(props: PetCardProps) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image resizeMode="cover" borderRadius={30} source={{ uri: 'https://picsum.photos/200' }} style={{ width: '100%', height: 225 }} />
        <View style={styles.textContainer}>
          <Text style={styles.petName}>{props.pet_name}</Text>
          <Text style={styles.petDesc}>{props.pet_desc}</Text>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <Link href={{
          pathname: "/reminders",
          params: {
            petID: props.pet_id
          }
        }}>

          <Icon name="sticky-note" type="font-awesome" color="#FF5838" />
        </Link >
        <Icon
          name="needle"
          type="material-community"
          color="#9CB963"
        />
        <Icon name="photo" type="font-awesome" color="#EAAE88" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 30, // Rounded corners
    shadowColor: "#000", // Shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    justifyContent: "center",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Android elevation
    alignSelf: "center",
    marginHorizontal: 20
  },
  imageContainer: {
    flex: 1,
    borderRadius: 30,
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
    gap: 45,
    borderRadius: 30,
    flex: 0.25
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    padding: 20,
    borderRadius: 30
  },
  petName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  petDesc: {
    color: 'white',
    fontSize: 16,
  },
});
