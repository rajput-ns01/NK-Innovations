import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CartReducer = (state, action) => {
    const { shoppingCart, totalPrice, totalQty } = state;

    let updatedCart;
    let updatedPrice;
    let updatedQty;

    switch (action.type) {
        case 'ADD_TO_CART':
            const { product } = action;
            const existingProductIndex = shoppingCart.findIndex(item => item.ProductID === product.ProductID);

            if (existingProductIndex !== -1) {
                // Product already exists in cart, increment quantity
                updatedCart = shoppingCart.map((item, index) => {
                    if (index === existingProductIndex) {
                        return {
                            ...item,
                            qty: item.qty + 1,
                            TotalProductPrice: (item.qty + 1) * item.ProductPrice
                        };
                    }
                    return item;
                });
                updatedQty = totalQty + 1;
                updatedPrice = totalPrice + product.ProductPrice;
            } else {
                // Product does not exist in cart, add it
                updatedCart = [
                    ...shoppingCart,
                    {
                        ...product,
                        qty: 1,
                        TotalProductPrice: product.ProductPrice
                    }
                ];
                updatedQty = totalQty + 1;
                updatedPrice = totalPrice + product.ProductPrice;
            }

            return {
                shoppingCart: updatedCart,
                totalPrice: updatedPrice,
                totalQty: updatedQty
            };

        case 'INC':
            updatedCart = shoppingCart.map(item => {
                if (item.ProductID === action.id) {
                    return {
                        ...item,
                        qty: item.qty + 1,
                        TotalProductPrice: (item.qty + 1) * item.ProductPrice
                    };
                }
                return item;
            });

            updatedQty = totalQty + 1;
            updatedPrice = totalPrice + shoppingCart.find(item => item.ProductID === action.id).ProductPrice;

            return {
                shoppingCart: updatedCart,
                totalPrice: updatedPrice,
                totalQty: updatedQty
            };

        case 'DEC':
            updatedCart = shoppingCart.map(item => {
                if (item.ProductID === action.id) {
                    const newQty = item.qty - 1 > 1 ? item.qty - 1 : 1; // Ensure qty doesn't go below 1
                    return {
                        ...item,
                        qty: newQty,
                        TotalProductPrice: newQty * item.ProductPrice
                    };
                }
                return item;
            });

            const productPrice = shoppingCart.find(item => item.ProductID === action.id).ProductPrice;
            updatedQty = totalQty > 1 ? totalQty - 1 : totalQty; // Prevent totalQty from going below 1
            updatedPrice = totalPrice > productPrice ? totalPrice - productPrice : totalPrice; // Prevent totalPrice from going below 0

            return {
                shoppingCart: updatedCart,
                totalPrice: updatedPrice,
                totalQty: updatedQty
            };

        case 'DELETE':
            const filteredCart = shoppingCart.filter(item => item.ProductID !== action.id);
            const deletedProduct = shoppingCart.find(item => item.ProductID === action.id);

            updatedQty = totalQty - deletedProduct.qty;
            updatedPrice = totalPrice - deletedProduct.qty * deletedProduct.ProductPrice;

            return {
                shoppingCart: filteredCart,
                totalPrice: updatedPrice,
                totalQty: updatedQty
            };

        case 'EMPTY':
            return {
                shoppingCart: [],
                totalPrice: 0,
                totalQty: 0
            };

        default:
            return state;
    }
};
