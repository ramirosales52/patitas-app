import React from 'react'
import { View } from 'react-native'
import Constants from 'expo-constants'
import Login from './Login'

const Main = () => {
  return (
    <View style={{ marginTop: Constants.statusBarHeight, flexGrow: 1 }}>
      <Login />
    </View>
  )
}

export default Main
