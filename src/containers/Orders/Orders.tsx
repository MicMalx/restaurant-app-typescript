import { useState, useEffect, ReactNode } from 'react';
import axios from '../../axios';

import style from './Orders.module.css';

import Spinner from '../../components/UI/Spinner/Spinner';
import Order from '../../components/Order/Order';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

type OrderData = {
    address: string;
    id: string;
    meals: {
        amount: number;
        id: string;
        name: string;
    }[];
    name: string;
    paymentMethod: string;
    phoneNumber: string;
    price: number;
    purchaserId: string;
}

const Orders = () => {
    const { token } = useSelector((state: RootState) => state.auth)
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState<OrderData[]>([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await axios.get<{orders: OrderData[]}>('/orders/user',
                    {
                        headers: {
                            Authorization: 'Bearer ' + token,
                        }
                    }
                );
                setError(false);
                setLoading(false);
                setOrders(response.data.orders);
            } catch (err) {
                setLoading(false);
                setError(true);
            }
            
        }
        fetchData();
    }, []);

    let ordersInstances: ReactNode = <Spinner />;
    if(!loading && error) {
        ordersInstances = <h3 className={style.Error}>Something went wrong! Try again later</h3>;
    }
    else if(!loading) {
        ordersInstances = orders.map(order => (
            <Order
                key={order.id}
                meals={order.meals}
                price={order.price}
            />
        ));
    }
    return (
        <div>
            {ordersInstances}
        </div>
    );
};

export default Orders;