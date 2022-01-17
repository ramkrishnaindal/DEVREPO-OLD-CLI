import React, { Component, useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SectionComponent from "./SectionComponent";
let ScreenHeight = Dimensions.get("window").height;

const Videos = ({ navigation }) => {
  // const [videos, setVideos] = useState([]);
  const [videoData, setVideoData] = useState([]);
  useEffect(() => {
    const getvideos = async () => {
      const occData = [];
      const responseData = await fetch(
        `https://api.sssmediacentre.org/web/video/landing/categoryGroup?needCategory=true&needLatest=true&needSeries=true&needMixedPlaylist=true&sortOrder=desc&sortBy=createdAt&index=0&limit=10&categoryIndex=0&categoryLimit=30`
      );
      if (responseData.status === 200) {
        const resCat = await responseData.json();
        const allItems = resCat.result?.items || [];
        for (const parentItem in allItems) {
          if (allItems[parentItem].hasOwnProperty("name")) {
            occData.push({
              name: parentItem[0].toUpperCase() + parentItem.slice(1),
              items: allItems[parentItem].items,
            });
          }
        }
        for (const parentItem in allItems) {
          if (allItems[parentItem].hasOwnProperty("name")) {
          } else {
            if (allItems[parentItem] && allItems[parentItem].length > 0) {
              allItems[parentItem].forEach((childItem) => {
                occData.push({
                  name: childItem.name,
                  items: childItem.items,
                });
              });
            }
          }
        }

        setVideoData(occData);
      }
    };
    getvideos();
  }, []);
  // console.log("videoData", videoData);
  // console.log("videos", videos);
  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["transparent", "rgba(0,0,0,1)"]}
        style={styles.background}
      />

      <ScrollView style={{ flex: 1, alignSelf: "center" }}>
        {videoData.length > 0 &&
          videoData.map((item, index) => {
            // if (index < 2) {
            //   console.log("item.items", item.items || []);
            if (item.items.length < 2) return null;
            return (
              <SectionComponent
                liveBroadCastScreen="LiveBroadcastVideos"
                viewAllScreen="ViewAllVideos"
                navigation={navigation}
                key={item.name + index}
                name={item.name}
                items={item.items || []}
              />
            );
            // }
          })}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#004071",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: ScreenHeight,
  },
});

export default Videos;
