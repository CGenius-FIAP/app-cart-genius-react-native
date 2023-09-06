import React from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import FooterMenu from '../../components/FooterMenu';

const Register = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['right', 'left']}>
      <LinearGradient colors={['#190C2A', '#822760']} style={styles.container}>
        <Text style={styles.title}>Crie sua conta</Text>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          keyboardType="name"
          backgroundColor="white"
        />
        <Text style={styles.label}>Endereço</Text>
        <TextInput
          style={styles.input}
          backgroundColor="white"
        />
        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={styles.input}
          keyboardType="phone"
          backgroundColor="white"
        />
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          backgroundColor="white"
        />
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          backgroundColor="white"
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Criar conta</Text>
        </TouchableOpacity>
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

export default Register;
