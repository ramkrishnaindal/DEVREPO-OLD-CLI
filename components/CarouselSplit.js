import React, { Component, useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
// import { style } from "./More";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const CarouselSplit = ({ navigation }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [languages, setLanguages] = useState([]);
  const [slides, setSlides] = useState([]);
  const carousel = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.sssmediacentre.org/web/video/values?language=true"
        );
        const json = await response.json();
        let language = json?.result?.language;
        language.sort();
        console;
        language = language.map((item) => {
          return {
            title: item,
          };
        });
        // console.log("language", language);
        // if (language) setLanguages(language);
        let size = 2; //Based on the size you want
        const sl = [...slides];
        while (language.length > 0) {
          sl.push(language.splice(0, size));
        }
        // console.log("sl", sl);
        setSlides(sl);
      } catch {}
    };
    fetchData();
  }, []);

  // render every single slide
  const _renderItem = ({ item, index }) => {
    return (
      <View
        key={index}
        style={{
          flexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "flex-start",
          // marginLeft: 15,
        }}
      >
        {item.map((it, i) => {
          return (
            <TouchableWithoutFeedback
              onPress={() => {
                // ScreenOrientation.unlockAsync();
                navigation.navigate("Language", {
                  language: it.title,
                });
              }}
            >
              <View
                key={i + "" + index + ""}
                style={
                  i === 0
                    ? {
                        backgroundColor: "floralwhite",
                        borderRadius: 5,
                        height: 100,
                        width: 100,
                        padding: 10,
                        // marginLeft: 50,
                      }
                    : {
                        backgroundColor: "floralwhite",
                        borderRadius: 5,
                        height: 100,
                        width: 100,
                        padding: 10,
                        marginLeft: 25,
                      }
                }
              >
                <Text
                  style={{
                    color: "black",
                    textAlign: "center",
                    textAlignVertical: "center",
                    paddingTop: 30,
                  }}
                >
                  {it.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    );
  };
  return (
    slides.length > 0 && (
      <View
        style={{
          paddingTop: 50,
          //   paddingHorizontal: 20,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          width: screenWidth - 150,
        }}
      >
        {/* {entriesSplitter()} */}
        {/* <SafeAreaView style={styles.container}> */}
        <TouchableHighlight
          style={{
            ...styles.contentLeft,
            marginLeft: -12,
            marginRight: 5,
            backgroundColor:
              activeSlide !== 0 ? "rgba(200,200,200,.3)" : "transparent",
          }}
          onPress={() => {
            carousel.current._snapToItem(activeSlide - 1);
          }}
        >
          <AntDesign
            name="left"
            size={20}
            color={activeSlide === 0 ? "transparent" : "white"}
          />
        </TouchableHighlight>
        <View style={styles.carouselContainer}>
          <Carousel
            ref={carousel}
            data={slides}
            renderItem={_renderItem}
            onSnapToItem={(index) => setActiveSlide(index)}
            sliderWidth={screenWidth - 150}
            sliderHeight={screenHeight}
            itemWidth={screenWidth}
            layoutCardOffset={58}
            inactiveSlideShift={0}
            useScrollView={false}
          />
        </View>
        <TouchableHighlight
          style={{
            ...styles.contentRight,
            // marginRight: 20,
            backgroundColor:
              activeSlide !== slides.length - 1
                ? "rgba(200,200,200,.3)"
                : "transparent",
          }}
          onPress={() => {
            carousel.current._snapToItem(activeSlide + 1);
          }}
        >
          <AntDesign
            name="right"
            size={20}
            color={activeSlide === slides.length - 1 ? "transparent" : "white"}
          />
        </TouchableHighlight>
        {/* <Pagination
          dotsLength={2} // also based on number of sildes you want
          activeDotIndex={activeSlide}
          containerStyle={{ borderColor: "white", borderWidth: 1 }}
          dotStyle={{
            width: 15,
            height: 5,
            borderRadius: 5,
            marginHorizontal: 8,
            backgroundColor: "black",
          }}
          inactiveDotStyle={{
            backgroundColor: "pink",
          }}
          inactiveDotOpacity={0.7}
          inactiveDotScale={0.6}
        /> */}
      </View>
    )
  );
};

export default CarouselSplit;
const styles = StyleSheet.create({
  contentRight: {
    zIndex: 3,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(200,200,200,.3)",
  },
  carouselContainer: {
    width: screenWidth - 150,
  },
  contentLeft: {
    zIndex: 3,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(200,200,200,.3)",
  },
});
