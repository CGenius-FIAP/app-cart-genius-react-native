import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import FooterMenu from '../../components/FooterMenu';

const ChatScreen = ({ navigation }) => {
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState('');

    const callApi = async () => {
        console.log("User input:", userInput); // Log the user input before making the API call
        
        fetch('http://192.168.0.102:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: userInput }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("Data received from API:", data);  // Log the data received from API
            setResponse(data.response);
        })
        .catch((error) => {
            console.error('Ocorreu um erro ao acessar a API:', error);
        });
    };

  return (
    <SafeAreaView style={styles.safeArea} edges={['right', 'left']}>
      <LinearGradient colors={['#190C2A', '#822760']} style={styles.container}>
        <Text style={styles.title}>Cart Genius</Text>
        <Text style={styles.label}>Faça seu pedido</Text>
        <TextInput
          style={styles.input}
          backgroundColor="white"
          value={userInput}
          onChangeText={(text) => setUserInput(text)}
        />
        <TouchableOpacity style={styles.button} onPress={callApi}>
          <Text style={styles.buttonText}>Fazer pedido</Text>
        </TouchableOpacity>
        {response && (
            <View>
                <Text>Resposta da API</Text>
                <Text>{response}</Text>
            </View>
        )}
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

export default ChatScreen;
