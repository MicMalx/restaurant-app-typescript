import style from './MealsList.module.css';
import MealItem from './MealItem/MealItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { MenuPart } from '../../containers/OrderBuilder/OrderBuilder';

type Props = {
    summary: boolean;
    menuPart?: MenuPart;
};

const MealsList = (props: Props) => {
    const { meals, totalPrice } = useSelector((state: RootState) => state.orderBuilder);
    return (
        <div className={style.MealsList}>
            {props.summary ? <div className={style.OrderSummary}>Order Summary</div> : null}
            {meals.map((meal) => {
                if (meal.type === props.menuPart || props.summary) {
                    return (
                        <MealItem 
                            key={meal.name}
                            name={meal.name}
                            ings={meal.description}
                            price={meal.price}
                            amount={meal.amount}
                            summary={props.summary}
                        />   
                    );
                } else {
                    return null;
                }
            })}
            {props.summary ? <div className={style.TotalPrice}>Total Price: {totalPrice!.toFixed(1)} $</div> : null}
        </div>
    );
}

export default MealsList;