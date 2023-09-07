// http://192.168.0.102:5000/query
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import FooterMenu from '../../components/FooterMenu';

const ChatScreen = ({ navigation }) => {
    const [userInput, setUserInput] = useState('');
    const [responses, setResponses] = useState([]);

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
            // Adicione a nova resposta ao array de respostas
            setResponses([...responses, data.response]);
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
                <View style={styles.chatArea}>
                    <FlatList
                        data={responses}
                        renderItem={({ item }) => (
                            <Text style={styles.chatText}>Cart Genius: {item}</Text>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
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
        marginBottom: 5,
    },
    chatArea: {
        marginTop: 40,
        paddingTop: 14,
        paddingBottom: 14,
        paddingLeft: 30,
        paddingRight: 30,
        backgroundColor: '#FFF',
        width: '80%',
        maxHeight: 320,
        overflowY: 'auto',
        borderRadius: 20
    },
    chatText: {
        marginBottom: 10,
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
