import axios from "../../helpers/axios";
import {categoryConstant} from "../constant";

export const getAllCategory = () => {
    return async dispatch => {
        dispatch({ type: categoryConstant.GET_ALL_CATEGORY_SUCCESS })
        const res = await axios.get(`category/getcategory`)
        console.log(res)
        if(res.status===200){
           const { categoryList } = res.data;
            dispatch({
                type:categoryConstant.GET_ALL_CATEGORY_SUCCESS,
                payload:{ categories : categoryList }
            })
        }else {
            dispatch({
                type:categoryConstant.GET_ALL_CATEGORY_FAILURE,
                payload:{ error : res.data.error }
            })
        }
    }
}

export const addCategory = (form) =>{
    return async dispatch => {
        dispatch({type:categoryConstant.ADD_NEW_CATEGORY_REQUEST})
        const res = await axios.post(`category/create`,form)
        if(res.status===200){
            dispatch({
                type:categoryConstant.ADD_NEW_CATEGORY_SUCCESS,
                payload:res.data.category
            })
        }else {
            dispatch({
                type:categoryConstant.ADD_NEW_CATEGORY_FAILURE,
                payload:{ error : res.data.error }
            })
        }
        console.log('res',res)
    }
}