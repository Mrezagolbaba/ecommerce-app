import axios from "../../helpers/axios";
import { categoryConstant } from "../constant";

export const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConstant.GET_ALL_CATEGORY_SUCCESS });
    const res = await axios.get(`category/getcategory`);
    console.log("categorry", res);
    if (res.status === 200) {
      const { categoryList } = res.data;
      dispatch({
        type: categoryConstant.GET_ALL_CATEGORY_SUCCESS,
        payload: { categories: categoryList },
      });
    } else {
      dispatch({
        type: categoryConstant.GET_ALL_CATEGORY_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const addCategory = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstant.ADD_NEW_CATEGORY_REQUEST });
    const res = await axios.post(`category/create`, form);
    console.log("res", res);
    //TODO add sub categories generate error
    try {
      if (res.status === 201) {
        dispatch({
          type: categoryConstant.ADD_NEW_CATEGORY_SUCCESS,
          payload: { category: res.data.category },
        });
      } else {
        dispatch({
          type: categoryConstant.ADD_NEW_CATEGORY_FAILURE,
          payload: { error: res.data.error },
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};
export const updateCategories = (form) => {
  return async (dispatch) => {
    const res = await axios.post(`category/update`, form);
    if (res.status === 201) {
      return true;
    } else {
      console.log("res", res);
    }
  };
};
export const deleteCategories = (ids) => {
  return async (dispatch) => {
    const res = await axios.post(`category/delete`, {
      payload: {
        ids,
      },
    });
    return res.status === 201;
  };
};
