import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ResponseScreen = ({ route }) => {
    const [userInput, setUserInput] = useState('');
    const [responses, setResponses] = useState(route.params.responses);

    const sendUserInput = () => {
        // Envie a userInput para a API e atualize as respostas
        // Certifique-se de tratar a lógica da API e adicionar a resposta à lista responses
        // Exemplo:
        fetch('http://192.168.0.102:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: userInput }),
        })
        .then((res) => res.json())
        .then((data) => {
            setResponses([...responses, data.response]);
        })
        .catch((error) => {
            console.error('Ocorreu um erro ao acessar a API:', error);
        });
        setUserInput('');
    };

    return (
        <LinearGradient colors={['#190C2A', '#822760']} style={styles.container}>
            <View>
                <FlatList
                    data={responses}
                    renderItem={({ item }) => (
                        <Text style={styles.responseText}>Cart Genius: {item}</Text>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={userInput}
                        onChangeText={(text) => setUserInput(text)}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={sendUserInput}>
                        <Text style={styles.sendButtonText}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 80,
        paddingBottom: 70,
        paddingRight: 40,
        paddingLeft: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    responseText: {
        marginBottom: 25,
        color: '#FFF',
        fontSize: 16
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginRight: 10,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: '#FFF'
    },
    sendButton: {
        backgroundColor: '#00072E',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 4,
    },
    sendButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ResponseScreen;
