import React, { Component, useState, useEffect , useCallback} from "react";

import {
  Alert,
  Button,
  Modal,
  TouchableWithoutFeedback,
  Text,
  View,
  Image,
  Linking,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};


const More = (props) => {
  const [visible, setIsVisible] = useState(true);
  useEffect(() => {
    return () => {
      setIsVisible(true);
    };
  }, []);

  return (
    <Modal visible={visible} transparent>
      <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
        <View style={style.modal}>
          <TouchableWithoutFeedback>
            <View style={style.modalInner}>
              <View>
              <Image source={require('./../SiteAssets/Timetable.png')} style = {style.imageClass} />
              <Text style={style.hyperlinkStyle} onPress={() => {Linking.openURL('https://www.srisathyasai.org/pages/sai-prasanthi-nilayam.html/');}}>
              Timetable
              </Text>
              </View>
              <View>
              <Image source={require('./../SiteAssets/instagram.png')} style = {style.imageClass} />
              <Text style={style.hyperlinkStyle} onPress={() => {Linking.openURL('https://www.instagram.com/');}}>
              Instagram
              </Text>
              </View>

              <View>
              <Image source={require('./../SiteAssets/facebook.png')} style = {style.imageClass} />
              <Text style={style.hyperlinkStyle} onPress={() => {Linking.openURL('https://www.facebook.com/');}}>
              Facebook
              </Text>
              </View>

              <View>
              <Image source={require('./../SiteAssets/whatsapp.png')} style = {style.imageClass} />
              <Text style={style.hyperlinkStyle} onPress={() => {Linking.openURL('https://www.whatsapp.com/');}}>
              Whatsapp
              </Text>
              </View>

              <View>
              <Image source={require('./../SiteAssets/youtube.png')} style = {style.imageClass} />
              <Text style={style.hyperlinkStyle} onPress={() => {Linking.openURL('https://www.youtube.com/');}}>
              youtube
              </Text>
              </View>
              <View>
              <Image source={require('./../SiteAssets/twitter.png')} style = {style.imageClass} />
              <Text style={style.hyperlinkStyle} onPress={() => {Linking.openURL('https://www.twitter.com/');}}>
              Twitter
              </Text>
              </View>

            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
export const style = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  imageClass:{
    height: 50,
    width:50,
    paddingTop:20,
    paddingBottom:25,
  },
  hyperlinkStyle: {
    color: "#0E1E27",
  },
  modalInner: {
    height: 200,
    padding: 35,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection:"row",
    flexWrap:"wrap",
  },
});

export default More;
