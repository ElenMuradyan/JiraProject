'use client'

import { fetchUserProfileInfo } from "@/state-management/redux/slices/userSlice";
import { AppDispatch, RootState } from "@/state-management/redux/store"
import { getIsAuth } from "@/utilis/helpers/getIsAuth";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function AuthLoader({children}: {children: React.ReactNode}) {
    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector((state: RootState) => state.userProfile);
    const [ isAuth, setIsAuth ] = useState<boolean | undefined>(false);
    const [ uid, setUid ] = useState<string>('');

    useEffect(() => {        
        const getIsAuthenticated = async function () {
            const { isAuth, uid } = await getIsAuth();            
            if(isAuth){
                setIsAuth(true);
                setUid(uid);
            }else{
                setIsAuth(false);
                setUid('');
            }
        };

        getIsAuthenticated();
    }, []);

    useEffect(() => {        
        if(isAuth && uid){
            dispatch(fetchUserProfileInfo(uid));
        }
    }, [isAuth, uid])

    return(
        <>{children}</>
    )
};