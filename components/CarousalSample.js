import * as React from "react";
import { Text, View, SafeAreaView } from "react-native";

import Carousel from "react-native-snap-carousel";
const slides = [];

export default class CarousalSample extends React.Component {
  entriesSplitter = () => {
    let size = 4; //Based on the size you want
    while (this.state.carouselItems.length > 0) {
      slides.push(this.state.carouselItems.splice(0, size));
    }
  };
  constructor(props) {
    super(props);
    entriesSplitter();
    this.state = {
      activeIndex: 0,
      carouselItems: [
        {
          title: "Item 1",
          text: "Text 1",
        },
        {
          title: "Item 2",
          text: "Text 2",
        },
        {
          title: "Item 3",
          text: "Text 3",
        },
        {
          title: "Item 4",
          text: "Text 4",
        },
        {
          title: "Item 5",
          text: "Text 5",
        },
        {
          title: "Item 6",
          text: "Text 6",
        },
        {
          title: "Item 7",
          text: "Text 7",
        },
        {
          title: "Item 8",
          text: "Text 8",
        },
        {
          title: "Item 9",
          text: "Text 9",
        },
        {
          title: "Item 10",
          text: "Text 10",
        },
      ],
    };
  }

  _renderItem({ item, index }) {
    return (
      <>
        <View
          style={{
            backgroundColor: "floralwhite",
            borderRadius: 5,
            height: 250,
            padding: 50,
            marginLeft: 25,
            marginRight: 25,
          }}
        >
          <Text style={{ fontSize: 30 }}>{item[0].title}</Text>
          <Text>{item[0].text}</Text>
        </View>
        <View
          style={{
            backgroundColor: "floralwhite",
            borderRadius: 5,
            height: 250,
            padding: 50,
            marginLeft: 25,
            marginRight: 25,
          }}
        >
          <Text style={{ fontSize: 30 }}>{item[1].title}</Text>
          <Text>{item[1].text}</Text>
        </View>
        <View
          style={{
            backgroundColor: "floralwhite",
            borderRadius: 5,
            height: 250,
            padding: 50,
            marginLeft: 25,
            marginRight: 25,
          }}
        >
          <Text style={{ fontSize: 30 }}>{item[2].title}</Text>
          <Text>{item[2].text}</Text>
        </View>
        <View
          style={{
            backgroundColor: "floralwhite",
            borderRadius: 5,
            height: 250,
            padding: 50,
            marginLeft: 25,
            marginRight: 25,
          }}
        >
          <Text style={{ fontSize: 30 }}>{item[3].title}</Text>
          <Text>{item[3].text}</Text>
        </View>
      </>
    );
  }

  render() {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "rebeccapurple", paddingTop: 50 }}
      >
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
        >
          <Carousel
            layout={"default"}
            ref={(ref) => (this.carousel = ref)}
            data={slides}
            sliderWidth={300}
            itemWidth={300}
            renderItem={this._renderItem}
            onSnapToItem={(index) => this.setState({ activeIndex: index })}
          />
        </View>
      </SafeAreaView>
    );
  }
}
