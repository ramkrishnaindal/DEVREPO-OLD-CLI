import React, { Component, useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  // FlatList,
  TouchableWithoutFeedback,
  // SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Card from "./UI/Card";
import CarouselSplit from "./CarouselSplit";
import { IMAGENAME } from "./../SiteAssets/index";
import { AntDesign } from "@expo/vector-icons";
import SectionComponent from "./SectionComponent";
let ScreenHeight = Dimensions.get("window").height;
const Home = ({ navigation }) => {
  const [latestVideos, setLatestVideos] = useState([]);
  const [categoriesVideos, setCategoriesVideos] = useState([]);
  useEffect(() => {
    const fetchMasterData = async () => {
      try {
        const resMain = await fetch(
          "https://api.sssmediacentre.org/web/video/landing/categoryGroup?sortOrder=desc&sortBy=createdAt&needLatest=true"
        );
        if (resMain.status === 200) {
          let data = await resMain.json();
          let latestArr = data?.result?.items?.latest?.items;
          if (latestArr && latestArr.length > 0) {
            latestArr = latestArr.slice(0, 2);
            setLatestVideos(latestArr);
          }
        }
      } catch (err) {}
    };
    const fetchCatgoriesData = async () => {
      try {
        const resCategory = await fetch(
          "https://api.sssmediacentre.org/web/video/values?category=true"
        );
        let videoCategories = [];
        if (resCategory.status === 200) {
          let data = await resCategory.json();
          const categories = [];
          await data.result.category.forEach(async (item) => {
            if (item.subCategory.length == 0) {
              categories.push({
                categoryId: item.catogoryId,
                name: item.name,
                sub_categoryId: null,
              });
            } else {
              item.subCategory.forEach((subItem) => {
                categories.push({
                  categoryId: item.catogoryId,
                  sub_categoryId: subItem.catogoryId,
                  name: item.name + " " + subItem.name,
                });
                console.log("obj", {
                  categoryId: item.catogoryId,
                  sub_categoryId: subItem.catogoryId,
                  name: item.name + " : " + subItem.name,
                });
              });
            }
          });
          // console.log("categories", categories);
          await categories.forEach(async (item, index) => {
            const resMain = await fetch(
              item.sub_categoryId
                ? `https://api.sssmediacentre.org/web/video/landing/categoryGroup?sortOrder=desc&sortBy=createdAt&index=0&limit=10&categoryIndex=0&categoryLimit=30&needLatest=false&needCategory=true&needSeries=true&needMixedPlaylist=true&categoryId=${item.categoryId}&sub_categoryId=${item.sub_categoryId}`
                : `https://api.sssmediacentre.org/web/video/landing/categoryGroup?sortOrder=desc&sortBy=createdAt&index=0&limit=10&categoryIndex=0&categoryLimit=30&needLatest=false&needCategory=true&needSeries=true&needMixedPlaylist=true&categoryId=${item.categoryId}`
            );
            if (resMain.status === 200) {
              let data = await resMain.json();
              // console.log("data", data);
              let categoriesArr = data?.result?.items?.category;
              categoriesArr.forEach((it) => {
                it.name = item.name;
              });
              // categoriesArr.forEach((i) => console.log(i.name));
              if (categoriesArr && categoriesArr.length > 0) {
                const catNames = videoCategories.map(
                  (iAddItem) => iAddItem.name
                );
                // console.log(catNames);
                // const arr = categoriesArr.filter((aItem) => {
                //   return !catNames.includes(aItem.name);
                // });
                // console.log("categoriesArr", arr);
                videoCategories = [...videoCategories, ...categoriesArr];
                if (index === categories.length - 1)
                  setCategoriesVideos(videoCategories);
              }
            }
          });
          console.log(videoCategories);
        }
      } catch (err) {}
    };
    fetchMasterData();
    fetchCatgoriesData();
  }, []);
  // const { width } = Dimensions.get("window");
  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["transparent", "rgba(0,0,0,1)"]}
        style={styles.background}
      />

      <ScrollView style={{ flex: 1, alignSelf: "center" }}>
        <TouchableWithoutFeedback
          onPress={() => {
            // ScreenOrientation.unlockAsync();
            navigation.navigate("LiveBroadcastHome", {
              title: "Live Broadcast from Prashanti Nilayam",
              description: "Watch the Live Broadcast from Prashanti Nilayam",
              youtubeSegment: "",
              modalScreen: "LiveBradcastModal",
              image: { IMAGENAME },
              youtube:
                "https://www.youtube.com/channel/UC5j7MGcyU9wh15gbkvNO3aw/live",
            });
          }}
        >
          <View>
            <Text
              style={{
                color: "white",
                alignSelf: "flex-start",
                paddingHorizontal: 20,
                paddingVertical: 20,
              }}
            >
              Live Broadcast
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
        </TouchableWithoutFeedback>
        {/* <CarouselCards /> */}
        <View>
          <Text
            style={{
              color: "white",
              alignSelf: "flex-start",
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}
          >
            Language
          </Text>
          <View style={styles.liveBroadcastContainer}>
            <Card style={styles.liveBroadcastCardContainer}>
              <CarouselSplit navigation={navigation} />
            </Card>
          </View>
        </View>

        {latestVideos.length > 0 && (
          <SectionComponent
            liveBroadCastScreen="LiveBroadcastHome"
            viewAllScreen="ViewAllHome"
            navigation={navigation}
            name="Latest videos"
            items={latestVideos}
            modalScreen="LiveBradcastHomeModal"
          />
        )}

        {categoriesVideos.length > 0 &&
          categoriesVideos.map((item, index) => {
            return (
              <SectionComponent
                liveBroadCastScreen="LiveBroadcastHome"
                viewAllScreen="ViewAllHome"
                navigation={navigation}
                key={
                  "ViewAllHome" +
                  item.name +
                  index +
                  Math.floor(Math.random() * 10000)
                }
                name={item.name}
                items={item.items}
                modalScreen="LiveBradcastHomeModal"
              />
            );
          })}
      </ScrollView>
    </View>
    // </SafeAreaView>
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
export default Home;
