'use client'

import { Avatar, Dropdown, Typography, Flex, theme } from "antd";
import { userData } from "@/types/userState";
import { useRouter } from "next/navigation";
import { ROUTE_CONSTANTS } from "@/utilis/constants";
import avatar from '../../../../public/avatar.jpg';
import { setFullNameLetter } from "@/utilis/helpers/getLetters";
import { handleLogout } from "@/utilis/helpers/handleLogout";
import '../../../styles/dropDown.css';

const { Text } = Typography;
const { useToken } = theme; 

const AuthProfileDropDown = ({ userProfileInfo }: {userProfileInfo: userData}) => {
    const { push } = useRouter();
    const { token } = useToken();

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
            onClick: handleLogout,
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