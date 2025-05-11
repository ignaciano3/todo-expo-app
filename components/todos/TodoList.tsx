import { getTodos } from "@/services/TodoService";
import { useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { FlatList, Text, View } from "react-native";
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
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (!todos || todos.length === 0) {
    return (
      <View>
        <Text>No hay tareas pendientes</Text>
      </View>
    );
  }

  return (
    <View style={{ paddingHorizontal: 4 }}>
      <FlatList
        data={todos}
        renderItem={({ item }) => <TodoItem todo={item} dbContext={db} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
