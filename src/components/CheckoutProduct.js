import React from 'react';
import '../css/CheckoutProduct.css';
import { useStateValue } from '../StateProvider';

function CheckoutProduct({ id, image, title, price, rating }) {
    const [{ basket }, dispatch] = useStateValue();

    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id
        })
    }

    return (
        <div className="checkoutProduct">
            <img className="checkoutProduct__image" src={image} />

            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{title}</p>
                <p className="checkoutProduct__price"> <small>$</small><strong>{price}</strong></p>

                <div className="checkoutProduct__rating">
                    {Array(rating).fill().map(() => (
                        <p><img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/271/glowing-star_1f31f.png" alt="" /></p>
                    ))}
                </div>

                <button onClick={removeFromBasket}>Remove from Basket</button>

            </div>
        </div>
    )
}

export default CheckoutProduct;