'use client'

import { Modal, Form, notification } from "antd";
import ModalForm from "../Form/page";
import { db } from "@/services/firebase/firebase";
import { FIRESTORE_PATH_NAMES } from "@/utilis/constants";
import { updateDoc, doc } from "firebase/firestore";
import { fetchIssueData } from "@/state-management/redux/slices/issues";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { EditInterface } from "@/types/editor";
import { issue } from "@/types/issues";
import { useParams } from "next/navigation";
import { AppDispatch } from "@/state-management/redux/store";

const EditIssueModal = ({isOpen, data, onClose}: EditInterface) => {
    const [ buttonLoading, setButtonLoading ] = useState(false);
    const [ form ] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>();
    const { communityId } = useParams();

    const handleEditIssue = async (formData: issue) => {
        if(data && communityId && typeof communityId === 'string'){
            setButtonLoading(true);
            try{
                const { taskId } = data;
                const issueDocRef = doc(db, FIRESTORE_PATH_NAMES.COLLABORATIONS, communityId, FIRESTORE_PATH_NAMES.ISSUES, taskId);
                await updateDoc(issueDocRef, {formData});
                notification.success({
                    message: "Issue data successfully updated"
                })
                onClose();
                communityId && dispatch(fetchIssueData(communityId as  string));
            }catch(error){
                console.log(error);
            }finally{
                setButtonLoading(false);
            }    
        }
    }

    useEffect(() => {
        form.setFieldsValue(data)
    }, [data]);

    return(
        <Modal
        title='Edit Issue'
        open={isOpen}
        width={600}
        okText='Edit Issue'
        centered
        onCancel={onClose}
        onOk={form.submit}
        confirmLoading={buttonLoading}
        >
            <ModalForm
            form={form}
            onFinish={handleEditIssue}
            />
        </Modal>
    )   
}

export default EditIssueModal;