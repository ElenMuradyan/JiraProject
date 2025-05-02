import AddCommunity from "@/components/sheard/AddCommunity/page";
import Image from "next/image";
import image from '../../../../public/Images/add.svg';
import { Flex } from "antd";
import { useWindowWidth } from "@/hooks/useWindowWidth";

export default function AddCommunityPage () {
    const showImage = useWindowWidth();

    return(
        <Flex justify="center" align="center" style={{width: '100%', height: '70vh'}}>
            {showImage && <Image width={600} height={600} src={image.src} alt="image"/>}
            <AddCommunity/>
        </Flex>
    )
}