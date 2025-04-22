"use client";

import { store } from '@/state-management/redux/store';
import { Provider } from 'react-redux';
import AuthLoader from './AuthLoader';

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>
            <AuthLoader>
                {children}
            </AuthLoader>
        </Provider>
};