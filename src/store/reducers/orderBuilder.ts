import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../axios';

type MealType = 'mainCourse' | 'soups' | 'kidsMenu' | 'desserts';
type MealFromAPI = {
    name: string;
    description: string;
    price: number;
    type: MealType;
};
export type Meal = MealFromAPI & { amount: number };

export type OrderBuilderInitialState = {
    isLoading: boolean;
    meals: Meal[];
    totalPrice: number;
    error: boolean;
}

const initialState: OrderBuilderInitialState = {
    isLoading: false,
    meals: [],
    totalPrice: 0,
    error: false,
};

export const orderBuilderSlice = createSlice({
    name: 'orderBuilder',
    initialState,
    reducers: {
        addMeal: (state, action: PayloadAction<string>) => {
            const mealIndex = state.meals.findIndex(meal => meal.name === action.payload);
            if (mealIndex !== -1) {
                state.meals[mealIndex].amount += 1;
                state.totalPrice += state.meals[mealIndex].price;
            }
        },
        removeMeal: (state, action: PayloadAction<string>) => {
            const mealIndex = state.meals.findIndex(meal => meal.name === action.payload);
            if (mealIndex !== -1 && state.meals[mealIndex].amount > 0) {
                state.meals[mealIndex].amount -= 1;
                state.totalPrice -= state.meals[mealIndex].price;
            }
        },
        resetMealsAfterPurchase: (state) => {
            state.meals = state.meals.map(meal => ({...meal, amount: 0}));
            state.totalPrice = 0;
            state.error = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMeals.pending, (state, _action) => {
                state.isLoading = true;
            })
            .addCase(getMeals.fulfilled, (state, action) => {
                const initialMeals = action.payload.meals.map(meal => ({ ...meal, amount: 0 }));
                state.isLoading = false;
                state.meals = initialMeals;
            })
            .addCase(getMeals.rejected, (state, action) => {
                state.isLoading = false;
                state.error = true;
            })
    },
});

export const getMeals = createAsyncThunk('/orderBuilder/getMeals', async () => {
    const response = await axios.get<{ meals: MealFromAPI[] }>('meals');
    return response.data;
});

export const { addMeal, removeMeal, resetMealsAfterPurchase } = orderBuilderSlice.actions;

export default orderBuilderSlice.reducer;