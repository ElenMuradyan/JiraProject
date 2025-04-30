'use client'

import Image from "next/image";
import image from '../../../../../public/join.svg';
import { Flex } from "antd";
import JoinCommunity from "@/components/sheard/JoinCommunity/page";

export default function JoinCommunityPage () {
    return(
        <Flex align="center" style={{width: '100%', height: '70vh'}}>
            {window.innerWidth > 1250 && <Image width={600} height={600} src={image.src} alt="image"/>}
            <JoinCommunity/>
        </Flex>
    )
}