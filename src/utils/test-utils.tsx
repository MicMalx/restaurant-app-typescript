import React from 'react'
import { render } from '@testing-library/react'
import { Reducer, configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import orderSenderReducer, { OrderSenderInitialState } from '../store/reducers/orderSender';
import orderBuilderReducer, { OrderBuilderInitialState } from '../store/reducers/orderBuilder'
import authReducer, { AuthInitialState } from '../store/reducers/auth'

type PreloadedState = {
    auth?: AuthInitialState,
    orderSender?: OrderSenderInitialState,
    orderBuilder?: OrderBuilderInitialState
}

const createReducer = (stores: Array<keyof PreloadedState>) => {
    const reducer: { [Property in keyof PreloadedState]?: Reducer } = {};
    for (const store of stores) {
        switch(store) {
            case 'auth':
                reducer.auth = authReducer;
                break;
            case 'orderSender':
                reducer.orderSender = orderSenderReducer;
                break;
            case 'orderBuilder':
                reducer.orderBuilder = orderBuilderReducer;
                break;
        }
    }

    return reducer;
};


export const renderWithStore = (ui: React.ReactElement, stores: Array<keyof PreloadedState>, preloadedState?: PreloadedState) => {
    const reducer = createReducer(stores);
    const store = configureStore({
        reducer: reducer,
        preloadedState
    });

    return render(
        <Provider store={store}>
            {ui}
        </Provider>
    );
};
