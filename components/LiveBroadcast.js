import * as React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { FULLSCREEN } from "../SiteAssets";
import { WebView } from "react-native-webview";
import { Video, AVPlaybackStatus } from "expo-av";
import Card from "./UI/Card";
import * as ScreenOrientation from "expo-screen-orientation";
// import FullscreenVideo from "react-native-fullscreen-video";
let ScreenHeight = Dimensions.get("window").height;
export default function App(props) {
  // console.log(props);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const { navigation } = props;
  React.useEffect(() => {
    // Orientation.lockToLandscape();
    ScreenOrientation.unlockAsync();
  }, []);
  const params = props.initialParams || props.route.params;
  console.log(props);
  // return null;
  // console.log("props.route?.params", props.route?.params);
  const {
    youtubeSegment,
    youtube,
    title,
    description,
    imageUrl,
    image,
    modalScreen,
  } = params;
  const content = (
    <View
      style={{
        flex: 1,
        backgroundColor: "#004071",
        // borderWidth: 1,
        // borderColor: "white",
      }}
    >
      <View>
        <Text
          textAlign={"center"}
          style={{
            fontWeight: "bold",
            marginBottom: 15,
            marginTop: 15,
            fontSize: 18,
            color: "white",
            paddingHorizontal: 15,
          }}
        >
          {title}
        </Text>
      </View>
      <ScrollView style={{ flex: 1, alignSelf: "center" }}>
        <View
          textAlign={"center"}
          style={{
            // ...styles.liveBroadcastText,
            // paddingHorizontal: 10,

            color: "white",
            justifyContent: "flex-start",
          }}
        >
          <Text style={{ color: "white" }}>{description}</Text>
        </View>
      </ScrollView>
    </View>
  );
  return (
    // <View style={styles.container}>
    youtubeSegment || youtube ? (
      <View style={{ backgroundColor: "#004071", flex: 1 }}>
        <View
          style={{ flex: 1, padding: 15, color: "white", position: "relative" }}
        >
          {/* <View style={{ flex: 1 }}>
            <FullscreenVideo
              src={{
                uri: `https://www.youtube.com/embed/${youtubeSegment}?autoplay=1&mute=0&controls=0&origin=https://www.sssmediacentre.org&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=3`,
              }}
            />
          </View> */}
          <WebView
            style={{ backgroundColor: "pink", height: 300 }}
            originWhitelist={["*"]}
            javaScriptEnabled={true}
            source={{
              uri: youtube
                ? youtube
                : `https://www.youtube.com/embed/${youtubeSegment}?autoplay=1&mute=0&controls=0&origin=https://www.sssmediacentre.org&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=3`,
              // `https://www.youtube.com/watch?v=${youtubeSegment}&autoplay=1&mute=0&controls=0&origin=https://www.sssmediacentre.org&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=3`,
              // "https://github.com/facebook/react-native",
            }}
          />
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate(modalScreen || "LiveBradcastModal", {
                youtubeSegment: youtubeSegment || "",
              });
            }}
          >
            <Image
              source={FULLSCREEN}
              style={{
                height: 30,
                width: 30,
                position: "absolute",
                backgroundColor: "transparent",
                right: 20,
                top: 20,
              }}
            />
          </TouchableWithoutFeedback>
          {content}
        </View>
      </View>
    ) : (
      <View style={{ backgroundColor: "#004071", flex: 1 }}>
        <View style={{ flex: 1, padding: 15, color: "white" }}>
          <Card style={styles.liveBroadcastCardContainer}>
            <Image
              source={imageUrl ? { uri: imageUrl } : image}
              style={{
                height: 300,
                flex: 1,
                width: null,
              }}
            />
          </Card>
          {content}
        </View>
      </View>
    )
  );
  {
    /* <Video
        ref={video}
        style={styles.video}
        source={{
          uri: "https://www.youtube.com/embed/ZZ5LpwO-An4?rel=0&autoplay=0&showinfo=0&controls=0",
          // https://youtu.be/KtEXvLq-Mxw",
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      /> */
  }
  {
    /* <View>
        <Button
          title={status.isPlaying ? "Pause" : "Play"}
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        />
      </View> */
  }
  // </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#004071",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: 50,
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: ScreenHeight,
  },
  video: {
    alignSelf: "center",
    width: 320,
    height: 200,
  },
  content: {
    position: "absolute",
    left: "48%",
    top: "20%",
    zIndex: 3,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,.3)",
  },
  textLive: {
    fontSize: 17,
    color: "#FFFFFF",
    paddingLeft: 10,
    paddingTop: 30,
  },
  textDate: {
    fontSize: 15,
    color: "#FFFFFF",
    paddingLeft: 10,
    paddingBottom: 20,
  },
  textDescription: {
    fontSize: 15,
    color: "#BFBCBC",
    paddingBottom: 10,
    paddingLeft: 10,
    paddingTop: 20,
  },
});
