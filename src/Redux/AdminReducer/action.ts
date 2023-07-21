import { Dispatch, AnyAction } from "redux";
import axios from "axios";

import {
  PRODUCT_FAILURE,
  PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  ADD_PRODUCT_SUCCESS,
  EDIT_PRODUCT_SUCCESS,
} from "./actionTypes";

const baseURL = "https://sparkel.onrender.com/data";

// Getting the Products

export const getProduct = (dispatch: Dispatch<AnyAction>) => {
  dispatch({ type: PRODUCT_REQUEST });
  axios
    .get(baseURL)
    .then((res) => {
      dispatch({ type: GET_PRODUCT_SUCCESS, payload: res.data });
    })
    .catch(() => {
      dispatch({ type: PRODUCT_FAILURE });
    });
};

// Posting the products

export const addProduct = (data: any) => (dispatch: Dispatch<AnyAction>) => {
  dispatch({ type: PRODUCT_REQUEST });

  axios
    .post(`https://sparkel.onrender.com/data`, data)
    .then((res) => {
      dispatch({ type: ADD_PRODUCT_SUCCESS, payload: res.data });
    })
    .catch(() => {
      dispatch({ type: PRODUCT_FAILURE });
    });
};

// Editing the products

export const editProduct =
  (id: string, data: any) => (dispatch: Dispatch<AnyAction>) => {
    dispatch({ type: PRODUCT_REQUEST });

    axios
      .put(`${baseURL}/${id}`, data)
      .then((res) => {
        dispatch({ type: EDIT_PRODUCT_SUCCESS, payload: res.data });
      })
      .catch(() => {
        dispatch({ type: PRODUCT_FAILURE });
      });
  };