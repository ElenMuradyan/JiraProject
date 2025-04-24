import { configureStore } from "@reduxjs/toolkit";
import userProfileReducer  from '../redux/slices/userSlice';
import userCollabsReducer  from '../redux/slices/collabSlice';

export const store = configureStore({
    reducer: {
        userProfile: userProfileReducer,
        userCollabs: userCollabsReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;