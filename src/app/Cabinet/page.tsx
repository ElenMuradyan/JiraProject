'use client'

import Community from "@/components/sheard/Community/page";
import NoCommunity from "@/components/sheard/NoCommunity/page";
import { fetchUserCollabs } from "@/state-management/redux/slices/collabsSlice";
import { AppDispatch, RootState } from "@/state-management/redux/store"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

export default function Cabinet () {
    const { userData } = useSelector((state: RootState) => state.userProfile.authUserInfo);
    const { collabs } = useSelector((state: RootState) => state.userCollabs);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if(userData){
            dispatch(fetchUserCollabs(userData.collaborations));
        }
    }, [userData]);    

    return(
        <>
        {
            (collabs.length === 0) ?  
            <NoCommunity />
            :
            <div className="collabs">
            {collabs.map((item, key) => <Community community={item} key={key}/>)}
            </div>
        }
        </>
    )
}