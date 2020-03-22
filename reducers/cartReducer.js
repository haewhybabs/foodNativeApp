import { ADD_TO_CART } from '../redux/cart_action';
const initial_state = [{
    id: 4,
    name: 'Amala',
    price: 50,
    qty: 1,
    details: []
}];

export default function cartReducer(state = [], action = {}) {
    switch (action.type) {
        case ADD_TO_CART:
            {
                const product = action.payload;
                const cart = state;
                console.log(action.payload);
                const existingProductIndex = findProductIndex(cart, product.id);


                const updatedCart = existingProductIndex >= 0 ?
                    updateProductUnits(cart, product) : [...cart, product];
                return updatedCart;

            }
            // case 'REMOVE_FROM_CART':
    }
    return state
}




/*Get product index from cart with productID*/
const findProductIndex = (cart, productID) => {
    return cart.findIndex(p => p.id === productID)
};

/*Update cart with the product index*/
const updateProductUnits = (cart, product) => {
    const productIndex = findProductIndex(cart, product.id);

    /*Push the entire cart to updatedCart*/
    const updatedCart = [...cart];
    /*Current Product to update*/
    const existingProduct = updatedCart[productIndex];

    const updatedUnitsProduct = {
        ...existingProduct,
        qty: existingProduct.qty + product.qty
    };

    updatedCart[productIndex] = updatedUnitsProduct;

    return updatedCart;
}