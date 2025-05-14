import { Redirect } from "expo-router";
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
        renderLeftActions={() => (
          <View style={{ width: Dimensions.get("screen").width / 4 }} />
        )}
        renderRightActions={() => (
          <View
            style={{ width: Dimensions.get("screen").width / 4 }}
          ></View>
        )}
        containerStyle={{ flex: 1 }}
      >
        {children}
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const LeftRedirect = () => {
  return (
    <Redirect
      href={{
        pathname: "/",
        params: { dateIso: new Date().toISOString() },
      }}
    />
  );
};
