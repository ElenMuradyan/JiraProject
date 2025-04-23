'use client'

import { Avatar, Dropdown, Typography, Flex, theme } from "antd";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { userData } from "@/types/userState";
import { auth } from "@/services/firebase/firebase";
import { setIsAuth } from "@/state-management/redux/slices/userSlice";
import { AppDispatch } from "@/state-management/redux/store";
import { useRouter } from "next/navigation";
import { ROUTE_CONSTANTS } from "@/utilis/constants";
import avatar from '../../../../public/undraw_web-devices_i15y.svg';
import '../../../styles/dropDown.css';

const { Text } = Typography;
const { useToken } = theme; 

const AuthProfileDropDown = ({ userProfileInfo }: {userProfileInfo: userData}) => {
    const dispatch = useDispatch<AppDispatch>();
    const { push } = useRouter();
    const { token } = useToken();

    const setFullNameLetter = ({ firstName, lastName }: Record<string, string>) => {
        if (firstName && lastName){
            return `${firstName[0]} ${lastName[0]}`;
        };
        return '-';
    }

    const handleSignOut = async () => {
        try{
            await signOut(auth);
            dispatch(setIsAuth(false));
        }catch(error){
            console.log(error);
        }
    };

    
    const items = [
        {
            label: 'Profile',
            key:'0',
            onClick:() => push(ROUTE_CONSTANTS.PROFILE),
        },
        {
            label: 'Cabinet',
            key:'1',
            onClick:() => push(ROUTE_CONSTANTS.CABINET),
        },
        {
            label: 'Logout',
            key:'logout',
            onClick:handleSignOut,
        }
    ]
    return (
        <Dropdown 
        menu={{ items }} 
        trigger={['click']}
        dropdownRender={(menu) => {
            return(
                <div style={{
                    borderRadius: token.borderRadiusLG,
                    backgroundColor: token.colorBgElevated,
                    boxShadow: token.boxShadowSecondary,
                  }}>
                    <Flex vertical align="center" style={{padding:token.sizeMS}} className="profile_dropdown_container">
                        <Avatar src={userProfileInfo.imgUrl ? userProfileInfo.imgUrl : avatar.src}></Avatar>
                        <Text>{userProfileInfo.firstName} {userProfileInfo.lastName}</Text>
                        <Text type="secondary" underline>{userProfileInfo.email}</Text>
                    </Flex>
                    {menu}
                </div>
            )
        }}
        >
            <Avatar size={"large"} className="user_profile_avatar">
                { setFullNameLetter({firstName: userProfileInfo.firstName, lastName: userProfileInfo.lastName}) }
            </Avatar>
        </Dropdown>
    );
};
export default AuthProfileDropDown;