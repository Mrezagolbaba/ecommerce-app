import { combineReducers } from 'redux';
import categoryReducer from './category.Reducer';

const rootReduces = combineReducers({
     category:categoryReducer,
});
export default rootReduces;