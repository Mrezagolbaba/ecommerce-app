import {categoryConstant, initialDataConstant, productConstant} from "../constant";
import axios from "../../helpers/axios";

export const getInitialData = () => {
    return async dispatch =>{
        dispatch({type:initialDataConstant.GET_ALL_INITIAL_DATA_REQUEST})
        const res = await axios.post(`/initialData`)
        if(res.status===200){
            const { categories,products } = res.data;
            dispatch({
                type:categoryConstant.GET_ALL_CATEGORY_SUCCESS,
                payload:{ categories }
            })
            dispatch({
                type:productConstant.GET_ALL_PRODUCTS_SUCCESS,
                payload:{ products }
            })
        }
        // else {
        //     dispatch({
        //         type:initialDataConstant.GET_ALL_INITIAL_DATA_FAILURE,
        //         payload:{ error : res.data.error }
        //     })
        // }
        console.log('action',res)
    }
}