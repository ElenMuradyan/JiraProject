import { useEffect, useState } from "react";
import { Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { UploadRequestOption } from "rc-upload/lib/interface";
import { RootState, AppDispatch } from "@/state-management/redux/store";
import { fetchUserProfileInfo, setImageUrl } from "@/state-management/redux/slices/userSlice";
import { handleImageUpload } from "@/services/supabase/uploadService";
import { updateUser } from "@/services/firebase/databaseActions";
import { userData } from "@/types/userState";

export function useProfileForm() {
    const [ uploading, setUploading ] = useState(false);
    const [ form ] = Form.useForm();
    const [ buttonLoading, setButtonLoading ] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const { authUserInfo: { userData }} = useSelector((store: RootState) => store.userProfile);

    useEffect(() => {
        if(userData){
            const { uid, ...restData } = userData;
            form.setFieldsValue(restData);
        }
    }, [form, userData]);

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
                await updateUser(userData.uid, sanitizedValues);
                dispatch(fetchUserProfileInfo(userData.uid));
            }catch(err: any){
                console.log(err.message); 
            }finally{
                setButtonLoading(false);
            }    
        }
    };

    const updateUserProfileImg = async (imgUrl: string | null | void) => {
        if(userData){
            try{
                updateUser(userData.uid, { imgUrl: imgUrl ? imgUrl : null });
            }catch(err: any){
                console.log(err.message);
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

    return{
        uploading, buttonLoading, handleEditUserProfile, handleImageUpload, handleRemove, handleUpload, form
    }
}
