import React, { Component, useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SectionComponent from "./SectionComponent";
let ScreenHeight = Dimensions.get("window").height;

const Festivals = ({ navigation }) => {
  const [occasions, setOccasions] = useState([]);
  const [occasionData, setOccasionData] = useState([]);
  useEffect(() => {
    const getOccasions = async () => {
      const response = await fetch(
        "https://api.sssmediacentre.org/web/video/values?occasion=true"
      );
      if (response.status === 200) {
        const res = await response.json();
        const occasion = res.result?.occasion || [];
        // console.log("response.result", res.result);
        setOccasions(occasion);
        const occData = [];
        occasion.forEach(async (occ, index) => {
          const responseData = await fetch(
            `https://api.sssmediacentre.org/web/video/landing/categoryGroup?sortOrder=desc&sortBy=createdAt&needLatest=true&occasion=${occ}`
          );

          if (responseData.status === 200) {
            const resCat = await responseData.json();
            const categories = resCat.result?.items?.category || [];
            categories.forEach((item) => {
              const catItemIndex = [...occData].findIndex(
                (item) => item.name === occ
              );
              if (catItemIndex >= 0) {
                const items = [...occData[catItemIndex].items];
                items.push(item.items);
                occData[catItemIndex].items = items;
              } else {
                const occObj = { name: occ, items: item.items };
                occData.push(occObj);
              }
            });
          }
          if (index === occasion.length - 1) {
            setOccasionData(occData);
          }
        });
      }
    };

    getOccasions();
  }, []);
  // console.log("occasionData", occasionData);
  // console.log("occasions", occasions);
  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["transparent", "rgba(0,0,0,1)"]}
        style={styles.background}
      />

      <ScrollView style={{ flex: 1, alignSelf: "center" }}>
        {occasionData.length > 0 &&
          occasionData.map((item, index) => {
            // if (index < 2) {
            //   console.log("item.items", item.items || []);
            if (item.items.length < 2) return null;
            return (
              <SectionComponent
                liveBroadCastScreen="LiveBroadcastFestivals"
                viewAllScreen="ViewAllFestivals"
                navigation={navigation}
                key={item.name + index}
                name={item.name}
                items={item.items || []}
                modalScreen="LiveBradcastFestivalsModal"
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

export default Festivals;
