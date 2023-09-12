import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import FooterMenu from '../../components/FooterMenu';

const About = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container} edges={['right', 'left']}>
        <LinearGradient colors={['#190C2A', '#822760']} style={styles.gradient}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Sobre</Text>
            <Text style={styles.aboutText}>
              O Cart Genius é uma aplicação que utiliza tecnologia de IA/Chatbot para auxiliar clientes de empresas a encontrar produtos de forma mais fácil e eficiente.</Text>
              <Text style={styles.aboutText}>Ao interagir com o nosso chat, os clientes podem fazer perguntas sobre produtos específicos, tais como características, preço, dentre outras informações relevantes. O sistema, por sua vez, utiliza técnicas de processamento de linguagem natural para entender o que o cliente está buscando e fornecer respostas precisas e personalizadas em tempo real.
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
            <Text style={styles.linkTextTwo}>Para experimentar o nosso chat Cart Genius e ter uma experiência de compras inovadora, <Text style={styles.linkText}>clique aqui</Text>.</Text>
            </TouchableOpacity>
            <View style={styles.creditsContainer}>
              <Text style={styles.creditsTitle}>Feito por:</Text>
              <Text style={styles.creditsText}>Jorge Camara (RM93739)</Text>
              <Text style={styles.creditsText}>Filipe Santos (RM94377)</Text>
              <Text style={styles.creditsText}>Vitor Madureira (RM94036)</Text>
            </View>
          </View>
          <FooterMenu navigation={navigation} />
        </LinearGradient>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 100,
    marginBottom: 40,
  },
  aboutText: {
    color: 'white',
    marginBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'justify',
    fontSize: 16
  },
  linkText: {
    color: 'white',
    textDecorationLine: 'underline',
    marginBottom: 40,
    paddingLeft: 20,
    paddingRight: 20,
  },
  linkTextTwo: {
    color: 'white',
    marginBottom: 40,
    paddingLeft: 20,
    paddingRight: 20,
  },
  creditsContainer: {
    alignItems: 'center',
    marginTop: 100
  },
  creditsTitle: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 14
  },
  creditsText: {
    color: 'grey',
    fontSize: 12
  },
});

export default About;
