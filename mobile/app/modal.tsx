import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { Input } from '@rneui/themed';
import ImagePickerExample from '../components/ImagePicker/ImagePicker';
import { Text, View } from '../components/Themed';
import { Button } from 'react-native-elements';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';
import AddPetModal from '../components/PetComponents/AddPetModal';


export default function ModalScreen() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
    <AddPetModal />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    flex: 1,
  },
});
