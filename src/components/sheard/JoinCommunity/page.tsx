'use client'

import { db } from "@/services/firebase/firebase";
import { flex, formItemStyle, formStyles, iStyle, joinInputStyles } from "@/styles/constants";
import { FIRESTORE_PATH_NAMES } from "@/utilis/constants";
import { Button, Flex, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { doc, getDoc } from "firebase/firestore";
import { UserAddOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state-management/redux/store";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { onFinish } from "@/features/community/communityHandlers";

import '../../../styles/auth.css';
import { useDispatch } from "react-redux";
import { userData } from "@/types/userState";

export default function JoinCommunity() {
    const { userData } = useSelector((state: RootState) => state.userProfile.authUserInfo);
    const [form] = useForm();
    const { joinID } = useParams();    
    const [inputValue, setInputValue] = useState(joinID !== "join" ? joinID : "");
    const { push } = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        form.setFieldsValue({ collabId: inputValue });
      }, [inputValue, form]);
    
    return (
        <Form style={formStyles} onFinish={({collabId}) => onFinish({collabId, form, userData: userData as userData, dispatch, push})} form={form}>
            <h1 className="gradient-text">JOIN COMMUNITY</h1>
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
                onChange={(e) => setInputValue(e.target.value)} 
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
