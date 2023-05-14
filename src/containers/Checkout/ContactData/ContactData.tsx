import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

import style from './ContactData.module.css'

import { checkValidity } from '../../../shared/validation';
import Input from '../../../components/UI/Input/Input';
import Select from '../../../components/UI/Select/Select';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { OrderData, errorPurchaseReset } from '../../../store/reducers/orderSender';
import { sendOrder } from '../../../store/reducers/orderSender';

const ContactData = () => {
    const [orderFormSelect, setOrderFormSelect] = useState({
        options: [
            {value: 'cash', displayValue: 'Cash'},
            {value: 'card', displayValue: 'Card'},
        ],
        value: 'cash',
    });
    const [orderForm, setOrderForm] = useState({
        name: {
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name',
            },
            value: '',
            validation: {
                required: true,
                minLength: 0,
                maxLength: 0,
                isNumeric: false,
                isEmail: false,
            },
            valid: false,
            touched: false,
        },
        address: {
            elementConfig: {
                type: 'text',
                placeholder: 'Address',
            },
            value: '',
            validation: {
                required: true,
                minLength: 0,
                maxLength: 0,
                isNumeric: false,
                isEmail: false,
            },
            valid: false,
            touched: false,
        },
        phoneNumber: {
            elementConfig: {
                type: 'text',
                placeholder: 'Your Phone Number',
            },
            value: '',
            validation: {
                required: true,
                minLength: 7,
                maxLength: 9,
                isNumeric: true,
                isEmail: false,
            },
            valid: false,
            touched: false,
        },
    });

    const [formIsValid, setFormIsValid] = useState(false);
    const { meals, totalPrice } = useSelector((state: RootState) => state.orderBuilder);
    const { isLoading, error } = useSelector((state: RootState) => state.orderSender);
    const { token } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        return () => {
            dispatch(errorPurchaseReset());
        };
    }, []);

    const selectChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        const updatedFormSelect = {...orderFormSelect};
        updatedFormSelect.value = event.target.value;
        setOrderFormSelect(updatedFormSelect);
    }

    const inputChangedHandler = (event: ChangeEvent<HTMLInputElement>, inputIdentifier: keyof typeof orderForm) => {
        const updatedOrderForm = {
            ...orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier as keyof typeof updatedOrderForm].valid && formIsValid;
        }

        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid);
    }

    const orderHandler = (event: FormEvent) => {
        event.preventDefault();

        const formData: Record<string, any> = {}
        for(let formElementIdentfier in orderForm) {
            formData[formElementIdentfier] = orderForm[formElementIdentfier as keyof typeof orderForm].value;
        }
        formData.paymentMethod = orderFormSelect.value;
        const order = {
            meals: meals.map(meal => ({
                name: meal.name,
                amount: meal.amount,
            })).filter(meal => meal.amount > 0),
            price: totalPrice,
            orderData: formData as OrderData,
            token: token as string,
        };
        dispatch(sendOrder(order));
    }

    const formElementsArray = [];
    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key as keyof typeof orderForm],
        })
    }

    let form = (
        <form onSubmit={orderHandler}>
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    elementConfig={formElement.config.elementConfig}
                    touched={formElement.config.touched}
                    changed={(event: ChangeEvent<HTMLInputElement>) => inputChangedHandler(event, formElement.id as keyof typeof orderForm)}
                />
            ))}
            <Select
                changed={selectChangeHandler}
                value={orderFormSelect.value}
                options={orderFormSelect.options}
            />
            <Button 
                btnType="Success"
                disabled={!formIsValid}    
            >ORDER</Button>
        </form>
    );
    if (isLoading) {
        form = <Spinner />;
    }

    return (
        <div className={style.ContactData}>
            {error ? <h3 style={{color: "red"}}>Something went wrong! Try again later</h3> : null}
            <h4>Enter your delivery data</h4>
            {form}
        </div>
    );
};

export default ContactData;