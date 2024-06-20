import { useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Animated, Easing, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";

import Colors from "./constants/Colors";
import Home from "./screens/Home";
import SearchPhoto from "./screens/Search/SearchPhoto";
import SearchName from "./screens/Search/SearchName";
import SearchResult from "./screens/Search/SearchResult";
import Search from "./screens/Search/Search";
import AddPhoto from "./screens/Add/AddPhoto";
import AddName from "./screens/Add/AddName";
import AddResult from "./screens/Add/AddResult";
import Add from "./screens/Add/Add";
import ImagePreview from "./components/camera/ImagePreview";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import Schedule from "./screens/Schedule";
import ImageEdit from "./components/camera/ImageEdit";
import Instruction from "./screens/Search/Instruction";

//context
import DailyContextProvider from "./store/context/daily-context";
import PillsContextProvider from "./datas/pills-list";
import AuthContextProvider, { AuthContext } from "./store/context/auth-context";
import { PillsProvider } from "./store/context/pills-context";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.point },
        headerTintColor: "white",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 22,
          fontFamily: "nnsq-bold",
        },
        contentStyle: { backgroundColor: Colors.bg1 },
      }}
    >
      <Stack.Screen name="로그인" component={LoginScreen} />
      <Stack.Screen name="회원가입" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
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
              height: "13%",
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
        component={Instruction}
        options={{
          tabBarLabel: "마이페이지",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" color={color} size={34} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function StackNavigator1() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...Platform.select({
          android: { animation: "slide_from_bottom" },
          ios: { animation: "slide_from_bottom" },
        }),
      }}
    >
      <Stack.Screen name="SearchScreen" component={Search} />
      <Stack.Screen name="SearchPhoto" component={StackNavigator4} />
      <Stack.Screen name="SearchName" component={SearchName} />
    </Stack.Navigator>
  );
}
function StackNavigator3() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...Platform.select({
          android: { animation: "slide_from_bottom" },
          ios: { animation: "slide_from_bottom" },
        }),
      }}
    >
      <Stack.Screen name="main" component={AddPhoto} />
      <Stack.Screen
        name="ImagePreview"
        component={ImagePreview}
        options={{
          tabBarStyle: { display: "none" },
        }}
      />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ImageEdit" component={ImageEdit} />
      <Stack.Screen name="AddResult" component={AddResult} />
    </Stack.Navigator>
  );
}
function StackNavigator4() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="main" component={SearchPhoto} />
      <Stack.Screen
        name="ImagePreview"
        component={ImagePreview}
        screenOptions={{
          tabBarStyle: { display: "none" },
        }}
      />
      <Stack.Screen name="SearchResult" component={SearchResult} />
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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
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
      <DailyContextProvider>
        <AuthContextProvider>
          <PillsProvider>
            <Navigation />
          </PillsProvider>
        </AuthContextProvider>
      </DailyContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  rootContainer: {},
});
