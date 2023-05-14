import { configureStore } from '@reduxjs/toolkit';
import orderBuilderReducer from './reducers/orderBuilder';
import orderSenderReducer from './reducers/orderSender';
import authReducer from './reducers/auth';

export const store = configureStore({
  reducer: {
    orderBuilder: orderBuilderReducer,
    orderSender: orderSenderReducer,
    auth: authReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch