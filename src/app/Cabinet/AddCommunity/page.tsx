'use client'

import AddCommunity from "@/components/sheard/AddCommunity/page";
import Image from "next/image";
import image from '../../../../public/add.svg';
import { Flex } from "antd";

export default function AddCommunityPage () {
    return(
        <Flex justify="center" align="center" style={{width: '100%', height: '70vh'}}>
            {typeof window !== 'undefined' && window.innerWidth > 1250 && <Image width={600} height={600} src={image.src} alt="image"/>}
            <AddCommunity/>
        </Flex>
    )
}