import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "404" }} />
      <View style={styles.container}>
        <Text style={styles.title}>404 Not Found</Text>
        <Link href="/" style={styles.link}>
          Volver al inicio
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
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
});