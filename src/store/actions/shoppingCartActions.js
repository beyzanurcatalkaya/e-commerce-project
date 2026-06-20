import api from "../../services/api";

import {
  SET_CART,
  ADD_TO_CART,
  INCREASE_CART_ITEM,
  DECREASE_CART_ITEM,
  REMOVE_FROM_CART,
  TOGGLE_CART_ITEM,
  TOGGLE_ALL_CART_ITEMS,
  SET_PAYMENT,
  SET_ADDRESS,
} from "./actionTypes";

export const setCart = (cart) => ({
  type: SET_CART,
  payload: cart,
});

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const increaseCartItem = (productId) => ({
  type: INCREASE_CART_ITEM,
  payload: productId,
});

export const decreaseCartItem = (productId) => ({
  type: DECREASE_CART_ITEM,
  payload: productId,
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const toggleCartItem = (productId) => ({
  type: TOGGLE_CART_ITEM,
  payload: productId,
});

export const toggleAllCartItems = (checked) => ({
  type: TOGGLE_ALL_CART_ITEMS,
  payload: checked,
});

export const setPayment = (payment) => ({
  type: SET_PAYMENT,
  payload: payment,
});

export const setAddress = (address) => ({
  type: SET_ADDRESS,
  payload: address,
});

export const createOrder = (orderData) => {
  return async (dispatch) => {
    const response = await api.post("/order", orderData);

    dispatch(setCart([]));
    dispatch(setPayment({}));
    dispatch(setAddress({}));

    return response.data;
  };
};