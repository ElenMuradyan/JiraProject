import { Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
import { ImgUploadProps } from "@/types/imageUpload";
import { RootState } from "@/state-management/redux/store";

const ImgUpload = ({ uploading, handleUpload, handleRemove }: ImgUploadProps) => {
    const { userData } = useSelector((store: RootState) => store.userProfile.authUserInfo);

    const uploadButton = (
        <button style={{ border: 0, background: 'none'}} type="button">
            {uploading ? <LoadingOutlined /> : <PlusOutlined/>}
            <div style={{ marginTop: 8}}>Upload</div>
        </button>
    );

    return(
        <>{
            userData && 
                <div>
                <Upload
                fileList={[{
                    uid: userData.uid,
                    name: `${userData.firstName} ${userData.lastName}`,
                    status: 'done',
                    url: userData.imgUrl
                }]}

                customRequest={handleUpload}
                onRemove={handleRemove}
                listType="picture-card"
                >
                    {uploadButton}
                </Upload>
            </div>
        }
        </>
    )
};

export default ImgUpload;