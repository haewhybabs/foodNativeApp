export const ADD_TO_CART = "ADD_TO_CART";

export function addToCartAction({ id, name, price, qty, details }) {
    return {
        type: ADD_TO_CART,
        payload: {
            id,
            name,
            price,
            qty,
            details
        }
    }
}