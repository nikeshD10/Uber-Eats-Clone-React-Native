import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import OrderItem from "./OrderItem";
import db from "../../firebase";
import {
  serverTimestamp,
  collection,
  addDoc,
  setDoc,
} from "firebase/firestore";

export default function ViewCart({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const { items, restaurantName } = useSelector(
    (state) => state.cart.selectedItems
  );
  // console.log(items);
  /*
    '$13.50'
    replace -> '13.50'
    Number('13.50') -> 13.50
    [13.5, 20.5, 19.5]
    reduce -> 13.5 + 20.5 + 19.5 -> 43.5
  */
  const total = items
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((acc, currItem) => acc + currItem, 0);

  const totalUSD = total.toFixed(2).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  // console.log(totalUSD);

  const addOrderToFirebase = async () => {
    // const docData = {
    //   items: items,
    //   restaurantName: restaurantName,
    //   createdAt: serverTimestamp(),
    // }
    try {
      const docRef = await addDoc(collection(db, "orders"), {
        items: items,
        restaurantName: restaurantName,
        createdAt: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setModalVisible(false);
    navigation.navigate("OrderCompleted");
  };

  const checkOutModalContent = () => {
    return (
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{restaurantName}</Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              justifyContent: "space-between",
              paddingBottom: 20,
            }}
          >
            {items.map((item, index) => (
              <OrderItem key={index} item={item} />
            ))}
          </ScrollView>
          <View style={styles.subtotalContainer}>
            <Text style={styles.subtotalText}>Subtotal</Text>
            <Text style={styles.subtotalText}>{`$${totalUSD}`}</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                addOrderToFirebase();
              }}
            >
              <Text style={styles.textStyle}>Checkout</Text>
              <Text style={styles.textStyle}>
                {total ? `$` + totalUSD : ""}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        {checkOutModalContent()}
      </Modal>
      {total ? (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            bottom: 5,
            zIndex: 999,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "black",
                paddingHorizontal: 15,
                paddingVertical: 10,
                alignItems: "center",
                borderRadius: 30,
                width: 300,
                position: "relative",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
              onPress={() => setModalVisible(true)}
            >
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                ViewCart
              </Text>
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                {totalUSD}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <></>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "flex-end",
  },
  modalView: {
    backgroundColor: "white",
    padding: 16,
    height: 400,
    borderWidth: 1,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    width: "80%",
    elevation: 2,
  },

  buttonClose: {
    backgroundColor: "#000",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },

  subtotalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 15,
  },

  subtotalText: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 10,
  },
});
