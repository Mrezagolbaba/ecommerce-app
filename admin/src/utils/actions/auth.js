import { authConstant } from "../constant"
import axios from "../../helpers/axios";

export const login = (user) =>{
    return async (dispatch)=>{
        const res = await axios.post(`/admin/signin`)
        dispatch({
            type:authConstant.LOGIN_REQUEST,
            payload:{ ...user}
    })
    }
}