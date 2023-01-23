import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React from "react";
import { Divider } from "react-native-elements";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch, useSelector } from "react-redux";

const FoodInfo = (props) => {
  return (
    <View style={styles.foodInfoStyle}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>{props.title}</Text>
      <Text style={{ fontSize: 16 }}>{props.description}</Text>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>{props.price}</Text>
    </View>
  );
};

const FoodImage = (props) => {
  return (
    <View style={styles.foodImageStyle}>
      <Image
        source={{ uri: props.image }}
        style={{
          width: 100,
          height: 100,
        }}
      />
    </View>
  );
};

export default function MenuItem({ restaurantName, foods, hideCheckBox }) {
  const dispatch = useDispatch();

  const selectItem = (checkBoxValue, food) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...food,
        restaurantName: restaurantName,
        checkBoxValue: checkBoxValue,
      },
    });
  };

  // const selectedItems = useSelector((store) => store.cart.selectedItems);

  // So before below code what was happening is we were able to check and dispaly the total price
  // But when we go back and again go to same page then item checked were unchecked but total price was still same and was showing
  // So to fix this we need to get the cart state or selected item state
  // So we need to use useSelector hook
  // So we need to get the cart state and then get the selectedItems state from it
  // Then we pass our state to function which check if the food listed in menu items are already in cart or not
  // So to check that we use some methods which
  // checks if  any array elements pass a test provided as a call back funtion
  // so some() methods executes the callback function once for each array element
  // some() methods returns true and stops if the function returns true for one of the array elements
  // so in below insid bouncycheck box components in prop isChecked we pass the function is food assigned to that
  // check box is in cart or not
  // If YES THEN it check box.

  const cartItems = useSelector((store) => store.cart.selectedItems.items);

  const isFoodInCart = (food, cartItems) => {
    return cartItems.some((item) => item.title === food.title);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        margin: 0,
        width: "100%",
        padding: 0,
        justifyContent: "space-around",
      }}
    >
      {/* {!foods.length ? (
        <></>
      ) : (
        foods.map((food, index) => (
          <View key={index}>
            <View style={styles.menuItemStyle}>
              {hideCheckBox ? (
                <></>
              ) : (
                <BouncyCheckbox
                  innerIconStyle={{ borderRadius: 0, borderColor: "lightgray" }} // SET Border radius of before check box clicked
                  iconStyle={{ borderColor: "lightgray", borderRadius: 0 }} // Set border radius of after checked box clicked
                  fillColor="green"
                  onPress={(checkBoxValue) => {
                    selectItem(checkBoxValue, food);
                    //  ,console.log(selectedItems);
                  }}
                  isChecked={isFoodInCart(food, cartItems)}
                />
              )}
              <FoodInfo
                title={food.title}
                description={food.description}
                price={food.price}
              />
              <FoodImage image={food.image} />
            </View>
            <Divider
              width={1}
              orientation="vertical"
              style={{ marginHorizontal: 20 }}
            />
          </View>
        ))
      )} */}
      {foods.map((food, index) => (
        <View key={index}>
          <View style={styles.menuItemStyle}>
            {hideCheckBox ? (
              <></>
            ) : (
              <BouncyCheckbox
                innerIconStyle={{ borderRadius: 0, borderColor: "lightgray" }} // SET Border radius of before check box clicked
                iconStyle={{ borderColor: "lightgray", borderRadius: 0 }} // Set border radius of after checked box clicked
                fillColor="green"
                onPress={(checkBoxValue) => {
                  selectItem(checkBoxValue, food);
                  //  ,console.log(selectedItems);
                }}
                isChecked={isFoodInCart(food, cartItems)}
              />
            )}
            <FoodInfo
              title={food.title}
              description={food.description}
              price={food.price}
            />
            <FoodImage image={food.image} />
          </View>
          <Divider
            width={1}
            orientation="vertical"
            style={{ marginHorizontal: 20 }}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  menuItemStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    marginHorizontal: 10,
  },
  foodImageStyle: {
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: "hidden",
  },
  foodInfoStyle: {
    width: 200,
    justifyContent: "space-evenly",
  },
});
