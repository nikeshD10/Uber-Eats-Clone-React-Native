import { StyleSheet, Text, View } from "react-native";
import React from "react";
import About from "../components/restaurantDetail/About";
import { Divider } from "react-native-elements";
import MenuItem from "../components/restaurantDetail/MenuItem";
import ViewCart from "../components/restaurantDetail/ViewCart";

const foods = [
  {
    title: "Tandoori Chicken",
    description:
      "Chicken marinated in yoghurt and spices, then roasted in a clay oven",
    price: "$12.99",
    image:
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2014/09/tandoori-chicken-500x500.jpg",
  },
  {
    title: "Chilaquiles",
    description:
      "Tortilla chips covered in a spicy red sauce, then topped with cheese and onions",
    price: "$14.90",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/3d/Portada-chilaquiles-rojos.jpg",
  },

  {
    title: "Lasagna",
    description: "Layers of pasta, meat, and cheese, baked in a tomato sauce",
    price: "$13.99",
    image:
      "https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg",
  },
  {
    title: "Lasagna Pro",
    description: "Layers of pasta, meat, and cheese, baked in a tomato sauce",
    price: "$13.99",
    image:
      "https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg",
  },
  {
    title: "Lasagna Pro Max",
    description: "Layers of pasta, meat, and cheese, baked in a tomato sauce",
    price: "$13.99",
    image:
      "https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg",
  },
];

export default function RestaurantDetail({ navigation, route }) {
  return (
    <View style={{ flex: 1 }}>
      <About route={route} />
      <Divider width={1.8} style={{ marginVertical: 20 }} />
      <MenuItem restaurantName={route.params.name} foods={foods} />
      <ViewCart navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({});
