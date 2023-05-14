import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

type InitialState = {
    isLoading: boolean;
    purchased: boolean;
    error: boolean;
}

const initialState: InitialState = {
    isLoading: false,
    purchased: false,
    error: false,
};

export const orderSenderSlice = createSlice({
    name: 'orderSender',
    initialState,
    reducers: {
        errorPurchaseReset: (state) => {
            state.error = false;
        },
        purchasedReset: (state) => {
            state.purchased = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendOrder.pending, (state, _action) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(sendOrder.fulfilled, (state, _action) => {
                state.isLoading = false;
                state.error = false
                state.purchased = true;
            })
            .addCase(sendOrder.rejected, (state, _action) => {
                state.isLoading = false;
                state.error = true;
            })
    },
});

type Meal = {
    name: string;
    amount: number;
};
type Order = {
    price: number;
    meals: Meal[];
    purchaserId: string;
} &  OrderData;

export type OrderData = {
    name: string;
    address: string;
    phoneNumber: string;
    paymentMethod: string;
};

type RequestData = {
    orderData: OrderData;
    price: number;
    meals: Meal[];
    token: string;
};

export const sendOrder = createAsyncThunk('orderSender/sendOrder', async (requestData: RequestData) => {
    const orderData = {
        name: requestData.orderData.name,
        address: requestData.orderData.address,
        phoneNumber: requestData.orderData.phoneNumber,
        paymentMethod: requestData.orderData.paymentMethod,
        price: requestData.price,
        meals: requestData.meals,
    };

    const response = await axios.post<{ order: Order }>('/orders/create', orderData, {
        headers: {
            Authorization: 'Bearer ' + requestData.token,
        },
    });
    return response.data;
});

export const { errorPurchaseReset, purchasedReset } = orderSenderSlice.actions;

export default orderSenderSlice.reducer;