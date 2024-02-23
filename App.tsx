import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { MainRouterParamList } from "./src/types/navigation.types";
import { AlbumDetailsScreen } from "./src/screens/album-details.screen";
import { AlbumListScreen } from "./src/screens/album-list.screen";
import { Provider } from "react-redux";
import { store } from "./src/store";

const MainRouter = createNativeStackNavigator<MainRouterParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar style="inverted" />
        <NavigationContainer>
          <MainRouter.Navigator
            initialRouteName="AlbumList"
            screenOptions={{
              contentStyle: {
                backgroundColor: "#faf9f7",
              },
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: "transparent",
              },
              headerTitleStyle: {
                color: "orange",
              },
            }}
          >
            <MainRouter.Screen name="AlbumList" component={AlbumListScreen} options={{ title: "ALBUMIFY", headerTitleAlign: "center" }} />
            <MainRouter.Screen name="AlbumDetails" component={AlbumDetailsScreen} />
          </MainRouter.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf9f7",
  },
});
