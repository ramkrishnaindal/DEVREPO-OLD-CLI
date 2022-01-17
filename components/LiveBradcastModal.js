import React, { useEffect } from "react";
import {
  Dimensions,
  View,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { EXITFULLSCREEN } from "../SiteAssets";
// import Orientation from "react-native-orientation";
import * as ScreenOrientation from "expo-screen-orientation";
import { WebView } from "react-native-webview";
const LiveBradcastModal = (props) => {
  const { navigation } = props;
  const youtubeSegment = props.route.params.youtubeSegment;
  useEffect(() => {
    // Orientation.lockToLandscape();
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }, []);
  return (
    //   <View style={{ backgroundColor: "#004071", flex: 1 }}>
    <View
      style={{
        flex: 1,
        color: "white",
        position: "relative",
      }}
    >
      {/* <View style={{ flex: 1 }}>
            <FullscreenVideo
              src={{
                uri: `https://www.youtube.com/embed/${youtubeSegment}?autoplay=1&mute=0&controls=0&origin=https://www.sssmediacentre.org&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=3`,
              }}
            />
          </View> */}
      <WebView
        // style={{ backgroundColor: "pink", height: 300 }}
        originWhitelist={["*"]}
        javaScriptEnabled={true}
        source={{
          //   uri: `https://www.youtube.com/embed/i84LPi_v5i0?autoplay=1&mute=0&controls=0&origin=https://www.sssmediacentre.org&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=3`,
          uri: `https://www.youtube.com/watch?v=${youtubeSegment}&autoplay=1&mute=0&controls=0&origin=https://www.sssmediacentre.org&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=3`,
          //   "https://github.com/facebook/react-native"
        }}
        style={{ flex: 1, marginTop: -40 }}
      />
      <TouchableWithoutFeedback
        onPress={() => {
          ScreenOrientation.unlockAsync();
          navigation.goBack();
        }}
      >
        <Image
          source={EXITFULLSCREEN}
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
    </View>
  );
};

export default LiveBradcastModal;
