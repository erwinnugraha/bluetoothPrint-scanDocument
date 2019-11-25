import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import styles from './styles';

const HomeScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>React Native Tesseract OCR</Text>
  </View>
);

HomeScreen.navigationOptions = {
  header: null,
};

export default HomeScreen;