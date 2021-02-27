import { combineReducers } from 'redux'
import authReducer from './auth'

const rootReduces = combineReducers({
     authReducer,
});
export default rootReduces;