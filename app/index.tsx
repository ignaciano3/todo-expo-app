import { SwipeView } from "@/components/SwipeView";
import TodoPage from "@/components/todos/TodoPage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

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
        <TodoPage date={date} />
      </SwipeView>
    </SafeAreaView>
  );
}
