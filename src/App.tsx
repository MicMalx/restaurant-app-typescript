import { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import StartPage from './containers/StartPage/StartPage';
import OrderBuilder from './containers/OrderBuilder/OrderBuilder';
import Checkout from './containers/Checkout/Checkout';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Orders from './containers/Orders/Orders';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { authFromLocalStorage, logout } from './store/reducers/auth';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    const storageToken = localStorage.getItem('token');
    const storageExpirationDate = localStorage.getItem('expirationDate');
    if (!storageToken || !storageExpirationDate) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(storageExpirationDate);
      if (expirationDate <= new Date()) {
          dispatch(logout());
      } else {
          dispatch(authFromLocalStorage(storageToken));
          setTimeout(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('expirationDate');
            localStorage.removeItem('userId');
            dispatch(logout());
          }, expirationDate.getTime() - new Date().getTime());
      }
    }
  }, []);

  let routes = (
    <Switch>
      <Route path="/" exact>
        <StartPage />
      </Route>
      <Route path="/auth">
        <Auth />
      </Route>
      <Route path="/soups">
        <OrderBuilder menuPart={"soups"} />
      </Route>
      <Route path="/kidsMenu">
        <OrderBuilder menuPart={"kidsMenu"} />
      </Route>
      <Route path="/mainCourse">
        <OrderBuilder menuPart={"mainCourse"} />
      </Route>
      <Route path="/desserts">
        <OrderBuilder menuPart={"desserts"} />
      </Route>
      <Route path="/checkout">
        <Checkout />
      </Route>
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  );

  if(token) {
    routes = (
      <Switch>
       <Route path="/" exact>
        <StartPage />
      </Route>
        <Route path="/orders">
          <Orders />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/soups">
          <OrderBuilder menuPart={"soups"} />
        </Route>
        <Route path="/kidsMenu">
          <OrderBuilder menuPart={"kidsMenu"} />
        </Route>
        <Route path="/mainCourse">
          <OrderBuilder menuPart={"mainCourse"} />
        </Route>
        <Route path="/desserts">
          <OrderBuilder menuPart={"desserts"} />
        </Route>
        <Route path="/checkout">
          <Checkout />  
        </Route>
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    );
  }

  return (
    <div className="App">
      <Layout isAuth={!!token}>
        {routes}
      </Layout>
    </div>
  );
}

export default App;