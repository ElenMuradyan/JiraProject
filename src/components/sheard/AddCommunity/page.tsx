'use client'

import { db } from "@/services/firebase/firebase";
import { AppDispatch, RootState } from "@/state-management/redux/store";
import { flex, formItemStyle, formStyles, inputStyles, iStyle, joinInputStyles } from "@/styles/constants";
import { community } from "@/types/communities";
import { FIRESTORE_PATH_NAMES } from "@/utilis/constants";
import { Button, Flex, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined } from '@ant-design/icons';
import InviteModal from "../InviteModal/page";
import { fetchUserProfileInfo } from "@/state-management/redux/slices/userSlice";
import image from '../../../../public/avatar.jpg';
import { updateUser } from "@/services/firebase/databaseActions";
import { updateCollabs } from "@/utilis/helpers/updatecollabs";

export default function AddCommunity () {
    const [submitting, setSubmitting] = useState(false);
    const { userData } = useSelector((state: RootState) => state.userProfile.authUserInfo);
    const [ form ] = useForm();
    const [ open, setOpen ] = useState<boolean>(false);
    const [ id, setId ] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>();

    const handleFinish = async (values: community) => {
        if(userData){
            try{
                setSubmitting(true);
                const community = {
                    name: values.name,
                    ownerId: userData.uid,
                    description: values.description,
                    members: [{
                        uid: userData.uid,
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        imgUrl: userData.imgUrl ? userData.imgUrl : image.src,                    
                    }],
                    id: ''
                };
                
                const communityRef = collection(db, FIRESTORE_PATH_NAMES.COLLABORATIONS);
                const data = await addDoc(communityRef, community);
                const ref = doc(db, FIRESTORE_PATH_NAMES.COLLABORATIONS, data.id);
                await updateDoc(ref, {id: data.id});  

                await updateUser(userData.uid, {
                    collaborations: [...userData.collaborations, data.id]
                });
                form.resetFields();  
                setId(data.id);
                setOpen(true);  
                await dispatch(fetchUserProfileInfo(userData.uid)); 
                await updateCollabs(userData.uid, [...userData.collaborations, data.id]);
                return data.id;    
            }catch(err: any){                
                console.log(err.message);  
            }finally{
                setSubmitting(false);
            }
        }
    };

    const handleClose = () => {
        setOpen(false);
        setId('');
    }

    return(
        <>
        <InviteModal open={open} onClose={handleClose} communityId={id}/>
        <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        style={formStyles}
        initialValues={{
            name: '',
            ownerId: '',
            description: '',
        }}
      >
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