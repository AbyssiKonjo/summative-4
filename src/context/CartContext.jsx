import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        if (!product || !product.id) {
            console.error("Product is invalid or missing an id");
            return;
        }

        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.id === product.id);

            if (existingProduct) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 } 
                        : item 
                );
            }

            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const updateCart = (itemId, newQuantity) => {
        setCart((prevCart) => {
            return prevCart.map((item) => {
                if (item.id === itemId) {
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
        });
    };

    const removeFromCart = (itemId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
