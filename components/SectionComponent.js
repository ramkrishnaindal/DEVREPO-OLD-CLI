import React, { Component } from "react";
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import Card from "./UI/Card";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function SectionComponent(props) {
  const { navigation, modalScreen } = props;
  const isItemsLess = () => {
    let count = 0;
    let isItemLessCount = true;
    if (props.items.length < 2) {
      isItemLessCount = true;
    } else {
      props.items.forEach((element) => {
        if (element.title) count++;
        if (count > 2) {
          isItemLessCount = false;
          return;
        }
      });
    }
    return isItemLessCount;
  };
  // if (isItemsLess()) return null;
  return (
    <View
      style={{ flex: 1, alignContent: "space-between", paddingHorizontal: 15 }}
    >
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: 10,
        }}
      >
        <Text
          style={{
            color: "white",
            alignSelf: "flex-start",
            // paddingHorizontal: 10,
            paddingVertical: 20,
            maxWidth: 150,
          }}
        >
          {props.name}
        </Text>
        <TouchableHighlight
          style={{
            ...styles.content,
            height: 30,
            width: 80,
            marginRight: 10,
            opacity: isItemsLess() ? 0 : 1,
            backgroundColor: "rgba(200,200,200,.3)",
            borderRadius: 10,
            justifyContent: "center",
          }}
          onPress={() => {
            if (props.viewAllScreen)
              navigation.navigate(props.viewAllScreen, { owner: "Michaś" });
          }}
        >
          <Text
            style={{
              color: "white",
              alignSelf: "center",
              textAlign: "center",
              paddingHorizontal: 10,
              // opacity: isItemsLess() ? 0 : 1,
              //   paddingVertical: 20,
            }}
          >
            View All
          </Text>
        </TouchableHighlight>
      </View>
      <View style={styles.container}>
        {props.items.map((item, index) => {
          if (index <= 1)
            if (item.title) {
              return (
                <TouchableWithoutFeedback
                  key={
                    props.name +
                    item.title +
                    item.index +
                    Math.floor(Math.random() * 1000)
                  }
                  onPress={() => {
                    console.log(
                      "liveBroadCastScreen",
                      props.liveBroadCastScreen
                    );
                    if (item.thumbUrl) {
                      const url = item.thumbUrl;
                      const urlSplit = url.split("/");
                      if (urlSplit[2].includes("youtube")) {
                        navigation.navigate(props.liveBroadCastScreen, {
                          youtubeSegment: urlSplit[4],
                          title: item.title,
                          modalScreen,
                          description: item.description,
                        });
                      } else {
                        navigation.navigate(props.liveBroadCastScreen, {
                          youtubeSegment: null,
                          title: item.title,
                          description: item.description,
                          modalScreen,
                          imageUrl: item.thumbUrl,
                        });
                      }
                    }
                  }}
                >
                  <View
                    style={
                      index === 0
                        ? styles.vidItem
                        : { ...styles.vidItem, marginLeft: 15 }
                    }
                  >
                    <Card style={styles.liveBroadcastCardContainer}>
                      <Image
                        source={{ uri: item.thumbUrl }}
                        style={{
                          height: 300,
                          flex: 1,
                          width: null,
                        }}
                      />
                      <View style={styles.liveBroadcastText}>
                        <Text>{item.title}</Text>
                      </View>
                    </Card>
                  </View>
                </TouchableWithoutFeedback>
              );
            }
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  vidItem: {
    width: windowWidth / 3 + 10,
    // backgroundColor: "pink",
    // color: "white",
    height: 150,
  },
  content: {
    paddingVertical: 2,
  },
  liveBroadcastText: {
    backgroundColor: "white",
    alignSelf: "stretch",
    height: 60,
    padding: 10,
    bottom: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
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
});
