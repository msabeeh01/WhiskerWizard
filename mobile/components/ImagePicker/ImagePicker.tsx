import React, { useState, useEffect } from 'react';
import { View, Text } from '../Themed';
import { Button, Image } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../../lib/supabase';
import { useNavigation } from 'expo-router';
import { FileObject } from "@supabase/storage-js"

interface ImagePickerExampleProps {
    pet_name: string,
    pet_description: string
    user_id: string
}

export default function ImagePickerExample({ pet_description, pet_name, user_id }: ImagePickerExampleProps) {
    const [image, setImage] = useState<File | null>(null);
    const [imageURI, setImageURI] = useState<string | null>(null);

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
            //save image uri to state
            setImageURI(result.assets[0].uri);
            //convert to file for supabase, use file name as pet name
            const response = await fetch(result.assets[0].uri);
            const data = await response.blob();
            const file = new File([data], pet_name, { type: result.assets[0].type });
            //save file to state
            setImage(file);

        }
    };

    const handleAdd = async () => {
        console.log('add reminder LOGIC HERE')
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
        if (image) {
            const { data: iData, error: iError } = await supabase
                .storage
                .from('petImages')
                .upload(`${user_id}/${user_id}${pet_name}`, image, {
                    contentType: image.type,
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
                {imageURI && <Image source={{ uri: imageURI }} style={{ width: 200, height: 200 }} />}
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