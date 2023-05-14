import { useEffect } from 'react';
import style from './OrderBuilder.module.css';

import { useHistory } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import MealsList from '../../components/MealsList/MealsList';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getMeals } from '../../store/reducers/orderBuilder';
import { setAuthRedirectPath } from '../../store/reducers/auth';

const OrderBuilder = ({menuPart}: {menuPart: string}) => {
    const { meals, error } = useSelector((state: RootState) => state.orderBuilder);
    const { token } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const history = useHistory();

    useEffect(() => {
        if (!meals.length) {
            dispatch(getMeals());
        }
    }, []);

    const purchaseHandler = () => {
        if (token) {
            history.push('/checkout');
        } else {
            dispatch(setAuthRedirectPath('/checkout'));
            history.push('/auth');
        }
    }

    let mealsList = error ? <p>Meals can't be loaded</p> : <Spinner />;
    if(meals.length) {
        mealsList = <MealsList 
            menuPart={menuPart}
            meals={meals}
            summary={false}
        />;
    }

    let mealsSummary = null;
    if(meals.length) {
        mealsSummary = (
            <MealsList
                meals={meals}
                summary={true}
            />
        );
    }
    return (
        <div className={style.OrderBuilder}>
            {mealsList}
            {mealsSummary}
            <Button
                btnType="Success"
                disabled={meals.length ? false : true}
                clicked={purchaseHandler}
            >{token ? 'ORDER NOW' : 'LOGIN TO ORDER'}</Button>
        </div>
    );
}

export default OrderBuilder;