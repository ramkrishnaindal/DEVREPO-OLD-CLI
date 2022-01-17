import React, { Component, useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SectionComponent from "./SectionComponent";
let ScreenHeight = Dimensions.get("window").height;

const LanguageComponent = (props) => {
  //   const [occasions, setOccasions] = useState([]);
  const [occasionData, setOccasionData] = useState([]);
  const { navigation } = props;
  useEffect(() => {
    const getOccasions = async () => {
      //   const occData = [];
      try {
        const responseData = await fetch(
          `https://api.sssmediacentre.org/web/video/landing/categoryGroup?sortOrder=desc&sortBy=createdAt&index=0&limit=10&categoryIndex=0&categoryLimit=30&needLatest=false&needCategory=true&needSeries=true&needMixedPlaylist=true&language=${props.route?.params?.language}`
        );

        if (responseData.status === 200) {
          const resultCat = [];
          const resCat = await responseData.json();
          const categories = resCat.result?.items?.category || [];
          categories.forEach((element) => {
            if (resultCat.some((it) => it.name === element.name)) {
              const catItem = categories.find((it) => it.name === element.name);
              resultCat.items = [...resultCat.items, element.items];
            } else {
              resultCat.push(element);
            }
          });
          console.log("resultCat", resultCat);
          setOccasionData(resultCat);
        }
      } catch (err) {
        console.log(err);
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

export default LanguageComponent;
