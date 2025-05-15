import { Dimensions, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

export function SwipeView({
  onSwipeLeft,
  onSwipeRight,
  children,
}: {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  children: React.ReactNode;
}) {
  const onSwipe = (direction: "left" | "right") => {
    if (direction === "left") {
      onSwipeLeft();
    } else if (direction === "right") {
      onSwipeRight();
    }
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        onSwipeableWillOpen={onSwipe}
        renderLeftActions={() => <ActionPlaceHolder />}
        renderRightActions={() => <ActionPlaceHolder />}
        containerStyle={{ flex: 1 }}
      >
        {children}
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const ActionPlaceHolder = () => {
  return (
    <View
      style={{
        width: Dimensions.get("screen").width / 4,
        height: "100%",
        backgroundColor: "#c0c0c0",
      }}
    />
  );
};
