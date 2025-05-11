import { TodoCreate } from "@/components/todos/TodoCreate";
import { TodoList } from "@/components/todos/TodoList";
import { View } from "react-native";

export default function Index() {
  return (
    <View>
      <TodoList />
      <TodoCreate />
    </View>
  );
}
