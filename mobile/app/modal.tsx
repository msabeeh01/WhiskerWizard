import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Input } from '@rneui/themed';
import ImagePickerExample from '../components/ImagePicker/ImagePicker';
import { Text, View } from '../components/Themed';
import { Button } from 'react-native-elements';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';
import AddPetModal from '../components/PetComponents/AddPetModal';


export default function ModalScreen() {
  return (
    <AddPetModal />
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  form: {
    width: '90%',
  }
});
