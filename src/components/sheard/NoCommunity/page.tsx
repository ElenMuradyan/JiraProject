import { Flex } from "antd";
import AddCommunity from "../AddCommunity/page";
import JoinCommunity from "../JoinCommunity/page";
import image from '../../../../public/Images/not_found.svg';
import Image from "next/image";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import '../../../styles/auth.css';

export default function NoCommunity() {
    return (
        <Flex align="center" justify="center" vertical gap={16} style={{ width: '100%', height: '70vh' }}>
        {useWindowWidth() && <Image width={600} height={600} src={image.src} alt="image"/>}
        <Flex align="center" justify="center" vertical gap={16} style={{ maxWidth: 400, zIndex: 0 }}>
            <h1 className="styled-heading">SEEMS LIKE YOU DON'T HAVE ANY COMMUNITIES</h1>
            <JoinCommunity />
            <hr />
            <h2 className="styled-heading">Or create your own Community</h2>
            <AddCommunity />
        </Flex>
        </Flex>
    );
}
