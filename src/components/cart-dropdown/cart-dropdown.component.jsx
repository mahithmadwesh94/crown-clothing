import './cart-dropdown.styles.scss';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { CartContext } from '../context/cart.context';
import { useNavigate } from 'react-router';

import React from 'react'

const CartDropDown = () => {
  const navigate = useNavigate();

  const navigateToCheckout = () => {
    navigate('/checkout');
  }

  const { cartItems } = useContext(CartContext)
  return (
    <div className='cart-dropdown-container'>
      <div className="cart-items">
        {cartItems.map((item) => <CartItem key={item.id} CartItem={item} />)}
      </div>
      <Button onClick={navigateToCheckout}>CHECKOUT</Button>
    </div>
  )
}

export default CartDropDown