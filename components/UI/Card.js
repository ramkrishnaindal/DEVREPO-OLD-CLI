import { View, StyleSheet } from "react-native";
import React, { Component } from "react";
const Card = (props) => {
  return (
    <View style={{ ...styles.container, ...props.style }}>
      {props.children}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
  },
});
export default Card;
