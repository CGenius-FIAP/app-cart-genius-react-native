import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import FooterMenu from '../../components/FooterMenu';
import RNPickerSelect from 'react-native-picker-select';
import { ScrollView } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';

const CreateAccount = ({ navigation }) => {

  const [personType, setPersonType] = useState('');

  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cnpj, setCnpj] = useState('');

  const [emailError, setEmailError] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);

  useEffect(() => {
    // regex for validating an email address
    const emailRegex = /\S+@\S+\.\S+/;
    // check that all inputs are filled out and valid
    const validEmail = emailRegex.test(email);

    if (emailTouched) { // only set the error message if the email input has been selected
      setEmailError(validEmail ? '' : 'Informe um e-mail válido.');
    }
  }, [email, telefone]);

  const register = async () => {
    let url = `http://192.168.0.104:8080/${personType}`; // URL dinâmica baseada no tipo de pessoa
    let data;

    if (personType === 'clientes') {
      data = {
        nome,
        endereco,
        telefone,
        email,
        senha,
      };
    } else if (personType === 'empresas') {
      data = {
        nome,
        endereco,
        telefone,
        email,
        cnpj,
        senha
      };
    }

    try {
      const response = await axios.post(url, data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['right', 'left']}>
      <LinearGradient colors={['#190C2A', '#822760']} style={styles.container}>
        <RNPickerSelect
        placeholder={{
          label: 'Selecione o tipo de cadastro',
          value: null,
        }}
        onValueChange={(value) => setPersonType(value)}
        items={[
          { label: 'Cliente', value: 'clientes' },
          { label: 'Empresa', value: 'empresas' },
        ]}
        style={{
          ...pickerSelectStyles,
          iconContainer: {
            top: 10,
            right: 12,
          },
        }}
      />
      {personType === 'clientes' && (
        <>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={(text) => setNome(text)}
            keyboardType="default"
            backgroundColor="white"
          />
          <Text style={styles.label}>Endereço</Text>
          <TextInput
            style={styles.input}
            value={endereco}
            onChangeText={(text) => setEndereco(text)}
            backgroundColor="white"
          />
          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            value={telefone}
            onChangeText={(text) => setTelefone(text)}
            keyboardType="phone-pad"
            backgroundColor="white"
          />
          <Text style={styles.label}>E-mail</Text>
          {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
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
        </>
      )}
      {personType === 'empresas' && (
        <>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={(text) => setNome(text)}
            keyboardType="default"
            backgroundColor="white"
          />
          <Text style={styles.label}>Endereço</Text>
          <TextInput
            style={styles.input}
            value={endereco}
            onChangeText={(text) => setEndereco(text)}
            backgroundColor="white"
          />
          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            value={telefone}
            onChangeText={(text) => setTelefone(text)}
            keyboardType="phone-pad"
            backgroundColor="white"
          />
          <Text style={styles.label}>CNPJ</Text>
          <TextInput
            style={styles.input}
            value={cnpj}
            onChangeText={(text) => setCnpj(text)}
            backgroundColor="white"
          />
          <Text style={styles.label}>E-mail</Text>
          {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
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
        </>
      )}
        <TouchableOpacity style={styles.button} onPress={register}>
          <Text style={styles.buttonText}>Criar conta</Text>
        </TouchableOpacity>
      </LinearGradient>
      <FooterMenu navigation={navigation} />
    </SafeAreaView>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: 'black',
    paddingRight: 30,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: 'black',
    paddingRight: 30,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60
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
    marginBottom: 20,
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

export default CreateAccount;
