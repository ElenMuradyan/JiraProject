'use client'
import { useEffect, useState } from 'react';
import { Form, Input, Button, notification, message } from 'antd';
import { updateDoc, doc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '@/types/userState';
import { FIRESTORE_PATH_NAMES } from '@/utilis/constants';
import { db } from '@/services/firebase/firebase';
import { AppDispatch, RootState } from '@/state-management/redux/store';
import { fetchUserProfileInfo, setImageUrl } from '@/state-management/redux/slices/userSlice';
import ImgUpload from '@/components/sheard/ImgUpload';
import { UploadRequestOption } from 'rc-upload/lib/interface';
import { handleImageUpload } from '@/features/ImageUpload/imageUpload';
import '../../../styles/profile.css';

const Profile = () => {
    const [ uploading, setUploading ] = useState(false);
    const { authUserInfo: { userData }} = useSelector((store: RootState) => store.userProfile);
    const [ form ] = Form.useForm();
    const [ buttonLoading, setButtonLoading ] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const handleEditUserProfile = async (values: userData) => {
        if(userData){
            setButtonLoading(true);

            const sanitizedValues = {
                ...values,
                firstName: values.firstName.trim(),
                lastName: values.lastName.trim(),
                phoneNumber: values.phone?.trim() || "",
              };

            try{
                const userDocRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, userData.uid);
                await updateDoc(userDocRef, sanitizedValues);
                dispatch(fetchUserProfileInfo());
                notification.success({
                    message:'user data successfully updated'
                })
            }catch(err: any){
                console.log(err.message); 
            }finally{
                setButtonLoading(false)
            }    
        }
    };

    const updateUserProfileImg = async (imgUrl: string | null | void) => {
        if(userData){
            try{
                const userDocRef = doc ( db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, userData.uid);
                await updateDoc(userDocRef, { imgUrl: imgUrl ? imgUrl : null });
            }catch{
                notification.error({
                    message:'Error:('
                })
            }    
        }
    };

    const handleUpload = async (options: UploadRequestOption) => {
        try {
            if(handleImageUpload){
                setUploading(true);
                const imageUrl = await handleImageUpload(options); 
                dispatch(setImageUrl(imageUrl));
                await updateUserProfileImg(imageUrl);
            }
        } catch {
            console.log('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = async () => {
        try{
            dispatch(setImageUrl(null));
            updateUserProfileImg(null);            
        }catch{
            console.log('Error while removing the image');
        }
    }
        
    useEffect(() => {
        if(userData){
            const { uid, ...restData } = userData;
            form.setFieldsValue(restData);
        }
    }, [form, userData]);

    return (
        <div className='form_page_container'>
            <hr/>
            <Form layout='vertical' form={form} onFinish={handleEditUserProfile}>
                <Form.Item
                label='Profile Image'
                >
                    <ImgUpload
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
        </div>
    )
};

export default Profile;