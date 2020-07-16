//Combined Reducers for store
import { loggedReducer, userDataReducer } from './isLogged';
import { productListReducer } from './productsReducer';
import { combineReducers } from 'redux';
import { cartItemsReducer } from './cartReducer';

const allReducers = combineReducers({
    isLogged: loggedReducer,
    userData: userDataReducer,
    products: productListReducer,
    cartItems: cartItemsReducer
});

export default allReducers;