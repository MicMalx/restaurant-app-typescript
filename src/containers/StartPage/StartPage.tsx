import { useEffect } from 'react';

import style from './StartPage.module.css';
import Soup from '../../assets/Images/Soup.jpg';
import KidsMenu from '../../assets/Images/KidsMenu.jpg';
import MainCourse from '../../assets/Images/MainCourse.jpg';
import Dessert from '../../assets/Images/Dessert.jpg';

import MealType from '../../components/MealType/MealType';
import { useDispatch, useSelector } from 'react-redux';
import { errorPurchaseReset, purchasedReset } from '../../store/reducers/orderSender';
import { resetMealsAfterPurchase } from '../../store/reducers/orderBuilder';
import { RootState } from '../../store/store';

const StartPage = () => {
    const { purchased } = useSelector((state: RootState) => state.orderSender)
    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            if(purchased)
            {
                dispatch(errorPurchaseReset());
                dispatch(purchasedReset());
                dispatch(resetMealsAfterPurchase());
            }
        }   
    });

    return (
        <div className={style.Container}>
            {purchased ? <h2>Your order has been made successfully.</h2> : null}
            <h1>MENU</h1>
            <MealType imgSrc={Soup} label={"Soups"} url="/soups"/>
            <MealType imgSrc={KidsMenu} label={"Kids Menu"} url="/kidsMenu"/>
            <MealType imgSrc={MainCourse} label={"Main Course"} url="/mainCourse"/>
            <MealType imgSrc={Dessert} label={"Desserts"} url="/desserts"/>
        </div>
    );
}

export default StartPage;
