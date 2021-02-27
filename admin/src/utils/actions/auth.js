import { authConstant } from "../constant"

export const login = (user) =>{
    return (dispatch)=>{
        dispatch({
            type:authConstant.LOGIN_REQUEST,
            payload:{ ...user}
    })
    }
}
// export const login = (user) => ({
//     type:authConstant.LOGIN_REQUEST,
//     user
// });