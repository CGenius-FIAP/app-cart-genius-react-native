import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ResponseScreen = ({ navigation }) => {
    const [userInput, setUserInput] = useState('');
    const [responses, setResponses] = useState([]);

    const callApi = async () => {
        console.log("User input:", userInput);
        
        fetch('http://192.168.0.102:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: userInput }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("Data received from API:", data);
            setResponses([...responses, data.response]);
        })
        .catch((error) => {
            console.error('Ocorreu um erro ao acessar a API:', error);
        });
    };

    return (
        <LinearGradient colors={['#190C2A', '#822760']} style={styles.container}>
            <View style={[styles.firstView, { flex: 1 }]}>
            <Text style={styles.responseText}>
                <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Cart Genius: </Text>Olá, como posso te ajudar?
            </Text>
                <FlatList
                    data={responses}
                    renderItem={({ item }) => (
                        <Text style={styles.responseText}>
                           <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Cart Genius: </Text>{item}
                        </Text>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.inputContainer}
            >
                <TextInput
                    style={styles.input}
                    value={userInput}
                    onChangeText={(text) => setUserInput(text)}
                />
                <TouchableOpacity style={styles.sendButton} onPress={callApi}>
                    <Text style={styles.sendButtonText}>Enviar</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    firstView: {
        paddingTop: 40,
        maxHeight: 700,
        overflowY: 'auto'
    },
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
        marginBottom: 30,
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