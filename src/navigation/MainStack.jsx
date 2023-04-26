import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Login from '../screens/Login'
import Home from '../screens/Home'
import Registro from '../screens/Registro'
import Perfil from '../screens/Perfil'


const Stack = createNativeStackNavigator()

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Login' component={ Login } />
        <Stack.Screen name='Home' component={ Home } />
        <Stack.Screen name='Registro' component={ Registro } />
        <Stack.Screen name='Perfil' component={ Perfil } />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStack;