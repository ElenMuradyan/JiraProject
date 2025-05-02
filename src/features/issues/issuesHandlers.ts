import { db } from "@/services/firebase/firebase";
import { fetchIssueData } from "@/state-management/redux/slices/issues";
import { HandleCloseParams, HandleCreateIssueParams, HandleEditIssueParams } from "@/types/handleDropAndDrag";
import { FIRESTORE_PATH_NAMES } from "@/utilis/constants";
import { generateUid } from "@/utilis/helpers/generateUid";
import { taskStatuses } from "@/utilis/issues";
import { doc, setDoc, updateDoc } from "firebase/firestore";

export const handleCreateIssue = ({values, communityId, setButtonLoading, form, dispatch, onClose}: HandleCreateIssueParams) => {
    if(communityId && typeof communityId === 'string'){
        setButtonLoading(true);
        const taskId = generateUid();

        const taskModel = {
            ...values,
            taskId: taskId,
            date: new Date().toLocaleTimeString(),
            status: taskStatuses.TODO.key,
        }
        try{
            const issueRef = doc(db, FIRESTORE_PATH_NAMES.COLLABORATIONS, communityId, FIRESTORE_PATH_NAMES.ISSUES, taskId);
            setDoc(issueRef, taskModel);
            onClose();
            form.resetFields();
            communityId && dispatch(fetchIssueData(communityId as string));
        }catch(err: any){
            console.log(err.message);
        }finally{
            setButtonLoading(false);
        }    
    }
}


export const handleClose = ({onClose, form}: HandleCloseParams) => {
    onClose();
    form.resetFields();
};

export const handleEditIssue = async ({formData, data, communityId, setButtonLoading, onClose, dispatch}: HandleEditIssueParams) => {
    if(data && communityId && typeof communityId === 'string'){
        setButtonLoading(true);
        try{
            const { taskId } = data;
            const issueDocRef = doc(db, FIRESTORE_PATH_NAMES.COLLABORATIONS, communityId, FIRESTORE_PATH_NAMES.ISSUES, taskId);
            await updateDoc(issueDocRef, {formData});
            await dispatch(fetchIssueData(communityId));
            onClose();
            communityId && dispatch(fetchIssueData(communityId as  string));
        }catch(error){
            console.log(error);
        }finally{
            setButtonLoading(false);
        }    
    }
}
