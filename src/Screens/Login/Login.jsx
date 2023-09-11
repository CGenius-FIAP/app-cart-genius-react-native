import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import CreateAcoount from '../../Screens/CreateAccount/CreateAccount'
import FooterMenu from '../../components/FooterMenu';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [personType, setPersonType] = useState('');
  const [showInputs, setShowInputs] = useState(false);

  const choosePersonType = (type) => {
    setPersonType(type);
    setShowInputs(true);
  };

  const login = async () => {
    try {
      const response = await axios.post(`https://rm94377webapp.azurewebsites.net/${personType}/login`, {
        email: email,
        senha: senha,
      });

      const userWithPersonType = {
        ...response.data,
        personType: personType,
      }

      await AsyncStorage.setItem('user', JSON.stringify(userWithPersonType));
      await AsyncStorage.setItem('userId', response.data.id.toString());

      // se o login for bem-sucedido, navegue para a tela inicial
      navigation.reset({
        index: 0,
        routes: [{ name: 'ChatScreen' }],
      });
    } catch (error) {
      // se ocorrer um erro na solicitação, exiba um alerta
      if (error.response.status === 401) {
        Alert.alert("Erro", "E-mail e/ou senha inválidos.");
      } else {
        console.error('Erro ao fazer login:', error);
        Alert.alert("Erro", "Não foi possível realizar o login. Por favor, tente novamente mais tarde.");
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['right', 'left']}>
      <LinearGradient colors={['#190C2A', '#822760']} style={styles.container}>
        <Image source={require('../../../assets/logo.jpeg')} style={styles.logo} />
        <Text style={styles.title}>Cart Genius</Text>
        {!showInputs && (
          <>
            <TouchableOpacity style={styles.button} onPress={() => choosePersonType('clientes')}>
              <Text style={styles.buttonText}>Clientes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => choosePersonType('empresas')}>
              <Text style={styles.buttonText}>Empresas</Text>
            </TouchableOpacity>
          </>
        )}
        {showInputs && (
          <>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
              backgroundColor="white"
            />
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              value={senha}
              onChangeText={(text) => setSenha(text)}
              secureTextEntry
              backgroundColor="white"
            />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText} /* onPress={() => navigation.navigate('ChatScreen')}*/ onPress={login}>Entrar</Text>
            </TouchableOpacity>
          </>
        )}
        <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
        <Text style={styles.createAccount}>
          Não tem uma conta? Crie uma <Text style={styles.hereLink} onPress={() => navigation.navigate('CreateAccount')}>aqui</Text>.</Text>
      </LinearGradient>
      <FooterMenu navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
    borderRadius: 100,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#FFFFFF',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00072E',
    paddingHorizontal: 60,
    paddingVertical: 20,
    borderRadius: 4,
    marginTop: 25,
    borderColor: '#FFFFFF',
    borderWidth: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  label: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: '10%',
    marginBottom: 5,
  },
  forgotPassword: {
    color: '#B3B3B3',
    fontSize: 14,
    marginTop: 20,
  },
  createAccount: {
    color: '#B3B3B3',
    fontSize: 14,
    marginTop: 9,
  },
  hereLink: {
    color: 'white',
    textDecorationLine: 'underline',
  },
  footerMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'black',
    height: 60,
    alignSelf: 'stretch',
  },
  footerMenuItem: {
    color: 'white',
    fontSize: 16,
  },
});

export default Login;
