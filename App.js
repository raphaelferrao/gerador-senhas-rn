import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import Clipboard from 'expo-clipboard';

import Logo from './src/assets/logo.png';

const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$'

export default function App() {

  const [password, setPassword] = useState('');
  const [sizePassword, setSizePassword] =  useState(5);

  function generatePass() {
    
    let pass = '';

    for (let i=0, n=charset.length; i < sizePassword; i++) {
      pass += charset.charAt(Math.floor(Math.random() * n));
    }

    setPassword(pass);
  }

  function copyPasswordToClipboard() {
    Clipboard.setString(password);
    alert('Senha copiada com sucesso!');
  }

  return (
    <View style={styles.container}>
      <Image 
        source={Logo} 
        style={styles.logo}
      />

      <Text style={styles.title}>{sizePassword} Caracteres</Text>
      <View style={styles.area}>
        <Slider 
          style={styles.slider}
          minimumValue={5}
          maximumValue={15}
          step={1}
          minimumTrackTintColor="#FF0000"
          maximumTrackTintColor="#000000"
          value={sizePassword}
          onValueChange={ (valor) => setSizePassword(valor) }
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={generatePass}>
        <Text style={styles.buttonText}>Gerar Senha</Text>
      </TouchableOpacity>

      { (password !== '') && (
        <View style={styles.area}>
          <Text style={styles.password} onLongPress={copyPasswordToClipboard}>{password}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    marginBottom: 60
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold'
  },

  area: {
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: '#FFF',
    width: '90%',
    borderRadius: 7
  },

  slider: {
    height: 50
  },

  button: {
    backgroundColor: '#FFA200',
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    marginBottom: 25
  },
  
  buttonText: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold'
  },

  password: {
    padding: 10,
    textAlign: 'center',
    fontSize: 20
  }
});
