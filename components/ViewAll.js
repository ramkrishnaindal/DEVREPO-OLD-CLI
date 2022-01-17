import React, { Component, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Card from "./UI/Card";

import { IMAGENAME } from "./../SiteAssets/index";
import { AntDesign } from "@expo/vector-icons";
let ScreenHeight = Dimensions.get("window").height;
const ViewAll = (props) => {
  const items = [
    {
      name: "Aya Bouchiha",
      description: "Full Stack Web Developer",
    },
    {
      name: "John Doe",
      description: "Author",
    },
    {
      name: "Pitsu Coma",
      description: "Math Student",
    },
  ];
  // console.log(props);
  const Item = ({ name, description }) => {
    return (
      <Paper>
        <Text>{name}</Text>
        <Text>{description}</Text>
        <Button>more info...</Button>
      </Paper>
    );
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = Dimensions.get("window");
  const contentOffset = (width - width / 2) / 2;
  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["transparent", "rgba(0,0,0,1)"]}
        style={styles.background}
      />

      <ScrollView style={{ flex: 1, alignSelf: "center" }}>
        <View>
          <Text
            style={{
              color: "white",
              alignSelf: "flex-start",
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}
          >
            Live Broadcast Owner : {props.route?.params?.owner}
          </Text>
          <View style={styles.liveBroadcastContainer}>
            <Card style={styles.liveBroadcastCardContainer}>
              <Image
                source={IMAGENAME}
                style={{
                  height: 300,
                  flex: 1,
                  width: null,
                }}
              />
              <View style={styles.content}>
                <AntDesign name="caretright" size={20} color="white" />
              </View>

              <View style={styles.liveBroadcastText}>
                <Text>Watch live broadcast from Prashanti Nilayam</Text>
              </View>
            </Card>
          </View>
        </View>
        <View>{/* <Text>Owner : {params.owner}</Text> */}</View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#004071",
    alignItems: "flex-start",
    // paddingHorizontal: 20,
    justifyContent: "flex-start",
  },
  containerScroll: {
    alignSelf: "stretch",
    flex: 1,
  },
  content: {
    position: "absolute",
    left: "42%",
    top: "34%",
    zIndex: 3,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,.3)",
  },
  liveBroadcastContainer: {
    // padding: 10,
    // alignSelf: "stretch",
    paddingHorizontal: 20,
    alignSelf: "stretch",
    flex: 1,
    maxHeight: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
    zIndex: 2,
  },
  liveBroadcastImageContainer: {
    // alignSelf: "stretch",
    overflow: "hidden",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    zIndex: 1,
    // flex: 1,
  },
  liveBroadcastText: {
    backgroundColor: "white",
    alignSelf: "stretch",
    height: 40,
    padding: 10,
    bottom: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: ScreenHeight,
  },
});
export default ViewAll;
