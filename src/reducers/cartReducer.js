export const cartItemsReducer = (state = [], action) => {
    switch (action.type) {
        case 'POST_CART_ITEMS':
            return action.payload;
        default:
            return state;
    }
}