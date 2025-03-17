import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MathBackground from '../components/MathBackground';

export default function PerfilScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>👤 Profile Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24, fontWeight: 'bold' },
});