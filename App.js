import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import Colors from "./constants/Colors";
import Home from "./screens/Home";
import Add from "./screens/Add";
import Search from "./screens/Search";
import MyPage from "./screens/MyPage";
import Schedule from "./screens/Schedule";
import SearchPhoto from "./screens/SearchPhoto";
import SearchName from "./screens/SearchName";
import AddPhoto from "./screens/AddPhoto";
import AddName from "./screens/AddName";
import AddResult from "./screens/AddResult";
import ImagePreview from "./components/camera/ImagePreview";
import SearchResult from "./screens/SearchResult";

//context
import MedicinesContextProvider from "./store/context/medicines-context";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function StackNavigator1() {
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
function StackNavigator3() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="main" component={AddPhoto} />
      <Stack.Screen name="ImagePreview" component={ImagePreview} />
      <Stack.Screen name="AddResult" component={AddResult} />
    </Stack.Navigator>
  );
}
function StackNavigator2() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AddScreen" component={Add} />
      <Stack.Screen name="AddPhoto" component={StackNavigator3} />
      <Stack.Screen name="AddName" component={AddName} />
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
  useEffect(() => {
    async function hideSplash() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }

    hideSplash();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // 폰트가 로딩되는 동안은 내용을 표시하지 않음
  }

  return (
    <>
      <StatusBar style="dark" />
      <MedicinesContextProvider>
        <NavigationContainer>
          <BottomTab.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: Colors.main,
              tabBarInactiveTintColor: Colors.grey4,
              tabBarStyle: {
                ...Platform.select({
                  ios: {
                    backgroundColor: "#ffffff",
                    height: "12%",
                    justifyContent: "center",
                    paddingTop: 10,
                    paddingHorizontal: 8,
                    paddingBottom: 23,
                  },
                  android: {
                    backgroundColor: "#ffffff",
                    height: "12%",
                    justifyContent: "center",
                    paddingVertical: 14,
                    paddingHorizontal: 8,
                    paddingBottom: 8,
                  },
                }),
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
              component={StackNavigator1}
              options={{
                tabBarLabel: "검색",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="search" color={color} size={30} />
                ),
              }}
            />
            <BottomTab.Screen
              name="Add"
              component={StackNavigator2}
              options={{
                tabBarLabel: "",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="add-circle" color={color} size={60} />
                ),
              }}
            />
            <BottomTab.Screen
              name="Schedule"
              component={SearchResult}
              options={{
                tabBarLabel: "점검",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="calendar-outline" color={color} size={30} />
                ),
              }}
            />
            <BottomTab.Screen
              name="MyPage"
              component={AddResult}
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
      </MedicinesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  rootContainer: {},
});
