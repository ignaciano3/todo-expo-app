import { today, todosQueryKey } from "@/lib/utils";
import { addTodo } from "@/services/TodoService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { View } from "react-native";
import { Input } from "../Input";

export function TodoCreate({ date }: { date: Date }) {
  const db = useSQLiteContext();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");

  const createTodo = useMutation({
    mutationFn: async () => {
      if (title.trim() === "") {
        throw new Error("El título no puede estar vacío");
      }
      if (date < today) {
        throw new Error("La fecha de vencimiento no puede ser anterior a hoy");
      }
      await addTodo(db, {
        title,
        dueDate: date,
      });
    },
    onSuccess: () => {
      setTitle("");
      queryClient.invalidateQueries({ queryKey: todosQueryKey(date) });
    },
    onError: (error) => {
      console.error("Error al crear la tarea:", error);
    },
  });

  const handleCreateTodo = async () => {
    await createTodo.mutateAsync();
  };

  return (
    <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
      <Input
        value={title}
        onChangeText={setTitle}
        placeholder="Titulo"
        style={{ marginBottom: 10 }}
        onSubmitEditing={handleCreateTodo}
      />
    </View>
  );
}
