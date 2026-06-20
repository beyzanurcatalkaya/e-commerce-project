import api, { setAuthToken, removeAuthToken } from "../../services/api";
import {
  SET_USER,
  SET_ROLES,
  SET_ADDRESS_LIST,
  SET_CREDIT_CARDS,
  SET_ORDERS,
  SET_THEME,
  SET_LANGUAGE,
} from "./actionTypes";

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setRoles = (roles) => ({
  type: SET_ROLES,
  payload: roles,
});

export const setAddressList = (addressList) => ({
  type: SET_ADDRESS_LIST,
  payload: addressList,
});
export const setCreditCards = (creditCards) => ({
  type: SET_CREDIT_CARDS,
  payload: creditCards,
});
export const setOrders = (orders) => ({
  type: SET_ORDERS,
  payload: orders,
});
export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme,
});

export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language,
});

export const fetchRolesIfNeeded = () => {
  return async (dispatch, getState) => {
    const { roles } = getState().client;

    if (roles && roles.length > 0) {
      return roles;
    }

    const response = await api.get("/roles");

    dispatch(setRoles(response.data));

    return response.data;
  };
};

export const loginUser = (loginData, rememberMe) => {
  return async (dispatch) => {
    const response = await api.post("/login", {
      email: loginData.email,
      password: loginData.password,
    });

    const user = response.data;

    dispatch(setUser(user));

    if (user?.token) {
      setAuthToken(user.token);

      if (rememberMe) {
        localStorage.setItem("token", user.token);
      } else {
        localStorage.removeItem("token");
      }
    }

    return user;
  };
};

export const verifyToken = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    if (!token) {
      removeAuthToken();
      return null;
    }

    try {
      setAuthToken(token);

      const response = await api.get("/verify");

      const user = response.data;

      dispatch(setUser(user));

      if (user?.token) {
        localStorage.setItem("token", user.token);
        setAuthToken(user.token);
      }

      return user;
    } catch (error) {
      localStorage.removeItem("token");
      removeAuthToken();
      dispatch(setUser({}));

      throw error;
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    removeAuthToken();
    dispatch(setUser({}));
  };
};

export const fetchAddressList = () => {
  return async (dispatch) => {
    const response = await api.get("/user/address");

    dispatch(setAddressList(response.data));

    return response.data;
  };
};

export const addAddress = (addressData) => {
  return async (dispatch) => {
    await api.post("/user/address", addressData);

    const response = await api.get("/user/address");

    dispatch(setAddressList(response.data));

    return response.data;
  };
};

export const updateAddress = (addressData) => {
  return async (dispatch) => {
    await api.put("/user/address", addressData);

    const response = await api.get("/user/address");

    dispatch(setAddressList(response.data));

    return response.data;
  };
};

export const deleteAddress = (addressId) => {
  return async (dispatch) => {
    await api.delete(`/user/address/${addressId}`);

    const response = await api.get("/user/address");

    dispatch(setAddressList(response.data));

    return response.data;
  };
};

export const fetchCreditCards = () => {
  return async (dispatch) => {
    const response = await api.get("/user/card");

    dispatch(setCreditCards(response.data));

    return response.data;
  };
};

export const addCreditCard = (cardData) => {
  return async (dispatch) => {
    await api.post("/user/card", cardData);

    const response = await api.get("/user/card");

    dispatch(setCreditCards(response.data));

    return response.data;
  };
};

export const updateCreditCard = (cardData) => {
  return async (dispatch) => {
    await api.put("/user/card", cardData);

    const response = await api.get("/user/card");

    dispatch(setCreditCards(response.data));

    return response.data;
  };
};

export const deleteCreditCard = (cardId) => {
  return async (dispatch) => {
    await api.delete(`/user/card/${cardId}`);

    const response = await api.get("/user/card");

    dispatch(setCreditCards(response.data));

    return response.data;
  };
};
export const fetchOrders = () => {
  return async (dispatch) => {
    const response = await api.get("/order");

    dispatch(setOrders(response.data));

    return response.data;
  };
};