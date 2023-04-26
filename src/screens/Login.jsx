import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableNativeFeedback,
  Image,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import { CheckBox } from "@rneui/themed";
import Ionicons from 'react-native-vector-icons/Ionicons'

import Home from './Home'

import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../firebase-config';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [checked, setChecked] = useState(false);
  const [showPasswd, setShowPasswd] = useState(false);
  
  const [email, setEmail] = useState('')
  const [passwd, setPasswd] = useState('')

  const app = initializeApp(firebaseConfig)
  const authentication = getAuth(app)

  const [user, setUser] = useState();

  const signInWithEmail = () => {
    signInWithEmailAndPassword(authentication, email, passwd)
    .then((userCredential) => {
        console.log('Signed in')
        console.log(userCredential.user)
        navigation.navigate('Home')
      })
      .catch(err => {
        console.log(err)
      })
  }

  GoogleSignin.configure({
    webClientId: '586288011808-jd34s9fu0vikiau7d5jrsd1msif9cc5s.apps.googleusercontent.com',
  });

  const [initializing, setInitializing] = useState(true);
  
 
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  }, []);

  async function onGoogleButtonPress() {
    
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
  
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    const user_sign_in = auth().signInWithCredential(googleCredential);
    user_sign_in.then((user) => {
      console.log(user)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  if (initializing) return null;

  if (!user) {
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
              INICIAR SESIÓN
            </Text>
  
            <View>
              <Text style={styles.label}>Email</Text>
              <View style={styles.input_container}>
                <TextInput
                  underlineColorAndroid="#6a5bba"
                  placeholder="ejemplo@gmail.com"
                  cursorColor="#6a5bba"
                  selectionColor="#958bce"
                  keyboardType="email-address"
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
                  secureTextEntry={!showPasswd}
                  style={styles.input}
                  onChangeText={(text) => setPasswd(text)}
                />
                <Ionicons
                  name={showPasswd ? "eye-off" : "eye"}
                  color={'#3e367f'}
                  size={22}
                  onPress={() => setShowPasswd(!showPasswd)}
                  style={{
                    position: 'absolute',
                    right: 20,
                    top: 9
                  }}
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
                  title="Recuérdame"
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
                <TouchableOpacity>
                  <View>
                    <Text style={{ color: "#3e367f", fontWeight: "800" }}>
                      OLVIDASTE TU CONTRASEÑA?
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
  
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity 
                style={{ width: "100%", justifyContent: 'center', alignItems: 'center' }}
                onPress={signInWithEmail}
              >
                <View style={[styles.boton_login, { marginBottom: 20 }]}>
                  <Text style={{ color: "white", fontWeight: "600" }}>
                    INGRESAR
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={{ width: "100%", justifyContent: 'center', alignItems: 'center' }} 
                onPress={ () => {
                  navigation.navigate('Registro')
                }}
              >
                <View style={[styles.boton_registro, { marginBottom: 20 }]}>
                  <Text style={{ color: "#3e367f", fontWeight: "600" }}>
                    REGISTRARSE
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
  
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <View
                style={{
                  borderBottomWidth: 1,
                  width: "30%",
                  marginRight: 50,
                  borderBottomColor: "#3e367f",
                }}
              />
              <Text style={{ color: "#3e367f", fontSize: 20, fontWeight: "400" }}>
                o
              </Text>
              <View
                style={{
                  borderBottomWidth: 1,
                  width: "30%",
                  marginLeft: 50,
                  borderBottomColor: "#3e367f",
                }}
              />
            </View>
  
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={{ width: "100%", justifyContent: 'center', alignItems: 'center'  }}
                onPress={onGoogleButtonPress}
              >
                <View style={styles.boton_google}>
                  <Image
                    source={require("test-app/src/assets/pngwing.com.png")}
                    style={styles.google_logo}
                  />
                  <Text style={{ color: "#3e367f", fontWeight: "600" }}>
                    Continuar con{" "}
                  </Text>
                  <Text style={{ fontWeight: "800", color: "#3e367f" }}>
                    Google
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }

  return(
    <Home />
  )

  
};

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
    width: "85%",
    borderWidth: 1,
    flexDirection: "row",
  },
});

export default Login;
