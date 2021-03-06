import { combineReducers } from 'redux';
import authReducer from './auth.Reducer';
import userReducer from './user.Reducer';
import productReducer from './product.Reducer';
import orderReducer from './orders.Reducer';
import categoryReducer from './category.Reducer';

const rootReduces = combineReducers({
     auth:authReducer,
     user:userReducer,
     category:categoryReducer,
     product:productReducer,
     order:orderReducer,

});
export default rootReduces;