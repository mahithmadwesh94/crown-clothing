import './checkout-item.styles.scss';

import { useContext } from 'react';
import { CartContext } from '../../components/context/cart.context';


const CheckoutItem = ({ cartItem }) => {
    const { clearItemFromCart, addToCart, removeFromCart } = useContext(CartContext);
    const { name, imageUrl, price, quantity } = cartItem
    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={name} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className="arrow" onClick={() => removeFromCart(cartItem)}>&#10094;</div>
                {quantity}
                <div className="arrow" onClick={() => addToCart(cartItem)}>&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={() => clearItemFromCart(cartItem)}>&#10005;</div>
        </div>
    )
}

export default CheckoutItem