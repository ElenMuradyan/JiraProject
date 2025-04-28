'use client'

import { fetchUserProfileInfo } from "@/state-management/redux/slices/userSlice";
import { AppDispatch } from "@/state-management/redux/store"
import { getIsAuth } from "@/utilis/helpers/getIsAuth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function AuthLoader({children}: {children: React.ReactNode}) {
    const dispatch = useDispatch<AppDispatch>();
    const [ isAuth, setIsAuth ] = useState<boolean | undefined>(false);

    useEffect(() => {
        const getIsAuthenticated = async function () {
            const { isAuth } = await getIsAuth();
            if(isAuth){
                setIsAuth(true);
            }else{
                setIsAuth(false);
            }
        };

        getIsAuthenticated();
    }, []);

    useEffect(() => {
        if(isAuth){
            dispatch(fetchUserProfileInfo());
        }
    }, [isAuth])

    return(
        <>{children}</>
    )
};