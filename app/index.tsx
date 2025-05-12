import { TodoCreate } from "@/components/todos/TodoCreate";
import { TodoList } from "@/components/todos/TodoList";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flex: 1 }}>
      <TodoList />
      <TodoCreate />
    </SafeAreaView>
  );
}
