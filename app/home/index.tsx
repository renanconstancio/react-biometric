// import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Alert, Button, Text, View } from 'react-native';
import { styles } from "./styles";

import * as LocalAuthentication from 'expo-local-authentication'

export function Home(){

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  async function verifyAvaliableAuthentication(){
    const compatible = await LocalAuthentication.hasHardwareAsync()  
    console.log(compatible);
    
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync(); 
    console.log(types.map(type => LocalAuthentication.AuthenticationType[type]));
  }

  async function handleAutheticaion(){
    const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();

    if(!isBiometricEnrolled){
      return Alert.alert('Login', 'Não foi possivél localizar uma biometria. Por favor, tente cadastrad uma nova biometria e tente novamente');
    }

    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login com Biometria',
      fallbackLabel: 'Não foi possivel reconhece a biometria',
    })

    setIsAuthenticated(auth.success);
  }

  useEffect(()=>{
    verifyAvaliableAuthentication();
  },[])


  return (
    <View style={styles.container}>
      <Text>
        Usuário Autenticado {isAuthenticated ? 'Sim' : 'Não'}
      </Text>
      {/* <StatusBar style="auto" /> */}
      <Button 
        title='Entrar' 
        onPress={handleAutheticaion} 
      />
    </View>
  );
}