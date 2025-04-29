'use client'

import { db } from "@/services/firebase/firebase";
import { flex, formItemStyle, formStylesForCabinet, inputStyles, iStyle, joinInputStyles } from "@/styles/constants";
import { FIRESTORE_PATH_NAMES, ROUTE_CONSTANTS } from "@/utilis/constants";
import { Button, Flex, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { UserAddOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state-management/redux/store";
import { community } from "@/types/communities";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import image from '../../../../public/avatar.jpg';

import '../../../styles/auth.css';
import { updateUser } from "@/services/firebase/databaseActions";
import { updateCollabs } from "@/utilis/helpers/updatecollabs";
import { useDispatch } from "react-redux";
import { fetchUserProfileInfo } from "@/state-management/redux/slices/userSlice";

export default function JoinCommunity() {
    const { userData } = useSelector((state: RootState) => state.userProfile.authUserInfo);
    const [form] = useForm();
    const dispatch = useDispatch<AppDispatch>();
    const { joinID } = useParams();    
    const [inputValue, setInputValue] = useState(joinID !== "join" ? joinID : "");
    const { push } = useRouter();
    useEffect(() => {
        form.setFieldsValue({ collabId: inputValue });
      }, [inputValue, form]);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    };
    
    const onFinish = async ({ collabId }: { collabId: string }) => {
        if (userData) {
            try {
                await updateUser(userData.uid, {
                    collaborations: [...userData.collaborations, collabId],
                });

                const collabRef = doc(db, FIRESTORE_PATH_NAMES.COLLABORATIONS, collabId);
                const collab = await getDoc(collabRef);
                const { members } = collab.data() as community;
                await updateDoc(collabRef, {
                    members: [...members, 
                        {
                            uid: userData.uid,
                            firstName: userData.firstName,
                            lastName: userData.lastName,
                            imgUrl: userData.imgUrl ? userData.imgUrl : image.src,                    
                        }
                    ],
                });
                await dispatch(fetchUserProfileInfo(userData.uid));
                await updateCollabs(userData.uid, [...userData.collaborations, collabId]);
                push(`${ROUTE_CONSTANTS.COMMUNITY}/${collab.id}`);
                form.setFieldValue('collabId', '');
            } catch (err: any) {
                console.log(err.message);
            }
        }
    };

    return (
        <Form style={formStylesForCabinet} onFinish={onFinish} form={form}>
            <Flex gap={10} style={{width: 400}} vertical> 
            <Form.Item
                style={formItemStyle}
                initialValue={joinID !== 'join' ? String(joinID) : ''}
                name="collabId"
                rules={[
                    { required: true, message: "Please enter a community ID" },
                    {
                        validator: async (_, value) => {
                            if (!value) return Promise.resolve();
                            if (userData && !(userData.collaborations ?? []).includes(value)) {
                                const collabRef = doc(db, FIRESTORE_PATH_NAMES.COLLABORATIONS, value);
                                const collabSnap = await getDoc(collabRef);
                                if (!collabSnap.exists()) {
                                    return Promise.reject(new Error("This Community ID does not exist"));
                                }
                                return Promise.resolve();
                            } else {
                                return Promise.reject(new Error("You are already a member of this Community."));
                            }
                        },
                    },
                ]}
            >
                <Flex gap={10} style={flex}>
                <i className='fas fa-id-badge' style={iStyle}></i>
                <Input
                value={inputValue}
                onChange={handleInputChange} 
                type="text"
                className="focus:outline-none focus:ring-0 border-none shadow-none"
                placeholder="Community ID"
                style={{
                    ...joinInputStyles,
                    boxShadow: "none",
                    border: "none"
                  }}
                onFocus={(e) => {
                    e.target.style.boxShadow = "none";
                    e.target.style.border = "none";
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = "none";
                    e.target.style.border = "none";
                  }}                
                />
                </Flex>
             </Form.Item>
            <Button type="primary" htmlType="submit">
                <UserAddOutlined /> JOIN
            </Button>
            </Flex>
        </Form>
    );
}
