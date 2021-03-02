import {authConstant} from '../constant'

const initialState = {
    token:null,
    user:{
        firstName:'',
        lastName:'',
        email:'',
        picture:'',

    },
    authenticate:false,
    authenticating:false
};

const auth = (state=initialState, action) => {
    switch (action.type){
        case authConstant.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating:true,
            };
            break;
        case authConstant.LOGIN_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticate: true,
                authenticating:false
            }
            break;
    }
    return state
};

export default auth