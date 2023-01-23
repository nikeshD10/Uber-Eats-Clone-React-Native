import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const RestaurantImage = (props) => (
  <Image
    source={{ uri: props.image }}
    style={{ width: "100%", height: 180, resizeMode: "cover" }}
  />
);

const RestaurantName = (props) => {
  return (
    <Text
      style={{
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 10,
        marginHorizontal: 15,
      }}
    >
      {props.name}
    </Text>
  );
};

const RestaurantDescription = (props) => {
  return (
    <Text style={{ marginTop: 10, marginHorizontal: 15 }}>
      {props.description}
    </Text>
  );
};

export default function About(props) {
  const { name, image, price, reviews, rating, categories } =
    props.route.params;

  const formattedCategories = categories.map((cat) => cat.title).join(" • ");

  const description = `${formattedCategories} ${
    price ? " • " + price : ""
  } • ${rating} ⭐ (${reviews}+)"}`;
  return (
    <View>
      <RestaurantImage image={image} />
      <RestaurantName name={name} />
      <RestaurantDescription description={description} />
    </View>
  );
}

const styles = StyleSheet.create({});
