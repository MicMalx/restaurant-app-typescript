import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../axios';

type InitialState = {
    token: null | string,
    userId: null | string,
    error: boolean;
    isLoading: boolean,
    authRedirectPath: string;
}

const initialState: InitialState = {
    token: null,
    userId: null,
    error: false,
    isLoading: false,
    authRedirectPath: '/',
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        authFromLocalStorage: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        logout: (state) => {
            state.token = null;
            state.userId = null;
        },
        setAuthRedirectPath: (state, action: PayloadAction<string>) => {
            state.authRedirectPath = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(auth.pending, (state, _action) => {
                state.isLoading = true;
            })
            .addCase(auth.fulfilled, (state, action) => {
                const { userId, token } = action.payload;
                state.isLoading = false;
                state.userId = userId;
                state.token = token;
            })
            .addCase(auth.rejected, (state, _action) => {
                state.isLoading = false;
                state.error = true;
            })
    },
})

type AuthParams = {
    email: string;
    password: string;
    isLogin: boolean;
}
export const auth = createAsyncThunk('auth/auth', async ({email, password, isLogin}: AuthParams, thunkAPI) => {
    const authData = { email, password };
    let url = '/users/login';
    if(!isLogin) {
        url = '/users/signup';
    }
    try {
        const response = await axios.post<{userId: string, email: string, token: string, expiresIn: number}>(url, authData);

        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('expirationDate', expirationDate.toString());
        localStorage.setItem('userId', response.data.userId);

        setTimeout(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('expirationDate');
            localStorage.removeItem('userId');
            thunkAPI.dispatch(logout());
        }, expirationDate.getTime() / 1000);

        return response.data;
    } catch (err) {
        if (isLogin) throw new Error('Failed to log in');
        throw new Error('Failed to sing up');
    }
});

export const { authFromLocalStorage, logout, setAuthRedirectPath } = authSlice.actions;

export default authSlice.reducer;