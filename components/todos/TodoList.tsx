import { getTodos } from "@/services/TodoService";
import { useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { TodoItem } from "./TodoItem";

export function TodoList() {
  const db = useSQLiteContext();
  const { data: todos, isPending } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos.bind(null, db),
  });

  if (isPending) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!todos || todos.length === 0) {
    return (
      <View>
        <Text style={{ marginLeft: 24, fontSize: 20, marginTop: 20 }}>
          No hay tareas pendientes
        </Text>
      </View>
    );
  }

  return (
    <View style={{ paddingHorizontal: 4, marginBottom: 120 }}>
      <FlatList
        data={todos}
        renderItem={({ item }) => <TodoItem todo={item} dbContext={db} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
