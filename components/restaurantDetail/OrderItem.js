import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function OrderItem({ item }) {
  const { title, price } = item;
  return (
    <View style={styles.orderItem}>
      <Text style={{ fontWeight: "600", fontSize: 13 }}> {title} </Text>
      <Text style={{ opacity: 0.7, fontSize: 13 }}> {price} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderBottomColor: "#999",
    borderBottomWidth: 1,
  },
});
