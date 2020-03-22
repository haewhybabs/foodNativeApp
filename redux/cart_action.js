export const ADD_TO_CART = "ADD_TO_CART";

export const REMOVE_FROM_CART = "REMOVE_FROM_CART";


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

export function removeFromCartAction({ id }) {
    return {
        type: REMOVE_FROM_CART,
        payload: {
            id
        }
    }
}