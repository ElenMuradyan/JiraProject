import { Flex } from "antd";
import AddCommunity from "../AddCommunity/page";
import JoinCommunity from "../JoinCommunity/page";
import image from '../../../../public/not_found.svg';
import Image from "next/image";
import '../../../styles/auth.css';

export default function NoCommunity () {
    return(
        <Flex>
            <Image width={600} src={image.src} alt="image" height={600}/>

        <Flex vertical gap={5}>
            <h1 className="styled-heading">SEEMS LIKE YOU DON'T HAVE ANY COMMUNITIES</h1>
            <JoinCommunity/>
        <hr/>
            <h2 className="styled-heading">Or create your own Community</h2>
            <AddCommunity />
        </Flex>
        </Flex>
    )
}