import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import EventsScreen from "./screens/EventsScreen";
import AddEventScreen from "./screens/AddEventScreen";

const Stack = createStackNavigator();

export default function App() {
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();

  return (
    <NavigationContainer
      ref={containerRef}
      initialState={initialNavigationState}
    >
      <Stack.Navigator mode="modal">
        <Stack.Screen
          name="Events"
          component={EventsScreen}
          options={{
            title: "Memento",
            headerStyle: { backgroundColor: "#01a699" },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="AddEvent"
          component={AddEventScreen}
          options={{
            headerStyle: { backgroundColor: "#01a699" },
            headerTintColor: "#fff",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
