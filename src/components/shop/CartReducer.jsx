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
            const existingProduct = shoppingCart.find(item => item.ProductID === action.id);
            if (!existingProduct) return state; // Prevent errors if product not found

            if (existingProduct.qty === 1) {
                // Remove item if qty reaches 0
                updatedCart = shoppingCart.filter(item => item.ProductID !== action.id);
                updatedQty = totalQty - 1;
                updatedPrice = totalPrice - existingProduct.ProductPrice;
            } else {
                // Decrease quantity
                updatedCart = shoppingCart.map(item =>
                    item.ProductID === action.id
                        ? {
                              ...item,
                              qty: item.qty - 1,
                              TotalProductPrice: (item.qty - 1) * item.ProductPrice
                          }
                        : item
                );
                updatedQty = totalQty - 1;
                updatedPrice = totalPrice - existingProduct.ProductPrice;
            }

            return {
                shoppingCart: updatedCart,
                totalPrice: updatedPrice > 0 ? updatedPrice : 0, // Ensure price is never negative
                totalQty: updatedQty > 0 ? updatedQty : 0 // Ensure quantity is never negative
            };

        case 'DELETE':
            const deletedProduct = shoppingCart.find(item => item.ProductID === action.id);
            if (!deletedProduct) return state; // Prevents errors if product is not found

            updatedCart = shoppingCart.filter(item => item.ProductID !== action.id);
            updatedQty = totalQty - deletedProduct.qty;
            updatedPrice = totalPrice - deletedProduct.qty * deletedProduct.ProductPrice;

            return {
                shoppingCart: updatedCart,
                totalPrice: updatedPrice > 0 ? updatedPrice : 0,
                totalQty: updatedQty > 0 ? updatedQty : 0
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
