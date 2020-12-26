import React, { useEffect, useState } from 'react';
import axios from '../axios';
import '../css/Payment.css';
import { db } from '../firebase';

import { useStateValue } from '../StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from '../reducer';


function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();

    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [succeeded, setSucceeded] = useState(false);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {

        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                //Stripe expects the total in cents
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            })

            setClientSecret(response.data.clientSecret);
        }


        getClientSecret();

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // paymentIntent = payment confirmation

            db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            })

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET'
            })

            //To prevent users from coming back to payment page
            history.replace('/orders');
        })
    }

    const handleChange = e => {
        setDisabled(e.empty);
        setError(e.rror ? e.error.message : "");
    }

    return (
        <div className="payment">
            <div className="payment__container">
                <h1>Checkout (<Link to="/checkout">{basket?.length} items</Link>)</h1>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>5801 Preston Oaks Rd</p>
                        <p>Dallas, Tx, 75254</p>
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                price={item.price}
                                rating={item.rating}
                                image={item.image}
                            />

                        ))}
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        {/* Stripe */}
                        <form action="" onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <>
                                            <p>
                                                <strong>Order Total: {` ${value}`}</strong>
                                            </p>
                                        </>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />

                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>

                                {error && <div>{error}</div>}

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment;