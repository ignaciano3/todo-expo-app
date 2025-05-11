import { StyleSheet, TextInput, type TextInputProps } from "react-native";

type InputProps = TextInputProps;

export function Input(props: InputProps) {
  return <TextInput {...props} style={[styles.input, props.style]} />;
}

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#333",
  },
});
