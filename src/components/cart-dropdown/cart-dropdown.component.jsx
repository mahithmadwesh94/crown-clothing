import './cart-dropdown.styles.scss';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { CartContext } from '../context/cart.context';
import { Outlet } from "react-router";
import { Link } from "react-router-dom";

import React from 'react'

const CartDropDown = () => {

  const { cartItems } = useContext(CartContext)
  return (
    <div className='cart-dropdown-container'>
      <div className="cart-items">
        {cartItems.map((item) => <CartItem key={item.id} CartItem={item} />)}
      </div>
      <Button><Link to="/checkout">CHECKOUT</Link></Button>
    </div>
  )
}

export default CartDropDown