import {
  CREATE_PRODUCT,
  ADD_PRODUCT_TO_CARD,
  CHANGE_VIEW,
  DECREASE_PRODUCT_QTY,
  INCREASE_PRODUCT_QTY,
  REMOVE_PRODUCT_FROM_CARD,
} from "./actionTypes";

export const addProuct = (product) => {
  return {
    type: CREATE_PRODUCT,
    payload: {
      product,
    },
  };
};
export const addToCart = (id) => {
  return {
    type: ADD_PRODUCT_TO_CARD,
    payload: {
      id,
    },
  };
};
export const changeView = (name) => {
  return {
    type: CHANGE_VIEW,
    payload: {
      name,
    },
  };
};
export const decreaseFromCart = (id) => {
  return {
    type: DECREASE_PRODUCT_QTY,
    payload: {
      id,
    },
  };
};
export const increaseFromCart = (id) => {
  return {
    type: INCREASE_PRODUCT_QTY,
    payload: {
      id,
    },
  };
};
export const removeFromCart = (id) => {
  return {
    type: REMOVE_PRODUCT_FROM_CARD,
    payload: {
      id,
    },
  };
};
