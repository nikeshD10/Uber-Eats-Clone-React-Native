import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const HeaderButton = (props) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: props.activeTab === props.title ? "black" : "white",
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 32,
      }}
      onPress={() => props.setActiveTab(props.title)}
    >
      <Text
        style={{
          color: props.activeTab === props.title ? "white" : "black",
          fontSize: props.size,
        }}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default function HeaderTabs(props) {
  const [activeTab, setActiveTab] = useState("Delivery");

  return (
    <View style={{ flexDirection: "row", alignSelf: "center" }}>
      <HeaderButton
        title="Delivery"
        btnColor="black"
        textColor="white"
        size={16}
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
      />
      <HeaderButton
        title="Pickup"
        btnColor="white"
        textColor="black"
        size={16}
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
