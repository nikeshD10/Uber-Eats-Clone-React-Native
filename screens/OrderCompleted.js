import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import db from "../firebase";
import {
  collection,
  orderBy,
  limit,
  query,
  onSnapshot,
} from "firebase/firestore";
import MenuItem from "../components/restaurantDetail/MenuItem";

export default function OrderCompleted() {
  const [lastOrder, setLastOrder] = useState({
    items: [
      {
        title: "Tandoori Chicken",
        description:
          "Chicken marinated in yoghurt and spices, then roasted in a clay oven",
        price: "$12.99",
        image:
          "https://www.indianhealthyrecipes.com/wp-content/uploads/2014/09/tandoori-chicken-500x500.jpg",
      },
    ],
    restaurantName: "",
  });

  const { items, restaurantName } = useSelector(
    (state) => state.cart.selectedItems
  );

  const total = items
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((acc, currItem) => acc + currItem, 0);

  const totalUSD = total.toFixed(2).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  // useEffect(() => {
  //   async () => {
  //     try {
  //       const ordersRef = await collection(db, "orders");
  //       const q = await query(
  //         ordersRef,
  //         orderBy("createdAt", "desc"),
  //         limit(1)
  //       );
  //       const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //         querySnapshot.forEach((doc) => {
  //           setLastOrder(doc.data());
  //         });
  //       });
  //       unsubscribe();
  //     } catch (err) {
  //       console.log("Error occured when fetching books");
  //     } finally {
  //     }
  //   };
  // }, [lastOrder]);

  // const fetchOrderedItems = () => {
  //   try {
  //     const ordersRef = collection(db, "orders");
  //     const q = query(ordersRef, orderBy("createdAt", "desc"), limit(1));
  //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //       setLastOrder(querySnapshot.docs[0].data());
  //     });
  //     return () => unsubscribe();
  //   } catch (err) {
  //     console.log("Error occured when fetching books");
  //   }
  // };

  // return () => unsubscribe();

  // (snapshot) => {
  //   setLatestData(snapshot.docs[0].data());
  // });

  const fetchOrderedItems = () => {
    try {
      const ordersRef = collection(db, "orders");
      const q = query(ordersRef, orderBy("createdAt", "desc"), limit(1));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (!querySnapshot.empty) {
          console.log("Firestore : ", querySnapshot.docs[0].data());
          setLastOrder(querySnapshot.docs[0].data());
          console.log("LastOrder : ", lastOrder);
        } else {
          return;
        }
      });
      return () => unsubscribe();
    } catch (err) {
      console.log("Error occured when fetching books");
    }
  };

  useEffect(() => {
    fetchOrderedItems();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        margin: 20,
        alignItems: "center",
      }}
    >
      <LottieView
        style={{ height: 100, alignSelf: "center", marginBottom: 30 }}
        source={require("../assets/animations/check-mark.json")}
        loop={false}
        speed={0.5}
        autoPlay
      />
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
        Your order at {restaurantName} has been placed for {totalUSD}.
      </Text>
      {/* <ScrollView>
        {!lastOrder.length ? (
          <></>
        ) : (
          <MenuItem foods={lastOrder.items} hideCheckBox={true} />
        )}
      </ScrollView> */}
      <MenuItem foods={lastOrder.items} hideCheckBox={true} />
      <LottieView
        style={{ height: 100, alignSelf: "center", marginBottom: 30 }}
        source={require("../assets/animations/cooking.json")}
        speed={0.5}
        autoPlay
      />
    </View>
  );
}
