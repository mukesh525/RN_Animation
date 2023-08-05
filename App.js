import { Card, Button } from "react-native-elements";
import { StyleSheet, Text, View, Image } from "react-native";
import Deck from "./src/deck";

const DATA = [
  {
    id: 1,
    text: "Card #1",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg",
  },
  {
    id: 2,
    text: "Card #2",
    uri: "http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg",
  },
  {
    id: 3,
    text: "Card #3",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg",
  },
  {
    id: 4,
    text: "Card #4",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg",
  },
  {
    id: 5,
    text: "Card #5",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg",
  },
  {
    id: 6,
    text: "Card #6",
    uri: "http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg",
  },
  {
    id: 7,
    text: "Card #7",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg",
  },
  {
    id: 8,
    text: "Card #8",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg",
  },
];
export default function App() {
  const renderCard = ({ text, id }) => {
    return (
      <View key={id} style={styles.card}>
        <Image
          style={styles.logo}
          source={{
            uri: "https://source.unsplash.com/featured/300x202",
          }}
        />
        <Text style={{ marginBottom: 10 }}>{text}</Text>
        <Button
          icon={{ name: "code" }}
          title={"View Now!"}
          backgroundColor={"#03A9F4"}
        />
      </View>
    );
  };

  const renderNoMoreCards = () => {
    return (
      <View style={[styles.card, { marginTop: 30 }]}>
        <Text>All done</Text>
        <Button title={"Get More"} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Deck
        data={DATA}
        renderCard={renderCard}
        onSwipeRight={(item) => console.log("item onSwipeRight")}
        onSwipeLeft={(item) => console.log("item onSwipeLeft")}
        renderNoMoreCards={renderNoMoreCards}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  logo: {
    //width: 100,
    height: 100,
  },
});
