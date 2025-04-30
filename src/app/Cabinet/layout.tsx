'use client'

import { Layout, Menu, theme } from "antd";
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
    const [collapsed, setCollapsed] = useState(true);
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
    <Layout hasSider style={{ minHeight: "calc(100vh - 72px)", width: "100%" }}>
        <Sider
            breakpoint="md"
            collapsedWidth="0"
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            style={{ backgroundColor: colorBgContainer, zIndex:2000 }}
        >
            <Menu
                mode="inline"
                items={menuItems}
                selectedKeys={[pathname]}
                onSelect={handleNavigate}
            />
        </Sider>
        <Layout style={{ padding: "0 16px 16px", flex: 1, position: "relative" }}>
                    {!collapsed && window.innerWidth < 800 && (
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: "rgba(48, 48, 48, 0.3)", 
                                zIndex: 1000,
                                pointerEvents: "auto", 
                            }}
                            onClick={() => setCollapsed(true)} 
                        />
                    )}
            <Content
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 300,
                    backgroundColor: colorBgContainer,
                    borderRadius: borderRadiusLG,
                    minWidth: 0, 
                    overflow: 'auto'
                }}
            >
                {children}
            </Content>
        </Layout>
    </Layout>
</div>
)
};

export default CabinetLayout;