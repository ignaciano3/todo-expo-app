import { StyleSheet, Text } from "react-native";
import { TodoCreate } from "./TodoCreate";
import { TodoList } from "./TodoList";

export default function TodoPage({ date }: { date: Date }) {
  return (
    <>
      <Text style={styles.dateTitle}>
        {Intl.DateTimeFormat("es-AR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "2-digit",
        }).format(date)}
      </Text>
      <TodoList date={date} />
      <TodoCreate date={date} />
    </>
  );
}
const styles = StyleSheet.create({
  dateTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
});
