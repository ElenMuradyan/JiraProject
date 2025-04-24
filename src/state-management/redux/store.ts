import { configureStore } from "@reduxjs/toolkit";
import userProfileReducer  from '../redux/slices/userSlice';
import userCollabsReducer  from '../redux/slices/collabSlice';
import issuesReducer  from '../redux/slices/issues';

export const store = configureStore({
    reducer: {
        userProfile: userProfileReducer,
        userCollabs: userCollabsReducer,
        issues: issuesReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;