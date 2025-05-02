'use client'

import { AppDispatch, RootState } from "@/state-management/redux/store";
import { flex, formItemStyle, inputStyles, iStyle, joinInputStyles } from "@/styles/constants";
import { Button, Flex, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useSelector } from "react-redux";
import { PlusOutlined } from '@ant-design/icons';
import InviteModal from "../InviteModal/page";
import { handleClose, handleFinishAdding } from "@/features/community/communityHandlers";
import { useDispatch } from "react-redux";
import { userData } from "@/types/userState";

export default function AddCommunity () {
    const [submitting, setSubmitting] = useState(false);
    const { userData } = useSelector((state: RootState) => state.userProfile.authUserInfo);
    const [ form ] = useForm();
    const [ open, setOpen ] = useState<boolean>(false);
    const [ id, setId ] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>();

    return(
        <>
        <InviteModal open={open} onClose={() => handleClose({setId, setOpen, userData: userData as userData, dispatch})} communityId={id}/>
        <Form
        form={form}
        layout="vertical"
        onFinish={(values) => handleFinishAdding({values, setSubmitting, form, setId, setOpen, userData: userData as userData})}
        initialValues={{
            name: '',
            ownerId: '',
            description: '',
        }}
      >
        <h1 className="gradient-text">ADD COMMIUNITY</h1>
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please enter a community name' }]}
          style={formItemStyle}
        >
        <Flex gap={10} style={flex}>
        <i className='fas fa-user' style={iStyle}></i>
        <input 
            type="text" 
            placeholder="Community Name"
            style={inputStyles}
            />
        </Flex>
        </Form.Item>

        <Form.Item
          label=""
          name="ownerId"
          style={formItemStyle}
        >
        <Flex style={flex}>
        <Input
            value={userData?.uid} 
            placeholder="Creator ID"
            disabled
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
  
        <Form.Item 
        name="description"
        rules={[{ required: true, message: 'Please enter a community description' }]}
        >
        <Flex gap={10} style={flex}>
        <i className='fas fa-user' style={iStyle}></i>
        <TextArea style={{width: '100%'}} rows={4}  placeholder="Describe your community" maxLength={200} showCount={true}/>
        </Flex>
        </Form.Item>
    
        <Form.Item>
          <Button disabled={submitting} type="primary" htmlType="submit" loading={submitting}>
            <PlusOutlined/>
            Create Community
          </Button>
        </Form.Item>
      </Form>
        </>
      )
}