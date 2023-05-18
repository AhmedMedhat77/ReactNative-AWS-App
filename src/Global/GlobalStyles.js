import { Platform, StatusBar } from "react-native";
export const globalStyles = {
  AndroidSafeArea: {
    flex: 1,
    alignItems: "center",

    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
};
