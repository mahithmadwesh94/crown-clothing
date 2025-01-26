import { createContext, useEffect, useState } from "react";


const addCartItems = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItems = (cartItems, productToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id);

    if (existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)
    } else {

    }

    return cartItems.map((cartItem) => cartItem.id === productToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem);
}

const clearCartItems = (cartItems, removeItem) => {
    return cartItems.filter((cartItem) => cartItem.id !== removeItem.id)
}


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addToCart: () => { },
    removeFromCart: () => { },
    clearItemFromCart: () => { },
    totalCost: 0,
    cartCount: 0
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems])


    useEffect(() => {
        const cartTotalCost = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        setTotalCost(cartTotalCost);
    }, [cartItems])


    const addToCart = (productToAdd) => {
        setCartItems(addCartItems(cartItems, productToAdd));
    }

    const clearItemFromCart = (productToRemove) => {
        setCartItems(clearCartItems(cartItems, productToRemove));
    }

    const removeFromCart = (productToRemove) => {
        setCartItems(removeCartItems(cartItems, productToRemove));
    }





    const value = { isCartOpen, setIsCartOpen, addToCart, cartItems, cartCount, removeFromCart, clearItemFromCart, totalCost };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}