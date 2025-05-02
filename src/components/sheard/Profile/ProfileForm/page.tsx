'use client'

import { Button, Form, Input } from "antd";
import ProfileImageUpload from "../ProfileImageUpload/page";
import { useProfileForm } from "@/hooks/useProfileForm";

export default function ProfileForm () {
    const { form, handleEditUserProfile, handleRemove, uploading, handleUpload, buttonLoading} = useProfileForm();

    return(
        <Form layout='vertical' form={form} onFinish={handleEditUserProfile}>
        <Form.Item
        label='Profile Image'
        >
            <ProfileImageUpload
            handleRemove={handleRemove}
            uploading={uploading} 
            handleUpload={handleUpload}
            />
        </Form.Item>
        <Form.Item
        label="First Name"
        name='firstName'
        rules={[{
            required:true,
            message:'Please input your First Name'
        }]}
        >
            <Input
                placeholder='First Name'
            />
        </Form.Item>

        <Form.Item
        label="Last Name"
        name='lastName'
        rules={[{
            required:true,
            message:'Please input your Last Name'
        }]}
        >
            <Input
                placeholder='Last Name'
            />
        </Form.Item>

        <Form.Item
        label="Email"
        name='email'
        >
            <Input
                readOnly
                placeholder='Email'
            />
        </Form.Item>

        <Form.Item
        label="Phone Number"
        name='phone'
        rules={[{
            required:true,
            message:'Please input your Phone Number'
        }]}
        >
            <Input
                placeholder='Phone Number'
            />
        </Form.Item>

        <Button type='primary' htmlType='submit' loading={buttonLoading}>
            Submit
        </Button>
    </Form>    
    )
}