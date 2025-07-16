import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

export default function EntryScreen() {
  const [text, onChangeText] = useState("Useless Text");
  const [number, onChangeNumber] = useState("");

  return (
    <ScrollView
      contentContainerStyle={{ padding: 16 }}
      style={{ backgroundColor: "#fff" }}
    >
      <ThemedText type="title">⏰ Registro de Horas</ThemedText>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="0"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="0"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="EJ: Trabajo matutino"
      />
       <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert('Horas registrada')}
        >
          <Text style={styles.buttonText}>+ Añadir Registro</Text>
        </TouchableOpacity>
      <ThemedText type="title">📋 Registro de Horas</ThemedText>
      <ThemedText type="default">
        No hay horas registradas
      </ThemedText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
    margin: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
