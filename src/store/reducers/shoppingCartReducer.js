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
} from "../actions/actionTypes";

const initialState = {
  cart: [],
  payment: {},
  address: {},
};

function shoppingCartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        cart: action.payload,
      };

    case ADD_TO_CART: {
      const product = action.payload;

      const productAlreadyInCart = state.cart.find(
        (item) => String(item.product.id) === String(product.id)
      );

      if (productAlreadyInCart) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            String(item.product.id) === String(product.id)
              ? {
                  ...item,
                  count: item.count + 1,
                  checked: true,
                }
              : item
          ),
        };
      }

      return {
        ...state,
        cart: [
          ...state.cart,
          {
            count: 1,
            checked: true,
            product,
          },
        ],
      };
    }

    case INCREASE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map((item) =>
          String(item.product.id) === String(action.payload)
            ? {
                ...item,
                count: item.count + 1,
              }
            : item
        ),
      };

    case DECREASE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map((item) =>
          String(item.product.id) === String(action.payload)
            ? {
                ...item,
                count: item.count > 1 ? item.count - 1 : 1,
              }
            : item
        ),
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(
          (item) => String(item.product.id) !== String(action.payload)
        ),
      };

    case TOGGLE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map((item) =>
          String(item.product.id) === String(action.payload)
            ? {
                ...item,
                checked: !item.checked,
              }
            : item
        ),
      };

    case TOGGLE_ALL_CART_ITEMS:
      return {
        ...state,
        cart: state.cart.map((item) => ({
          ...item,
          checked: action.payload,
        })),
      };

    case SET_PAYMENT:
      return {
        ...state,
        payment: action.payload,
      };

    case SET_ADDRESS:
      return {
        ...state,
        address: action.payload,
      };

    default:
      return state;
  }
}

export default shoppingCartReducer;