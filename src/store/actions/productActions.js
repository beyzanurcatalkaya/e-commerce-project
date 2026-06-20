import api from "../../services/api";

import {
  SET_CATEGORIES,
  SET_PRODUCT_LIST,
  SET_PRODUCT,
  SET_TOTAL,
  SET_FETCH_STATE,
  SET_LIMIT,
  SET_OFFSET,
  SET_FILTER,
} from "./actionTypes";

export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories,
});

export const setProductList = (productList) => ({
  type: SET_PRODUCT_LIST,
  payload: productList,
});

export const setProduct = (product) => ({
  type: SET_PRODUCT,
  payload: product,
});

export const setTotal = (total) => ({
  type: SET_TOTAL,
  payload: total,
});

export const setFetchState = (fetchState) => ({
  type: SET_FETCH_STATE,
  payload: fetchState,
});

export const setLimit = (limit) => ({
  type: SET_LIMIT,
  payload: limit,
});

export const setOffset = (offset) => ({
  type: SET_OFFSET,
  payload: offset,
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter,
});

export const fetchCategoriesIfNeeded = () => {
  return async (dispatch, getState) => {
    const { categories } = getState().product;

    if (categories && categories.length > 0) {
      return categories;
    }

    const response = await api.get("/categories");

    dispatch(setCategories(response.data));

    return response.data;
  };
};

export const fetchProducts = (queryParams = {}) => {
  return async (dispatch) => {
    try {
      dispatch(setFetchState("FETCHING"));

      const params = {};

      if (queryParams.category) {
        params.category = queryParams.category;
      }

      if (queryParams.filter) {
        params.filter = queryParams.filter;
      }

      if (queryParams.sort) {
        params.sort = queryParams.sort;
      }

      params.limit = queryParams.limit ?? 25;
      params.offset = queryParams.offset ?? 0;

      const response = await api.get("/products", { params });

      dispatch(setTotal(response.data.total));
      dispatch(setProductList(response.data.products));
      dispatch(setFetchState("FETCHED"));

      return response.data;
    } catch (error) {
      dispatch(setFetchState("FAILED"));
      throw error;
    }
  };
};

export const fetchProductById = (productId) => {
  return async (dispatch) => {
    try {
      dispatch(setFetchState("FETCHING"));

      const response = await api.get(`/products/${productId}`);

      dispatch(setProduct(response.data));
      dispatch(setFetchState("FETCHED"));

      return response.data;
    } catch (error) {
      dispatch(setFetchState("FAILED"));
      throw error;
    }
  };
};