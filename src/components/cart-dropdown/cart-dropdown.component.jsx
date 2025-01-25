import './cart-dropdown.styles.scss';
import Button from '../button/button.component';

import React from 'react'

const CartDropDown = () => {
  return (
    <div className='cart-dropdown-container'>
        <div className="cart-items">
    <Button>CHECKOUT</Button>
        </div>
    </div>
  )
}

export default CartDropDown