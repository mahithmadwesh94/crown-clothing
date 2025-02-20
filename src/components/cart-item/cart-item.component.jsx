import './cart-tem.styles.scss'

import React from 'react'

const CartItem = ({ CartItem }) => {
  console.log(CartItem)
  const { name, quantity, imageUrl, price } = CartItem
  return (
    <div className='cart-item-container'>
      <img src={imageUrl} alt={name} />
      <div className='item-details'>
        <span className='name'>{name}</span>
        <span className='price'>{quantity} x ${price}</span>
      </div>
    </div>
  )
}

export default CartItem