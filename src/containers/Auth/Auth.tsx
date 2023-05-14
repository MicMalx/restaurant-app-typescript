import { useState, useEffect, ReactNode, ChangeEvent } from 'react';
import { Redirect } from 'react-router-dom'

import style from './Auth.module.css'

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import { checkValidity } from '../../shared/validation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { auth, setAuthRedirectPath } from '../../store/reducers/auth';

const Auth = () => {
    const [controls, setControls] = useState({
        email: {
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Adress',
            },
            value: '',
            validation: {
                required: true,
                minLength: 0,
                maxLength: 0,
                isNumeric: false,
                isEmail: true,
            },
            valid: false,
            touched: false,
        },
        password: {
            elementConfig: {
                type: 'password',
                placeholder: 'Password',
            },
            value: '',
            validation: {
                required: true,
                minLength: 6,
                maxLength: 0,
                isNumeric: false,
                isEmail: false,
            },
            valid: false,
            touched: false,
        },
    });
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const dispatch = useDispatch<AppDispatch>();
    const { token, isLoading, error, authRedirectPath } = useSelector((state: RootState) => state.auth);
    const { meals } = useSelector((state: RootState) => state.orderBuilder);

    useEffect(() => {
        const isBuildingOrder = meals.some(meal => meal.amount !== 0);
        if(!isBuildingOrder && authRedirectPath !== '/') {
            dispatch(setAuthRedirectPath('/'));
        }
    }, []);

    const inputChangedHandler = (event: ChangeEvent<HTMLInputElement>, controlName: keyof typeof controls) => {
        const updatedControls = {
            ...controls,
            [controlName]: {
                ...controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            }
        };
        setControls(updatedControls);
    }

    const submitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();
        dispatch(auth({ email: controls.email.value, password: controls.password.value, isLogin }));
    };

    const switchAuthModeHandler = () => {
        setIsLogin(!isLogin);
    }

    const formElementsArray = [];
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key as keyof typeof controls]
        })
    }

    let form: ReactNode = formElementsArray.map(formElement => (
        <Input
            key={formElement.id}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            changed={(event: ChangeEvent<HTMLInputElement>) => inputChangedHandler(event, formElement.id as keyof typeof controls)}
        />
    ));

    if (isLoading) {
        form = <Spinner />;
    };

    let errorMessage = null;

    if (error) {
        errorMessage = (
            <p>{'Error'}</p>
        );
    }

    let authRedirect = null;
    if(token) {
        authRedirect = <Redirect to={authRedirectPath} />;
    }
    
    return (
        <div className={style.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Submit">{isLogin ? 'LOGIN' : 'SIGNUP'}</Button>
            </form>
            <Button 
                clicked={switchAuthModeHandler}
                btnType="Success">SWITCH TO {isLogin ? 'SIGNUP' : 'LOGIN'}</Button>
        </div>
    );
};

export default Auth;