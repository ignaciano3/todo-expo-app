import { todosQueryKey } from "@/lib/utils";
import { getTodosByDate } from "@/services/TodoService";
import { useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
  View,
} from "react-native";
import { TodoItem } from "./TodoItem";

export function TodoList({ date }: { date: Date }) {
  const db = useSQLiteContext();
  const { data: todos, isPending } = useQuery({
    queryKey: todosQueryKey(date),
    queryFn: getTodosByDate.bind(null, db).bind(null, date),
  });

  if (isPending) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ paddingHorizontal: 4, marginVertical: 20 }}>
      <FlatList
        data={todos}
        renderItem={({ item }) => <TodoItem todo={item} dbContext={db} />}
        ListEmptyComponent={() => (
          <Text style={{ fontSize: 20, textAlign: "center" }}>
            No hay tareas pendientes
          </Text>
        )}
        style={{ maxHeight: Dimensions.get("screen").height - 300 }}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
