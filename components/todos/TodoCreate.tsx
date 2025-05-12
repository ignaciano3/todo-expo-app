import { today } from "@/lib/utils";
import { addTodo } from "@/services/TodoService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { View } from "react-native";
import { Input } from "../Input";
import { InputDate } from "../InputDate";

export function TodoCreate() {
  const db = useSQLiteContext();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState<Date>(new Date());

  const createTodo = useMutation({
    mutationFn: async () => {
      if (title.trim() === "") {
        throw new Error("El título no puede estar vacío");
      }
      if (dueDate < today) {
        throw new Error("La fecha de vencimiento no puede ser anterior a hoy");
      }
      await addTodo(db, {
        title,
        dueDate,
      });
    },
    onSuccess: () => {
      setTitle("");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Error al crear la tarea:", error);
    },
  });

  const handleCreateTodo = async () => {
    await createTodo.mutateAsync();
  };

  return (
    <View
      style={{ paddingVertical: 10, paddingHorizontal: 20, position: "absolute", bottom: 0, left: 0, right: 0 }}
    >
      <InputDate date={dueDate} setDate={setDueDate} />
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
