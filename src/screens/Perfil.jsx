import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { signOut, getAuth } from "firebase/auth";

const Perfil = () => {

  authentication = getAuth()

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
      console.log("signed out");
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <View style={{ marginTop: 200 }}>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity 
          style={{ width: "100%", justifyContent: 'center', alignItems: 'center' }}
          onPress={signOut}
        >
          <View style={[styles.boton_login, { marginBottom: 20 }]}>
            <Text style={{ color: "white", fontWeight: "600" }}>
              CERRAR SESIÓN
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boton_login: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f74548",
    padding: 12,
    borderRadius: 8,
    width: "95%",
  },
})


export default Perfil;
