import {productConstant} from '../constant'

const initialState = {
    products:[],
    loading: false,
    error:null,
};



const productReducer = (state= initialState, action) => {
    console.log(action.payload?.products)
    switch (action.type){
        case productConstant.GET_ALL_PRODUCTS_SUCCESS:
            state = {
                ...state,
                products:action.payload?.products
            }
            break;
    }
    return state
};

export default productReducer