import { updateUser } from "@/services/firebase/databaseActions";
import { db } from "@/services/firebase/firebase";
import { AppDispatch, RootState } from "@/state-management/redux/store";
import { community } from "@/types/communities";
import { FIRESTORE_PATH_NAMES, ROUTE_CONSTANTS } from "@/utilis/constants";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import image from '../../../public/Images/avatar.jpg';
import { fetchUserProfileInfo } from "@/state-management/redux/slices/userSlice";
import { updateCollabs } from "@/utilis/helpers/updatecollabs";
import { useRouter } from "next/navigation";
import { HandleCloseParams, HandleFinishAddingParams, OnFinishParams } from "@/types/addCommunityHandlers";

export const handleFinishAdding = async ({values, setSubmitting, form, setId, setOpen, userData}: HandleFinishAddingParams ) => {
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
            await updateCollabs(userData.uid, [...userData.collaborations, data.id]);
            return data.id;    
        }catch(err: any){                
            console.log(err.message);  
        }finally{
            setSubmitting(false);
            setOpen(true);  
        }
    }
};

export const handleClose = async ({setId, setOpen, dispatch, userData}: HandleCloseParams ) => {
    await dispatch(fetchUserProfileInfo(userData.uid)); 
    setOpen(false);
    setId('');
}

export const onFinish = async ({ collabId, form, userData, dispatch, push }: OnFinishParams) => {
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