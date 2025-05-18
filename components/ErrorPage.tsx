import type { ErrorBoundaryProps } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export function ErrorPage({error, retry} : ErrorBoundaryProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hubo un error inesperado!</Text>
      <Text style={styles.message}>{error.message}</Text>
      <Text style={styles.link} onPress={retry}>Reintentar?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    backgroundColor: "red",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  link: {
    fontSize: 18,
    color: "#2e78b7",
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
  },
});