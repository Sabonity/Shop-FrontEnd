
export const loggedReducer = (state = false, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return true;
        case 'LOGIN_FAILED':
            return false;
        case 'LOGOUT':
            return false;
        default:
            return state;
    }
}

export const userDataReducer = (state = {}, action) => {
    switch (action.type) {
        case 'POST_USER_DATA':
            return action.payload;
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
}
