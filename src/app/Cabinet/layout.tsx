'use client'

import { Breadcrumb, Layout, Menu, theme } from "antd";
import { ROUTE_CONSTANTS } from "@/utilis/constants";
import { useParams, usePathname, useRouter } from "next/navigation";
const {Sider, Content } = Layout;
import "../../styles/cabinet.css";

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
        ]
    return communityMenuItems;    
}

const menuItems = [
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
        key: ROUTE_CONSTANTS.JOINCOMMUNITY
    }
];

const CabinetLayout = ({children}: {children: React.ReactNode}) => {
    const {push} = useRouter();
    const pathname = usePathname();
    const { communityId } = useParams();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleNavigate = ({ key }: { key: string }) => {
        push(key);
    };

   return(
    <div className="cabinet_layout_main_container">
            <Sider width={200} style={{backgroundColor:colorBgContainer}} collapsible>
                <Menu
                mode="inline"
                items={communityId ? keyCreator(communityId as string) : menuItems}
                selectedKeys={[pathname]}
                onSelect={handleNavigate}
                />
            </Sider>
            <Layout style={{padding:'0 24px 24px'}}>
                <Breadcrumb
                 items={[{ title: 'Cabinet' },{ title: 'Profile' }]}
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