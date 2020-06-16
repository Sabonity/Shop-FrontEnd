//Logged in Action

export const LOGIN_SUCCESS = () => {
    return {
        type: 'LOGIN_SUCCESS'
    };
};

export const LOGIN_FAILED = () => {
    return{
        type: 'LOGIN_FAILED'
    }
}

export const LOGOUT = () => {
    return{
        type: 'LOGOUT'
    };
};

export const POST_USER_DATA = (token) => {
    return {
        type: 'POST_USER_DATA',
        payload: token
    };
};