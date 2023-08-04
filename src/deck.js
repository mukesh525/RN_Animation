import React, { Component } from "react";
import { View, PanResponder, Animated, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_THRESHOLD = 0.3 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Deck extends Component {
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {},
  };

  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, guesture) => {
        // console.log(guesture);
        position.setValue({ x: guesture.dx, y: guesture.dy });
      },
      onPanResponderRelease: (event, guesture) => {
        if (guesture.dx > SCREEN_THRESHOLD) {
          console.log("Swipe right");
          this.forceSwipe("right");
        } else if (guesture.dx < -SCREEN_THRESHOLD) {
          console.log("Swipe left");
          this.forceSwipe("left");
        } else {
          this.resetPosition();
        }
      },
    });
    //this.panResponder = panResponder;
    this.state = { panResponder, position, index: 0 };
  }

  forceSwipe = (direction) => {
    const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.state.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
    }).start(() => this.onSwipeComplete(direction));
  };

  onSwipeComplete = (direction) => {
    const { onSwipeRight, onSwipeLeft, data } = this.props;
    const item = data[this.state.index];
    direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);
    this.state.position.setValue({ x: 0, y: 0 });
    this.setState({ index: this.state.index + 1 });
  };

  resetPosition = () => {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 },
    }).start();
  };
  getCardStyle = () => {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ["-120deg", "0deg", "120deg"],
    });
    return {
      ...position.getLayout(),
      transform: [{ rotate }],
    };
  };

  renderCards = () => {
    return this.props.data.map((item, index) => {
      if (index < this.state.index) {
        return null;
      }
      if (index === this.state.index) {
        return (
          <Animated.View
            useNativeDriver={false}
            style={this.getCardStyle()}
            {...this.state.panResponder.panHandlers}
          >
            {this.props.renderCard(item, index)}
          </Animated.View>
        );
      }
      return this.props.renderCard(item, index);
    });
  };
  render() {
    return <View>{this.renderCards()}</View>;
  }
}

const styles = {};

export default Deck;
