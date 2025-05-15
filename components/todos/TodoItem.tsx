import { todosQueryKey } from "@/lib/utils";
import type { Todo } from "@/models/Todo";
import { deleteTodo, toggleCompleteTodo } from "@/services/TodoService";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type SQLiteDatabase } from "expo-sqlite";
import { StyleSheet, Text, View } from "react-native";

const TodoOptions = ({
  todo,
  dbContext,
}: {
  todo: Todo;
  dbContext: SQLiteDatabase;
}) => {
  const queryClient = useQueryClient();
  const remove = useMutation({
    mutationFn: (todoId: number) => deleteTodo.bind(null, dbContext)(todoId),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: todosQueryKey(todo.dueDate),
      });
    },
  });
  const toggleComplete = useMutation({
    mutationFn: (data: { id: number; completed: boolean }) =>
      toggleCompleteTodo.bind(null, dbContext)(data.id, data.completed),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: todosQueryKey(todo.dueDate),
      });
    },
  });

  const handleRemove = () => {
    remove.mutate(todo.id);
  };
  const handleToggle = () => {
    toggleComplete.mutate({ id: todo.id, completed: !todo.completed });
  };
  return (
    <View style={styles.options}>
      <Ionicons
        name="checkmark-circle"
        size={24}
        color="green"
        onPress={handleToggle}
      />
      <Ionicons
        name="trash"
        size={24}
        color="red"
        style={styles.optionIcon}
        onPress={handleRemove}
      />
    </View>
  );
};

export function TodoItem({
  todo,
  dbContext,
}: {
  todo: Todo;
  dbContext: SQLiteDatabase;
}) {
  return (
    <View style={styles.container}>
      <TodoOptions todo={todo} dbContext={dbContext} />
      <Text style={[styles.title, todo.completed && styles.completed]}>
        {todo.title}
      </Text>
      <Text style={styles.dueDate}>{todo.dueDate.toLocaleDateString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    flex: 1,
  },
  dueDate: {
    fontSize: 14,
    color: "#666",
    marginLeft: "auto",
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  options: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionIcon: {
    marginLeft: 10,
  },
});
