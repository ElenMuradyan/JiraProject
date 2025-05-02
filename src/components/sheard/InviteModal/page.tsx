import { Modal, Button, Space, Tooltip } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { FaTelegramPlane, FaInstagram, FaFacebook } from "react-icons/fa";
import { InviteModalProps } from "@/types/modal";
import image from '../../../../public/Images/invite.svg';
import { handleCopy } from "@/utilis/helpers/handleCopy";

export default function InviteModal ({ open, onClose, communityId }: InviteModalProps) {
    const shareUrl = `//localhost:3000/Cabinet/JoinCommunity/${communityId}`; 
    
    return(
        <Modal open={open} onCancel={onClose} footer={null} title="Invite to Community">
          <img src={image.src}/>
        <p>Invite others to join your community!</p>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Button
            icon={<FaTelegramPlane />}
            href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=Join+my+community`}
            target="_blank"
            block
          >
            Share on Telegram
          </Button>
          <Button
            icon={<FaFacebook />}
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            block
          >
            Share on Facebook
          </Button>
          <Tooltip title="Instagram doesn't allow direct sharing, add to bio or story">
            <Button icon={<FaInstagram />} block>
              Share on Instagram
            </Button>
          </Tooltip>
          <Button icon={<CopyOutlined />} onClick={() => handleCopy(shareUrl)} block>
            Copy Invite Link
          </Button>
        </Space>
      </Modal>
    );
  }  