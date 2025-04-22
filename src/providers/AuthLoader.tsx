'use client'

import { fetchUserProfileInfo } from "@/state-management/redux/slices/userSlice";
import { AppDispatch } from "@/state-management/redux/store"
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AuthLoader({children}: {children: React.ReactNode}) {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchUserProfileInfo());
    }, [])

    return(
        <>{children}</>
    )
};