import {Modal, Form} from "antd";
import { useState } from "react";
import ModalForm from "../Form/page";
import { EditInterface } from "@/types/editor";
import { useParams } from "next/navigation";
import { handleClose, handleCreateIssue } from "@/features/issues/issuesHandlers";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state-management/redux/store";

const AddIssueModal = ({ isOpen, onClose }: EditInterface) => {
    const [ buttonLoading, setButtonLoading ] = useState(false);
    const [ form ] = Form.useForm();
    const { communityId } = useParams();
    const dispatch = useDispatch<AppDispatch>();

    return(
        <Modal
        title='Create Issue'
        open={isOpen}
        onCancel={() => handleClose({onClose, form})}
        confirmLoading={buttonLoading}
        onOk={form.submit}
        okText='Create Issue'
        width={600}
        centered
        >
            {
                <ModalForm form={form} onFinish={(values) => handleCreateIssue({values, communityId: communityId as string, setButtonLoading, onClose, form, dispatch})}/>
            }
        </Modal>
    )
};

export default AddIssueModal;