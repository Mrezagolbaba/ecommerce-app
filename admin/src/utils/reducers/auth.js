
import {authConstant} from '../constant'

const initialState = {};

const authReducer = (state=initialState, action) => {
    switch (action.type){
        case authConstant.LOGIN_REQUEST:
            state = {
                ...state,
                ...action.payload
            };
       break;
    }
    return state
};

export default authReducer