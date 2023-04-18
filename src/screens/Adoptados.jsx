import React, { useState, useEffect } from "react"; 
import { View, Text, ScrollView, Image, SafeAreaView, StatusBar } from "react-native";
import axios from "axios";

const Adoptados = () => {

  const [ imagenes, setImagenes ] = useState([])

  useEffect(() => {
    const getImagenes = async() => {
        const result = await axios.get('https://api.unsplash.com/photos/?client_id=_rTqr0aFcKi-9GWBav3vrbhoEPe5xCB5RZTAxHnHnfU') 
            setImagenes(result.data) 
        }
        getImagenes()
    }, []);
  console.log(imagenes)

  return (
    
      <ScrollView contentContainerStyle={{justifyContent: 'center', alignItems:'center'}}>
        {imagenes.map(imagen => [
          console.log(imagen.urls.small),
          <View style={{paddingBottom: 10}}>
            <Image
              style={{width: 200, height: 200}}
              source={{ uri: imagen.urls.small }}
              key={imagen.id}
            />
          </View>

        ]
        )}
      </ScrollView>
    
  )
}

export default Adoptados;