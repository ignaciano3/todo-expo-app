export const today = new Date();
today.setHours(0, 0, 0, 0);

export const todosQueryKey = (date: Date) => {
  return [`todos:${date.toISOString().split("T")[0]}`] as const;
};
