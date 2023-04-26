import { CheckBox } from '@rneui/themed';
import React from 'react'
import { useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../firebase-config';

function Registro ({ navigation }) {

  const [checked, setChecked] = useState(false);

  const [email, setEmail] = useState('')
  const [passwd, setPasswd] = useState('')

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)


  const createAccount = () => {
    createUserWithEmailAndPassword(auth, email, passwd)
      .then((userCredential) => {
        console.log('usuario creado')
        const user = userCredential.user
        console.log(user)
        signIn()
        
      })
      .catch(err => {
        console.log(err)
      })
  }

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, passwd)
      .then((userCredential) => {
        console.log('Signed in')
        const user = userCredential.user
        console.log(user)
        navigation.navigate('Home')
        
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <ImageBackground source={require('test-app/src/assets/backgroundLogin.png')}>
      <View style={{ width: "100%", height: "100%" }}>
        <View style={{ marginLeft: 30, marginRight: 30, marginTop: 30 }}>
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("test-app/src/assets/patitasLogo.png")}
              style={styles.logo}
            />
          </View>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "700",
              color: "#3e367f",
              paddingLeft: 2,
              marginBottom: 5,
            }}
          >
            REGISTRO
          </Text>
          <View>
            <Text style={styles.label}>Email</Text>
            <View style={styles.input_container}>
              <TextInput
                underlineColorAndroid="#6a5bba"
                placeholder="ejemplo@gmail.com"
                cursorColor="#6a5bba"
                selectionColor="#958bce"
                style={styles.input}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
          </View>

          <View>
            <Text style={styles.label}>Contraseña</Text>
            <View style={styles.input_container_psw}>
              <TextInput
                underlineColorAndroid="#6a5bba"
                placeholder="••••••"
                cursorColor="#6a5bba"
                selectionColor="#958bce"
                secureTextEntry={!checked}
                style={styles.input}
                onChangeText={(text) => setPasswd(text)}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 30,
                marginTop: 4,
                width: "100%",
              }}
            >
              <CheckBox
                checked={checked}
                onPress={() => setChecked(!checked)}
                iconType="material-community"
                checkedIcon="checkbox-outline"
                uncheckedIcon={"checkbox-blank-outline"}
                center="true"
                checkedColor="#6a5bba"
                title="Mostrar contraseña"
                checkedTitle="Ocultar contraseña"
                textStyle={{
                  color: "#3e367f",
                  fontWeight: "500",
                  marginLeft: 0,
                  marginRight: 0,
                }}
                containerStyle={{
                  marginLeft: 0,
                  marginRight: 0,
                  margin: 0,
                  padding: 0,
                }}
              />
            </View>
          </View>

          <View style={{ alignItems: "center" }}>
            <TouchableOpacity 
              style={{ width: "100%", justifyContent: 'center', alignItems: 'center' }}
              onPress={createAccount}
            >
              <View style={[styles.boton_login, { marginBottom: 20 }]}>
                <Text style={{ color: "white", fontWeight: "600" }}>
                  REGISTRAR
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={{ width: "100%", justifyContent: 'center', alignItems: 'center' }} 
              onPress={ () => {
                navigation.navigate('Login')
              }}
            >
              <View style={[styles.boton_registro, { marginBottom: 20 }]}>
                <Text style={{ color: "#3e367f", fontWeight: "600" }}>
                  CANCELAR
                </Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    color: "#3e367f",
    paddingBottom: 8,
    paddingLeft: 4,
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
    color: "#3e367f",
    paddingLeft: 2,
  },
  input_container: {
    backgroundColor: "#f0f0f0",
    marginBottom: 20,
    paddingTop: 9,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 8,
  },
  input_container_psw: {
    backgroundColor: "#f0f0f0",
    paddingTop: 9,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 8,
  },
  boton_login: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6a5bba",
    padding: 12,
    borderRadius: 8,
    width: "95%",
  },
  boton_registro: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    width: "95%",
    borderColor: "#6a5bba",
    borderWidth: 1,
  },
  logo: {
    width: 300,
    height: 150,
    resizeMode: "contain",
  },
  google_logo: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginRight: 5,
  },
  boton_google: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderColor: "#6a5bba",
    padding: 10,
    borderRadius: 8,
    elevation: 4,
    shadowColor: "#5848ab",
    width: "85%",
    borderWidth: 1,
    flexDirection: "row",
  },
});


export default Registro;