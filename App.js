import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
// import Festivals from "./components/Festivals";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// import 'react-native-gesture-handler';
import TopTabs from "./components/MyTabs";
// import Home from "./components/Home";
// import Festivals from "./components/Festivals";
function TopImage() {
  const insets = useSafeAreaInsets();
  let Image_Http_URL = {
    uri: "https://www.sssmediacentre.org/755f75139b00a808ae072efc6cdd7ae8.png",
  };

  return (
    <View
      style={{
        ...styles.imageContainer,
        marginTop: insets.top,
        backgroundColor: "#004071",
      }}
    >
      <Image
        source={Image_Http_URL}
        style={{
          height: 50,
          width: 50,
          resizeMode: "stretch",
          marginRight: 10,
          marginTop: 20,
        }}
      />
      <Text style={{ color: "#B1975E", marginTop: 20 }}>SRI SATHYA SAI</Text>
      <View style={styles.overlay}>
        <Image style={styles.people} />
        <Image style={styles.destination} />
      </View>
    </View>
  );
}
export default function App() {
  return (
    <SafeAreaProvider>
      <TopImage />
      <TopTabs />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
});
