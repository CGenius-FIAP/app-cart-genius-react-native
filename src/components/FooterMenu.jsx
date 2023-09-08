import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const FooterMenu = ({ navigation }) => {
  return (
    <View style={styles.footerMenu}>
      <TouchableOpacity onPress={() => navigation.navigate('Sobre')}>
        <Text style={styles.footerMenuItem}>Sobre</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
        <Text style={styles.footerMenuItem}>Cadastro</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.footerMenuItem}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#000000',
    height: 100,
    paddingHorizontal: 20
  },
  footerMenuItem: {
    color: 'white',
    fontSize: 20,
    marginBottom: 25
  },
});

export default FooterMenu;
