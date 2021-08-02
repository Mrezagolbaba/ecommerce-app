import axios from "src/helpers/axios";
import {productConstant} from "../constant";

export const getProductBySlug=(slug)=>{
    return async dispatch=>{
        const res = await axios.get(`/products/${slug}`)
        if(res.status===200){
            dispatch({
                type:productConstant.GET_PRODUCTS_BY_SLUG,
                payload:res.data
            })
        }else {

        }
    }
}