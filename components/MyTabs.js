import React, { Component } from "react";
import { View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { IMAGENAME } from "./../SiteAssets/index";
import Home from "./Home";
import LiveBroadcast from "./LiveBroadcast";
import LanguageComponent from "./Language";
import Festivals from "./Festivals";
import LiveBradcastModal from "./LiveBradcastModal";
import Videos from "./Videos";
import Kids from "./Kids";
import Bhajans from "./Bhajans";
import More from "./More";
import ViewAll from "./ViewAll";
import { NavigationContainer } from "@react-navigation/native";
// import { BlurView } from "expo-blur";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons, Feather } from "@expo/vector-icons";
// import LiveBradcastModal from "./LiveBradcastModal";
// const CreateNewPlaceHolder = () => (
//   <View
//     style={{
//       flex: 1,
//       justifyContent: "center",
//       alignItems: "center",
//       backgroundColor: "rgba(0,0,0,0.5)",
//       marginTop: 450,
//     }}
//   ></View>
// );

const Tab = createMaterialTopTabNavigator();
const TabBottom = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function MyHomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Group>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ViewAllHome" component={ViewAll} />
        <Stack.Screen name="LiveBroadcastHome" component={LiveBroadcast} />
        <Stack.Screen name="Language" component={LanguageComponent} />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          name="LiveBradcastHomeModal"
          component={LiveBradcastModal}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
function LiveBraodcastStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Group>
        <Stack.Screen
          name="LiveBroadcast"
          // component={LiveBroadcast}
          children={(props) => (
            <LiveBroadcast
              navigation={props.navigation}
              initialParams={{
                title: "Live Broadcast from Prashanti Nilayam",
                description: "Watch the Live Broadcast from Prashanti Nilayam",
                youtubeSegment: "",
                modalScreen: "LiveBradcastModal",
                image: { IMAGENAME },
                youtube:
                  "https://www.youtube.com/channel/UC5j7MGcyU9wh15gbkvNO3aw/live",
              }}
            />
          )}
        />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name="LiveBradcastModal" component={LiveBradcastModal} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
function MyFestivalsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Group>
        <Stack.Screen name="Festivals" component={Festivals} />
        <Stack.Screen name="ViewAllFestivals" component={ViewAll} />
        <Stack.Screen name="LiveBroadcastFestivals" component={LiveBroadcast} />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          name="LiveBradcastFestivalsModal"
          component={LiveBradcastModal}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
function MyVideosStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Group>
        <Stack.Screen name="Videos" component={Videos} />
        <Stack.Screen name="ViewAllVideos" component={ViewAll} />
        <Stack.Screen name="LiveBroadcastVideos" component={LiveBroadcast} />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          name="LiveBradcastVideosModal"
          component={LiveBradcastModal}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

function MyKidsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Group>
        <Stack.Screen name="Kids" component={Kids} />
        <Stack.Screen name="ViewAllKids" component={ViewAll} />
        <Stack.Screen name="LiveBroadcastKids" component={LiveBroadcast} />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          name="LiveBradcastKidsModal"
          component={LiveBradcastModal}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

function MyBhajansStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Group>
        <Stack.Screen name="Bhajans" component={Bhajans} />
        <Stack.Screen name="ViewAllBhajans" component={ViewAll} />
        <Stack.Screen name="LiveBroadcastBhajans" component={LiveBroadcast} />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          name="LiveBradcastBhajansModal"
          component={LiveBradcastModal}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

function MyBottomTabs() {
  return (
    <TabBottom.Navigator
      initialRouteName="HomeBottom"
      // activeColor="#FFFFFF"
      // inactiveColor="#FFFFFF"
      screenOptions={{
        tabBarActiveTintColor: "#F0F0F0",
        activeTintColor: "#FFFFFF",
        tabBarLabelStyle: { fontSize: 9 },
        tabBarStyle: { backgroundColor: "#004071" },
      }}
      barStyle={{ backgroundColor: "#004071" }}
      // screenOptions={{
      //   tabBarStyle: { position: "absolute" },
      //   // tabBarBackground: () => (
      //   //   <BlurView
      //   //     tint="light"
      //   //     intensity={100}
      //   //     style={StyleSheet.absoluteFill}
      //   //   />
      //   // ),
      // }}
      // activeColor="#E2E5DE"
      // inactiveColor="#E2E5DE"
      // barStyle={{ backgroundColor: "#01131E" }}
    >
      <TabBottom.Group>
        <TabBottom.Screen
          name="HomeBottom"
          component={MyTabs}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ tintColor }) => (
              <AntDesign name="home" size={24} color="white" />
            ),
          }}
        />

        <TabBottom.Screen
          name="LiveBroadcastBottom"
          component={LiveBraodcastStack}
          // children={() => (
          //   <LiveBraodcastStack
          //     initialParams={{
          //       title: "Live Broadcast from Prashanti Nilayam",
          //       description: "Watch the Live Broadcast from Prashanti Nilayam",
          //       youtubeSegment: "",
          //       image: { IMAGENAME },
          //       youtube:
          //         "https://www.youtube.com/channel/UC5j7MGcyU9wh15gbkvNO3aw/live",
          //     }}
          //   />
          // )}
          options={{
            tabBarLabel: "Live Broadcast",
            tabBarIcon: ({ tintColor }) => (
              <MaterialIcons name="connected-tv" size={24} color="white" />
            ),
          }}
        />

        <TabBottom.Screen
          name="SaiInspires"
          component={Festivals}
          options={{
            tabBarLabel: "Sai Inspires",
            tabBarIcon: ({ tintColor }) => (
              <MaterialCommunityIcons
                name="meditation"
                size={24}
                color="white"
              />
            ),
          }}
        />
        <TabBottom.Screen
          name="kids"
          component={Kids}
          options={{
            tabBarLabel: "Search",
            tabBarIcon: ({ tintColor }) => (
              <Ionicons name="search-sharp" size={24} color="white" />
            ),
          }}
        />

        <TabBottom.Screen
          name="More"
          component={More}
          options={{
            tabBarLabel: "More",
            animationEnabled: true,
            tabBarIcon: ({ tintColor }) => (
              <Feather name="more-horizontal" size={24} color="white" />
            ),
          }}
        />
      </TabBottom.Group>
      {/* <TabBottom.Group>
        <TabBottom.Screen
          name="LiveBradcastModal"
          component={LiveBradcastModal}
        />
      </TabBottom.Group> */}
    </TabBottom.Navigator>
  );
}
function MyTabs() {
  // const route = useRoute();
  // const insets = useSafeAreaInsets();
  // console.log(props.navigation);
  return (
    <Tab.Navigator
      initialRouteName="HomeTop"
      screenOptions={{
        tabBarActiveTintColor: "#F0F0F0",
        activeTintColor: "#FFFFFF",
        tabBarLabelStyle: { fontSize: 9 },
        tabBarStyle: { backgroundColor: "#004071" },
      }}
    >
      <Tab.Screen
        name="HomeTop"
        component={MyHomeStack}
        options={{
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="FestivalsTop"
        component={MyFestivalsStack}
        options={{ tabBarLabel: "Festivals" }}
      />
      <Tab.Screen
        name="VideosTop"
        component={MyVideosStack}
        options={{ tabBarLabel: "Videos" }}
      />
      <Tab.Screen
        name="KidsTop"
        component={MyKidsStack}
        options={{ tabBarLabel: "Kids" }}
      />
      <Tab.Screen
        name="BhajansTop"
        component={MyBhajansStack}
        options={{
          tabBarLabel: "Bhajans",
        }}
      />
    </Tab.Navigator>
  );
}
export default function () {
  return (
    <React.Fragment>
      <NavigationContainer>
        <MyBottomTabs />
      </NavigationContainer>
    </React.Fragment>
  );
}
