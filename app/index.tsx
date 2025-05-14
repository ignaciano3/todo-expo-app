import { SwipeView } from "@/components/SwipeView";
import { TodoCreate } from "@/components/todos/TodoCreate";
import { TodoList } from "@/components/todos/TodoList";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text } from "react-native";

export default function Index() {
  const router = useRouter();
  const { dateIso } = useLocalSearchParams<{ dateIso: string }>();
  const date = dateIso ? new Date(dateIso) : new Date();

  const onSwipeLeft = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    router.replace({
      pathname: "/",
      params: { dateIso: newDate.toISOString() },
    });
  };

  const onSwipeRight = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
    router.replace({
      pathname: "/",
      params: { dateIso: newDate.toISOString() },
    });
  };

  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={{ flex: 1 }}>
      <SwipeView onSwipeLeft={onSwipeLeft} onSwipeRight={onSwipeRight}>
        <Text style={styles.dateTitle}>
          {Intl.DateTimeFormat("es-AR", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          }).format(date)}
        </Text>
        <TodoList date={date} />
        <TodoCreate date={date} />
      </SwipeView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dateTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
});