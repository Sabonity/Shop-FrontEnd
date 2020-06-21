export const productListReducer = (state = [], action) => {
    switch (action.type) {
        case 'POST_PRODUCTS':
            return action.payload;
        default:
            return state;
    }
}