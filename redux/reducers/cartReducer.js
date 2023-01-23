let defaultState = {
  selectedItems: { items: [], restaurantName: "" },
};

let cartReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      let newState = { ...state };
      if (action.payload.checkBoxValue) {
        console.log("ADD TO CART");
        newState.selectedItems = {
          items: [...newState.selectedItems.items, action.payload],
          restaurantName: action.payload.restaurantName,
        };
      } else {
        console.log("REMOVE FROM CART");
        newState.selectedItems = {
          // So what this does is say we have lasagna, tandori, chilaquiles in cart
          // which are all checked items
          // If we uncheck one of the item say lasagna then we will check/filter from cart list
          // if the item title is not equal to lasagna then we will add it to the cart
          // so we will have tandori and chilaquiles in cart

          items: [
            ...newState.selectedItems.items.filter(
              (item) => item.title !== action.payload.title
            ),
          ],
          restaurantName: action.payload.restaurantName,
        };
      }
      return newState;
    default:
      return state;
  }
};

export default cartReducer;
