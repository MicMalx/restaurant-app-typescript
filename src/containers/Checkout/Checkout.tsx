import React from 'react';
import { Redirect } from 'react-router-dom';

import MealsList from '../../components/MealsList/MealsList';
import ContactData from './ContactData/ContactData';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const Checkout = () => {
    const { meals } = useSelector((state: RootState) => state.orderBuilder);
    const { purchased } = useSelector((state: RootState) => state.orderSender);

    let mealsSummary = <Redirect to="/" />;
    let purchasedRedirect = null;
    if(meals.length && meals.some(meal => meal.amount !== 0)) {
        purchasedRedirect = purchased ? <Redirect to="/" /> : null;
        mealsSummary = (
            <MealsList
                summary={true}
            />
        );
    }
    return (
        <React.Fragment>
            {purchasedRedirect}
            {mealsSummary}
            <ContactData />
        </React.Fragment>
    );
};

export default Checkout;