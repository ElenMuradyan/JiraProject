import {Modal, Form, notification} from "antd";
import { useState } from "react";
import ModalForm from "../Form/page";
import { doc, setDoc } from "firebase/firestore";
import { FIRESTORE_PATH_NAMES } from "@/utilis/constants";
import { db } from "@/services/firebase/firebase";
import { useDispatch } from "react-redux";
import { fetchIssueData } from "@/state-management/redux/slices/issues";
import { taskStatuses } from "@/utilis/issues";
import { EditInterface } from "@/types/editor";
import { issue } from "@/types/issues";
import { generateUid } from "@/utilis/helpers/generateUid";
import { useParams } from "next/navigation";
import { AppDispatch } from "@/state-management/redux/store";

const AddIssueModal = ({ isOpen, onClose }: EditInterface) => {
    const [ buttonLoading, setButtonLoading ] = useState(false);
    const [ form ] = Form.useForm();
    const { communityId } = useParams();
    const dispatch = useDispatch<AppDispatch>();

    const handleCreateIssue = (values: issue) => {
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

    const handleClose = () => {
        onClose();
        form.resetFields();
    };

    return(
        <Modal
        title='Create Issue'
        open={isOpen}
        onCancel={handleClose}
        confirmLoading={buttonLoading}
        onOk={form.submit}
        okText='Create Issue'
        width={600}
        centered
        >
            <ModalForm form={form} onFinish={handleCreateIssue}/>
        </Modal>
    )
};

export default AddIssueModal;