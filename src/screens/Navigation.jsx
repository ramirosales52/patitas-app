import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'

import Adoptados from "./Adoptados";
import Perdidos from "./Perdidos";
import Perfil from "./Perfil";
import Upload from "./Upload";
import Mapa from "./Mapa";


const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator screenOptions={{
        headerShown: false, 
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#3f3680',
        tabBarStyle: { backgroundColor: '#675cb8', paddingVertical: 0 },
        tabBarShowLabel: false
      }}
      initialRouteName={ Adoptados }
    >
      <Tab.Screen name="Adoptados" component={ Adoptados } 
        options={{
          tabBarLabel: 'Adoptar',
          tabBarIcon: ({ color, size }) => (
            <Entypo name='baidu' color={color} size={size} />
          )
        }}
      />
      <Tab.Screen name="Perdidos" component={ Perdidos } 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='map-marker-question' color={color} size={size} />
          )
        }}
      />
      <Tab.Screen name="Upload" component={ Upload } 
        options={{
          tabBarLabel: 'Añadir',
          tabBarIcon: ({ color, size }) => (
            <Feather name='plus-square' color={color} size={size} />
          )
        }}
      />
      <Tab.Screen name="Mapa" component={ Mapa }
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='map' color={color} size={size} solid />
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
