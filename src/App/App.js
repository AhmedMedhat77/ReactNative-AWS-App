import { SafeAreaView, Text, View } from "react-native";
import { globalStyles } from "../Global/GlobalStyles";
import Login from "../screen/Login/Login";

import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screen/Home/Home";
const stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
}
