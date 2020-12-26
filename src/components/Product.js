import React from 'react';
import '../css/Product.css';
import { useStateValue } from "../StateProvider";


function Product({ id, title, image, price, rating }) {
    const [{ }, dispatch] = useStateValue();

    const addToBasket = () => {
        // dispatch item into data layer
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating
            }
        })
    }


    return (
        <div className="product">
            <div className="product__info">
                <p>{title}</p>
                <p className="product__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    {Array(rating).fill().map(() => (
                        <p><img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/271/glowing-star_1f31f.png" alt="" /></p>

                    ))}
                </div>
            </div>

            <img src={image} alt="" />

            <button onClick={addToBasket}>Add to Basket</button>
        </div>
    )
}

export default Product;