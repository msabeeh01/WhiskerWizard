import React, { useState, useEffect } from 'react';
import { View, Text } from '../Themed';
import { Button, Image } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

interface ImagePickerExampleProps {
    pet_name: string,
    pet_description: string
}

export default function ImagePickerExample({pet_description, pet_name}: ImagePickerExampleProps) {
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            <View style={{alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: 'gray'}}>
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View>
        </View>
    );
}