'use client'

import { Modal, Form } from "antd";
import ModalForm from "../Form/page";
import { useEffect, useState } from "react";
import { EditInterface } from "@/types/editor";
import { issue } from "@/types/issues";
import { useParams } from "next/navigation";
import { handleEditIssue } from "@/features/issues/issuesHandlers";
import { AppDispatch } from "@/state-management/redux/store";
import { useDispatch } from "react-redux";

const EditIssueModal = ({isOpen, data, onClose}: EditInterface) => {
    const [ buttonLoading, setButtonLoading ] = useState(false);
    const [ form ] = Form.useForm();
    const { communityId } = useParams();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        form.setFieldsValue(data);
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
            onFinish={(formData) => handleEditIssue({formData, data: data as issue, communityId, setButtonLoading, onClose, dispatch})}
            />
        </Modal>
    )   
}

export default EditIssueModal;