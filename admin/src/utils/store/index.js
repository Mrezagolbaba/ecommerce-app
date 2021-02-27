import {
    createStore,
    applyMiddleware
} from 'redux';
import thunk  from "redux-thunk";
import rootReduces from '../reducers';

const configureStore = () => {
    let store;
    store = createStore(
        rootReduces,
        applyMiddleware(thunk)
    );
    return store;
};
export default configureStore;