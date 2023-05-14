import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { logout } from '../../../store/reducers/auth';

const Logout = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('userId');
        dispatch(logout());
    }, []);

    return <Redirect to="/" />;
};

export default Logout;