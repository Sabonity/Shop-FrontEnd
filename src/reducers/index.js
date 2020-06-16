//Combined Reducers for store
import { loggedReducer, userDataReducer } from './isLogged';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    isLogged: loggedReducer,
    userData: userDataReducer
});

export default allReducers;