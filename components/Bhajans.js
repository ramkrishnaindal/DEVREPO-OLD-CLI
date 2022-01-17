import React, { Component, useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SectionComponent from "./SectionComponent";
let ScreenHeight = Dimensions.get("window").height;

const Bhajans = ({ navigation }) => {
  // const [videos, setVideos] = useState([]);
  const [bhajanData, setBhajanData] = useState([]);
  useEffect(() => {
    const getBhajans = async () => {
      const bhajData = [];
      const responseData = await fetch(
        `https://api.sssmediacentre.org/web/video/landing/categoryGroup?sortOrder=desc&sortBy=createdAt&index=0&limit=10&categoryIndex=0&categoryLimit=30&needLatest=true&needMixedPlaylist=false&categoryId=%5B%225c7f52a8-0b9a-411c-ad4b-0f960cbf948b%22%5D&sub_categoryId=%5B%225e85ebd3-d083-4b60-a928-8b4cb5b015a9%22%5D`
      );
      if (responseData.status === 200) {
        const resCat = await responseData.json();
        const allItems = resCat.result?.items || [];
        for (const parentItem in allItems) {
          if (allItems[parentItem].hasOwnProperty("name")) {
            bhajData.push({
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
                bhajData.push({
                  name: childItem.name,
                  items: childItem.items,
                });
              });
            }
          }
        }

        setBhajanData(bhajData);
      }
    };
    getBhajans();
  }, []);
  // console.log("bhajanData", bhajanData);
  // console.log("videos", videos);
  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["transparent", "rgba(0,0,0,1)"]}
        style={styles.background}
      />

      <ScrollView style={{ flex: 1, alignSelf: "center" }}>
        {bhajanData.length > 0 &&
          bhajanData.map((item, index) => {
            // if (index < 2) {
            //   console.log("item.items", item.items || []);
            if (item.items.length < 2) return null;
            return (
              <SectionComponent
                liveBroadCastScreen="LiveBroadcastBhajans"
                viewAllScreen="ViewAllBhajans"
                navigation={navigation}
                key={item.name + index}
                name={item.name}
                items={item.items || []}
                modalScreen="LiveBradcastBhajansModal"
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

export default Bhajans;
