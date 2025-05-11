export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoCreate {
  title: string;
  dueDate: Date;
}
