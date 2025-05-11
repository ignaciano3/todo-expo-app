import {
  StyleSheet,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from "react-native";

type ButtonProps = TouchableOpacityProps & {
  text: string;
};

export function Button(props: ButtonProps) {
  const { text, ...rest } = props;
  
  return (
    <TouchableOpacity {...rest} style={[styles.button, props.style]}>
      <Text style={styles.text}>{text}</Text>
      {props.children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
});
