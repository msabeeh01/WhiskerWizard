import React, { useState, useEffect } from 'react';
import { View, Text } from '../Themed';
import { Button, Image } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../../lib/supabase';
import { useNavigation } from 'expo-router';
import * as FileSystem from 'expo-file-system'

interface ImagePickerExampleProps {
    pet_name: string,
    pet_description: string
    user_id: string
}

export default function ImagePickerExample({ pet_description, pet_name, user_id }: ImagePickerExampleProps) {
    const [image, setImage] = useState<string | null>(null);
    const [imageData, setImageData] = useState({
        uri: '',
        base64: '',
        filePath: '',
        contentType: ''
    });

    //navi
    const navigation = useNavigation();

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const img = result.assets[0];
            setImageData({
                uri: img.uri,
                base64: await FileSystem.readAsStringAsync(img.uri, {encoding: FileSystem.EncodingType.Base64}),
                filePath: `${user_id}/${user_id}${pet_name}`,
                contentType: img.type === 'image' ? 'image/jpeg' : 'video/mp4'
            });


        }
    };

    const handleAdd = async () => {
        const { data, error } = await supabase
            .from('pets')
            .insert([
                {
                    user_id: user_id,
                    pet_name: pet_name,
                    pet_desc: pet_description,
                }
            ])
        if (error) {
            console.log(error)
        }
        if (imageData) {
            const { data: iData, error: iError } = await supabase
                .storage
                .from('petImages')
                .upload(`${user_id}/${user_id}${pet_name}`, decodeURI(imageData.uri), {
                    contentType: imageData.contentType
                })
            if (iError) {
                console.log(iError)
            }

            navigation.goBack()
        }


    }

    return (
        <View>
            <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: '#F5E9E6', borderRadius: 30, minHeight: 200, marginBottom: 20 }}>
                {imageData.uri && <Image source={{ uri: imageData.uri }} style={{ width: 200, height: 200 }} />}
            </View>
            <View style={styles.spacerContainer}>
                <Button titleStyle={styles.title} buttonStyle={styles.button} title="Pick an image from camera roll" onPress={pickImage} />
                <Button buttonStyle={styles.buttonAlt} title="Add Pet" onPress={handleAdd} />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 30,
        color: '#F59359',
        backgroundColor: '#F5E9E6',
        borderColor: '#F59359',
        borderWidth: 2,
        padding: '4%',
    },
    title: {
        color: '#F59359'
    },
    buttonAlt: {
        borderRadius: 30,
        color: '#F59359',
        backgroundColor: '#F59359',
        borderColor: '#F59359',
        borderWidth: 2,
        padding: '4%',
    },
    spacerContainer: {
        gap: 10
    }
})