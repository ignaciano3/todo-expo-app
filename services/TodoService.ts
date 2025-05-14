import type { Todo, TodoCreate } from "@/models/Todo";
import type { SQLiteDatabase } from "expo-sqlite";

// TODO: Pasar a una clase q ya tenga la base de datos inicializada

export async function getTodos(db: SQLiteDatabase): Promise<Todo[]> {
  const result = await db.getAllAsync<Todo>("SELECT * FROM todos");

  // Convertir las fechas de string a Date
  const todos = result.map((todo) => ({
    ...todo,
    dueDate: new Date(todo.dueDate),
    createdAt: new Date(todo.createdAt),
    updatedAt: new Date(todo.updatedAt),
  }));
  return todos;
}

export async function getTodosByDate(
  db: SQLiteDatabase,
  date: Date
): Promise<Todo[]> {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  const result = await db.getAllAsync<Todo>(
    "SELECT * FROM todos WHERE dueDate BETWEEN ? AND ?",
    [startOfDay.toISOString(), endOfDay.toISOString()]
  );
  // Convertir las fechas de string a Date
  const todos = result.map((todo) => ({
    ...todo,
    dueDate: new Date(todo.dueDate),
    createdAt: new Date(todo.createdAt),
    updatedAt: new Date(todo.updatedAt),
  }));
  return todos;
}

export async function addTodo(
  db: SQLiteDatabase,
  todo: TodoCreate
): Promise<void> {
  await db.runAsync("INSERT INTO todos (title, dueDate) VALUES (?, ?)", [
    todo.title,
    todo.dueDate.toISOString(),
  ]);
}

export async function toggleCompleteTodo(
  db: SQLiteDatabase,
  id: number,
  completed = true
): Promise<void> {
  await db.runAsync("UPDATE todos SET completed = ? WHERE id = ?", [
    completed ? 1 : 0,
    id,
  ]);
  console.log("Todo updated:", { id, completed });
}

export async function deleteTodo(
  db: SQLiteDatabase,
  id: number
): Promise<void> {
  await db.runAsync("DELETE FROM todos WHERE id = ?", [id]);
  console.log("Todo deleted:", { id });
}
