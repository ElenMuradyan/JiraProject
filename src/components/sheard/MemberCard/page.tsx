import { Avatar, Button, Card, Tooltip } from "antd";
import { GrStarOutline } from "react-icons/gr";
import { MemberCardProps } from "@/types/memberCard";

const MemberCard = ({ member, isOwner, onStartChat, onDelete, amIOwner }: MemberCardProps) => (
  <Card className="flex items-center gap-4 relative">
    <Avatar src={member.imgUrl} size={64}>
      {!member.imgUrl && `${member.firstName[0]}${member.lastName[0]}`}
    </Avatar>
    <div className="flex flex-col gap-2">
      <div className="text-lg font-medium flex items-center gap-2">
        {member.firstName} {member.lastName}
        {isOwner && (
          <Tooltip title="Community Owner">
            <GrStarOutline className="text-yellow-500" />
          </Tooltip>
        )}
      </div>
      <Button type="primary" onClick={onStartChat}>Start Chat</Button>
      {amIOwner && <Button danger onClick={onDelete}>Delete Member</Button>}
    </div>
  </Card>
);

export default MemberCard;