'use client'

import { Breadcrumb, Layout, Menu, theme } from "antd";
import { ROUTE_CONSTANTS } from "@/utilis/constants";
import "../../styles/cabinet.css";
import { usePathname, useRouter } from "next/navigation";
const {Sider, Content } = Layout;

const menuItems = [
    {
        label: 'Personal Information',
        key: ROUTE_CONSTANTS.PROFILE
    },
    {
        label: 'Cabinet',
        key: ROUTE_CONSTANTS.CABINET
    }
]

const CabinetLayout = ({children}: {children: React.ReactNode}) => {
    const {push} = useRouter();
    const pathname = usePathname();

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
                items={menuItems}
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