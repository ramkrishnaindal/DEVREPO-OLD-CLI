import React, { Component, useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SectionComponent from "./SectionComponent";
let ScreenHeight = Dimensions.get("window").height;

const Kids = ({ navigation }) => {
  // const [Kids, setKids] = useState([]);
  const [kidsData, setKidsData] = useState([]);
  useEffect(() => {
    const getKids = async () => {
      const occData = [];
      const responseData = await fetch(
        `https://api.sssmediacentre.org/web/video/landing/categoryGroup?sortOrder=desc&sortBy=createdAt&index=0&limit=10&categoryIndex=0&categoryLimit=30&needLatest=false&needCategory=true&needSeries=true&needMixedPlaylist=true&categoryId=%5B%22e1260674-e0f1-4995-8d0b-9efc8e4dc6a8%22%5D`
      );
      if (responseData.status === 200) {
        const resCat = await responseData.json();
        const allItems = resCat.result?.items || [];
        for (const parentItem in allItems) {
          if (allItems[parentItem].hasOwnProperty("name")) {
            // console.log(
            //   "parentItem",
            //   allItems[parentItem].hasOwnProperty("name")
            // );

            occData.push({
              name: parentItem[0].toUpperCase() + parentItem.slice(1),
              items: allItems[parentItem].items,
            });
            // console.log("occData", occData);
          } else {
            // allItems[parentItem].forEach((childItem) => {
            //   occData.push({
            //     name: allItems[parentItem][childItem].name,
            //     items: allItems[parentItem][childItem].items,
            //   });
            // });
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
        setKidsData(occData);
      }
    };
    getKids();
  }, []);
  // console.log("kidsData", kidsData);
  // console.log("Kids", Kids);
  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["transparent", "rgba(0,0,0,1)"]}
        style={styles.background}
      />

      <ScrollView style={{ flex: 1, alignSelf: "center" }}>
        {kidsData.length > 0 &&
          kidsData.map((item, index) => {
            // if (index < 2) {
            //   console.log("item.items", item.items || []);
            // if (item.items.length < 2) return null;
            return (
              <SectionComponent
                liveBroadCastScreen="LiveBroadcastKids"
                viewAllScreen="ViewAllKids"
                navigation={navigation}
                key={item.name + index}
                name={item.name}
                items={item.items || []}
                modalScreen="LiveBradcastKidsModal"
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

export default Kids;
