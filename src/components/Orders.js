import React, { useEffect, useState } from 'react';
import '../css/Orders.css';
import { useStateValue } from '../StateProvider';
import { db } from '../firebase';
import Order from './Order';
import Login from './Login';
import { useHistory } from 'react-router-dom';

function Orders() {
    const [{ user }, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

    const history = useHistory();

    useEffect(() => {
        if (user) {
            //Pulls orders from database for current user
            db.collection('users').doc(user?.uid).collection('orders').orderBy('created', 'desc').onSnapshot(snapshot => (
                setOrders(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            ));
        } else {
            setOrders([]);
        }

    }, []);

    if (!user) history.push('/login');

    return (
        <div className="orders">
            <h1>Your Orders</h1>

            <div className="orders__order">
                {orders?.map(order => (
                    <Order order={order} />
                ))}
            </div>
        </div>
    )
}

export default Orders;