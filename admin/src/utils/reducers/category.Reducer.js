import {categoryConstant} from '../constant'

const initialState = {
    categories:[],
    loading: false,
    error:null,
};

const categoryReducer = (state= initialState, action) => {
    console.log(action)
    switch (action.type){
        case categoryConstant.GET_ALL_CATEGORY_SUCCESS:
            state = {
                ...state,
                categories:action.payload?.categories
            }
            break;
        case categoryConstant.ADD_NEW_CATEGORY_REQUEST:
            state = {
                ...state,
                loading:true
            }
            break;
        case categoryConstant.ADD_NEW_CATEGORY_SUCCESS:
            state = {
                ...state,
                loading:false,
            };
            break;
        case categoryConstant.ADD_NEW_CATEGORY_FAILURE:
            state = {
                ...initialState,

            }
            break;
    }
    return state
};

export default categoryReducer