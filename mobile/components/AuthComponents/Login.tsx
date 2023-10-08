import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { supabase } from '../../lib/supabase'
import { Button, Input } from 'react-native-elements'
import { Text } from '../Themed'
import { Icon, Image } from '@rneui/themed'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: "https://previews.123rf.com/images/sudowoodo/sudowoodo2003/sudowoodo200300053/144219749-cute-cartoon-magic-cat-in-wizard-hat-funny-black-kitty-character-head-vector-clip-art-illustration.jpg" }} 
      style={{ borderRadius: 200, width: 200, height: 200, marginVertical: 20 }} />
      <View style={styles.verticallySpaced}>
        <Input
          label="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Enter your password"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          type='clear'
          title="Sign in"
          disabled={loading}
          onPress={() => signInWithEmail()}
          buttonStyle={styles.button}
          titleStyle={{ color: '#F59359' }} />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          buttonStyle={styles.buttonAlt}
          containerStyle={styles.buttonAltShadow}
          title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5E9E6',
  },
  verticallySpaced: {
    alignSelf: 'stretch',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  button: {
    borderRadius: 30,
    color: '#F59359',
    backgroundColor: '#F5E9E6',
    borderColor: '#F59359',
    borderWidth: 2,
    padding: '4%',
  },
  buttonAlt: {
    borderRadius: 30,
    color: '#F59359',
    backgroundColor: '#F59359',
    borderColor: '#F59359',
    borderWidth: 2,
    padding: '4%',
  },
  buttonAltShadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})