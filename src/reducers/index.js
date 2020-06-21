//Combined Reducers for store
import { loggedReducer, userDataReducer } from './isLogged';
import { productListReducer } from './productsReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    isLogged: loggedReducer,
    userData: userDataReducer,
    products: productListReducer
});

export default allReducers;