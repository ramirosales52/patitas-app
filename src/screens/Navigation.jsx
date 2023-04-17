import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Foundation from 'react-native-vector-icons/Foundation'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import Adoptados from "./Adoptados";
import Perdidos from "./Perdidos";
import Perfil from "./Perfil";
import Upload from "./Upload";


const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator screenOptions={{
        headerShown: false, 
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#3f3680',
        tabBarLabelStyle: { fontWeight: '600', fontSize: 11 },
        tabBarStyle: {
          backgroundColor: '#675cb8',
          paddingBottom: 5,
          paddingTop: 5
        }
      }}
    >
      <Tab.Screen name="Adoptados" component={ Adoptados } 
        options={{
          tabBarLabel: 'Adoptar',
          tabBarIcon: ({ color, size }) => (
            <Foundation name='home' color={color} size={size} />
          )
        }}
      />
      <Tab.Screen name="Perdidos" component={ Perdidos } 
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='question' color={color} size={size} />
          )
        }}
      />
      <Tab.Screen name="Upload" component={ Upload } 
        options={{
          tabBarLabel: 'Añadir',
          tabBarIcon: ({ color, size }) => (
            <Foundation name='plus' color={color} size={size} />
          )
        }}
      />
      <Tab.Screen name="Perfil" component={ Perfil }
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='user' color={color} size={size} solid />
          )
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer independent={ true }>
      <Tabs />
    </NavigationContainer>
  );
}
