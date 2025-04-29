'use client'

import { useSelector } from 'react-redux';
import { RootState } from '@/state-management/redux/store';
import '../styles/loader.css';

const Loader = ({loading, children}: {loading?: boolean, children: React.ReactNode}) => {
    const { loading: authLoading } = useSelector((state: RootState) => state.userProfile);
    return(
        <>
            {
                (loading || authLoading) ? 
                <div className='container'>
                <span className="loader"></span>
                </div>
                : 
                children
            }
        </>
    )
}

export default Loader;