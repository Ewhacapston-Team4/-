import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

import Colors from "./constants/Colors";
import Home from "./screens/Home";
import Add from "./screens/Add";
import Search from "./screens/Search";
import MyPage from "./screens/MyPage";
import Schedule from "./screens/Schedule";
import SearchPhoto from "./screens/SearchPhoto";
import SearchName from "./screens/SearchName";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SearchScreen" component={Search} />
      <Stack.Screen name="SearchPhoto" component={SearchPhoto} />
      <Stack.Screen name="SearchName" component={SearchName} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    "nnsq-light": require("./assets/fonts/NanumSquareRoundL.ttf"),
    "nnsq-regular": require("./assets/fonts/NanumSquareRoundR.ttf"),
    "nnsq-bold": require("./assets/fonts/NanumSquareRoundB.ttf"),
    "nnsq-black": require("./assets/fonts/NanumSquareRoundEB.ttf"),
    "noto-sans-thin": require("./assets/fonts/NotoSansKR-Thin.otf"),
    "noto-sans-light": require("./assets/fonts/NotoSansKR-Light.otf"),
    "noto-sans-regular": require("./assets/fonts/NotoSansKR-Regular.otf"),
    "noto-sans-medium": require("./assets/fonts/NotoSansKR-Medium.otf"),
    "noto-sans-bold": require("./assets/fonts/NotoSansKR-Bold.otf"),
    "noto-sans-black": require("./assets/fonts/NotoSansKR-Black.otf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <BottomTab.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: Colors.main,
            tabBarInactiveTintColor: Colors.grey4,
            tabBarStyle: {
              backgroundColor: "#ffffff",
              height: "12%",
              justifyContent: "center",
              paddingVertical: 14,
              paddingHorizontal: 8,
              paddingBottom: 8,
            },
            tabBarLabelStyle: {
              fontSize: 15,
              margin: 0,
              padding: 0,
              fontFamily: "noto-sans-medium",
            },
            tabBarIconStyle: {},
          }}
        >
          <BottomTab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: "홈",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={30} />
              ),
            }}
          />
          <BottomTab.Screen
            name="Search"
            component={StackNavigator}
            options={{
              tabBarLabel: "검색",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="search" color={color} size={30} />
              ),
            }}
          />
          <BottomTab.Screen
            name="Add"
            component={Add}
            options={{
              tabBarLabel: "",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="add-circle" color={color} size={60} />
              ),
            }}
          />
          <BottomTab.Screen
            name="Schedule"
            component={Schedule}
            options={{
              tabBarLabel: "점검",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="calendar-outline" color={color} size={30} />
              ),
            }}
          />
          <BottomTab.Screen
            name="MyPage"
            component={MyPage}
            options={{
              tabBarLabel: "마이페이지",
              tabBarIcon: ({ color, size }) => (
                <Ionicons
                  name="person-circle-outline"
                  color={color}
                  size={34}
                />
              ),
            }}
          />
        </BottomTab.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  rootContainer: {},
});
