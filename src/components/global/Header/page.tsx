'use client'

import AuthProfileDropDown from '../../sheard/AuthProfileDropDown';
import { Flex, Button } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '@/state-management/redux/store';
import Link from 'next/link';
import { ROUTE_CONSTANTS } from '@/utilis/constants';
import '../../../styles/header.css';

const Header=()=>{
   const { authUserInfo: {isAuth, userData} } = useSelector((store: RootState) => store.userProfile);

   return(
    <div className="main_header">
       <Flex justify="space-between" align="center">
       <div>
         Logo
       </div>

       <div>
        {
           isAuth && userData ? <AuthProfileDropDown userProfileInfo={userData}/> : <Link href={ROUTE_CONSTANTS.LOGIN}><Button>Sign in</Button></Link>
        }      
       </div>
       </Flex>
    </div>
         );
};

export default Header;