import Image from "next/image";
import image from '../../../../../public/Images/join.svg';
import { Flex } from "antd";
import JoinCommunity from "@/components/sheard/JoinCommunity/page";
import { useWindowWidth } from "@/hooks/useWindowWidth";

export default function JoinCommunityPage () {
    const showImage = useWindowWidth();

    return(
        <Flex align="center" style={{width: '100%', height: '70vh'}}>
            {showImage && <Image width={600} height={600} src={image.src} alt="image"/>}
            <JoinCommunity/>
        </Flex>
    )
}