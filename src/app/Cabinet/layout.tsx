'use client'

import { Breadcrumb, Layout, Menu, theme } from "antd";
import { ROUTE_CONSTANTS } from "@/utilis/constants";
import { useParams, usePathname, useRouter } from "next/navigation";
const {Sider, Content } = Layout;
import "../../styles/cabinet.css";
import { generateMessagesMenu } from "@/utilis/helpers/generateMessages";
import { useSelector } from "react-redux";
import { RootState } from "@/state-management/redux/store";
import { useEffect, useState } from "react";

const keyCreator = (communityId: string) => {
    const communityMenuItems = [
        {
            label: 'Back to Cabinet',
            key: ROUTE_CONSTANTS.CABINET
        },
        {
            label: 'Overview',
            key: `${ROUTE_CONSTANTS.COMMUNITY}/${communityId}`
        },          
        {
            label: 'Issues',
            key: `${ROUTE_CONSTANTS.COMMUNITY}/${communityId}/${ROUTE_CONSTANTS.ISSUES}`
        },
        {
            label: 'Members',
            key: `${ROUTE_CONSTANTS.COMMUNITY}/${communityId}/${ROUTE_CONSTANTS.MEMBERS}`
        },
        {
            label: 'Messages',
            key: `${ROUTE_CONSTANTS.COMMUNITY}/${communityId}/${ROUTE_CONSTANTS.MESSAGES}`
        },
        ]
    return communityMenuItems;    
}

const defaultMenuItems = [
    {
        label: 'Personal Information',
        key: ROUTE_CONSTANTS.PROFILE
    },
    {
        label: 'Cabinet',
        key: ROUTE_CONSTANTS.CABINET
    },
    {
        label: '+ Add Community',
        key: ROUTE_CONSTANTS.ADDCOMMUNITY
    },
    {
        label: '+ Join Community',
        key: `${ROUTE_CONSTANTS.JOINCOMMUNITY}/join`
    }
];

const CabinetLayout = ({children}: {children: React.ReactNode}) => {
    const {push} = useRouter();
    const pathname = usePathname();
    const { communityId, chatId } = useParams();
    const [menuItems, setMenuItems] = useState<{ label: string; key: string }[]>(defaultMenuItems);
    const { userData } = useSelector((state: RootState) => state.userProfile.authUserInfo);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleNavigate = ({ key }: { key: string }) => {
        push(key);
    };

    useEffect(() => {
        const loadMenuItems = async () => {
          try {                
            if (communityId) {
              if (userData?.messages && pathname.includes(ROUTE_CONSTANTS.MESSAGES)) {
                const generated = await generateMessagesMenu({
                  chatIds: userData.messages,
                  uid: userData.uid,
                  communityId: communityId as string,
                });
                
                setMenuItems(generated);
              } else {
                setMenuItems(keyCreator(communityId as string));
              }
            } else {
              setMenuItems(defaultMenuItems);
            }
          } catch (error) {
            console.error('Failed to load menu:', error);
          } 
        };
    
        loadMenuItems();
      }, [communityId, chatId, userData, pathname]);
    
   return(
    <div className="cabinet_layout_main_container">
            <Sider width={200} style={{backgroundColor:colorBgContainer}} collapsible>
                <Menu
                mode="inline"
                items={menuItems}
                selectedKeys={[pathname]}
                onSelect={handleNavigate}
                />
            </Sider>
            <Layout style={{padding:'0 24px 24px'}}>
                <Breadcrumb
                 style={{ margin: '16px 0'}}
                />
                    <Content style={{
                    padding:24,
                    margin:2,
                    minHeight:300,
                    backgroundColor:colorBgContainer,
                    borderRadius:borderRadiusLG
                }}>
                    {children}
                </Content>
            </Layout>
    </div>
   )
};

export default CabinetLayout;