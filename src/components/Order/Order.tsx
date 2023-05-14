import style from './Order.module.css';

type Props = {
    meals: {
        amount: number;
        id: string;
        name: string;
    }[];
    price: number;
};

const Order = (props: Props) => {
    const mealOutput = props.meals.map(meal => (
        <span
            style={{
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid gray',
                padding: '5px'
            }}
            key={meal.name}
        >{meal.name}({meal.amount})</span>
    ));

    return(
        <div className={style.Order}>
            <p>Meals: {mealOutput}</p>
            <p>Price: <strong>{props.price.toFixed(2)} $</strong></p>
        </div>
    );
};

export default Order;