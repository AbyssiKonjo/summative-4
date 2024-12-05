import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

import { FaTrashAlt } from "react-icons/fa";

const Cart = () => {
  const { cart, updateCart, removeFromCart } = useContext(CartContext);

  const handleIncrement = (item) => {
    updateCart(item.id, item.quantity + 1);
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      updateCart(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  // Defensive programming for calculating the cart total
  const cartTotal = cart.reduce((total, item) => {
    if (item && item.quantity && item.prices && item.prices.price) {
      return total + (item.prices.price / 100) * item.quantity;
    }
    return total;
  }, 0);

  return (
    <>
      {cart.length === 0 ? (
        <p className='cart'>Your Cart is Empty. Add something from the left-hand side.</p>
      ) : (
        <div className='cart'>
          {cart.map((item) => {
            if (!item) return null; // Skip undefined or invalid items
            const price = item?.prices?.price || 0; // Ensure price exists
            return (
              <div id='cartItem' key={item.id}>
                <h4>{item.name}</h4> {/* Check if item.name is accessible */}
                <div className='item-details'>
                  <div className='edit-cart'>
                    <button id='minus' onClick={() => handleDecrement(item)}>-</button>
                    <p className='quantity'>{item.quantity}</p>
                    <button id='add' onClick={() => handleIncrement(item)}>+</button>
                    <button id='trash' onClick={() => removeFromCart(item.id)}><FaTrashAlt /></button>
                  </div>

                  <p>${(price / 100).toFixed(2)}</p>
                </div>
                <p id='productTotal'>
                    Total: ${(price / 100 * (item.quantity || 1)).toFixed(2)}
                </p>
              </div>
            );
          })}
          <div className='cart-summary'>
            <div id='cartTotal'>
                <h3>Cart Total:</h3>
                <h3>${cartTotal.toFixed(2)}</h3>
            </div>
            <button className='primary-button'>Proceed to Checkout</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
