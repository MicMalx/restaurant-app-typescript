import { useDispatch } from 'react-redux';
import { addMeal, removeMeal } from '../../../store/reducers/orderBuilder';

import style from './MealItem.module.css';

type Props = {
    name: string;
    ings: string;
    price: number;
    amount: number;
    summary: boolean;
};

const MealItem = (props: Props) => {
    const dispatch = useDispatch();
    let mealItem = null;
    if (!props.summary) {
        mealItem = (
            <div className={style.MealItems} data-testid="meal-card">
                <div className={style.Name}>{props.name}</div>
                <div className={style.Ings}>{props.ings}</div>
                <div className={style.Price}>{props.price} $</div>
                <div className={style.Buttons}>
                    <button 
                        className={style.Less} 
                        onClick={() => dispatch(removeMeal(props.name))}
                        disabled={props.amount === 0 ? true : false}
                    >Remove</button>
                    <button 
                        className={style.More} 
                        onClick={() => dispatch(addMeal(props.name))}
                    >Add</button>
                </div>
            </div>
        );
    } else if (props.summary && props.amount) {
        mealItem = (
            <div className={style.Summary} data-testid="summary-meal">
                <div className={style.Name}>{props.name}</div>
                <div className={style.Ings}>{props.ings}</div>
                <div className={style.Price}>{props.price} $</div>
                <div className={style.Amount}>x{props.amount}</div>
                <div className={style.Buttons}>
                    <button 
                        className={style.Less} 
                        onClick={() => dispatch(removeMeal(props.name))}
                    >Remove</button>
                    <button 
                        className={style.More} 
                        onClick={() => dispatch(addMeal(props.name))}
                    >Add</button>
                </div>
            </div>
        );
    }
    return mealItem;
}

export default MealItem;