import { community, member } from "@/types/communities";
import { Avatar, Button, Card } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

export default function Community ({community}: {community: community}){
    return(
        <Card
        title={community.name}
        style={{ width: 300, margin: "1rem" }}
        actions={[
          <Button type="link" icon={<InfoCircleOutlined />}>Details</Button>,
        ]}
      >
        <p>{community.description || "No description available."}</p>
        
        <div style={{ marginTop: 16 }}>
          <strong>Members:</strong> {community.members?.length || 0}
        </div>
  
        {community.members && (
          <Avatar.Group maxCount={3} size="small" style={{ marginTop: 8 }}>
            {community.members.map((member: member, index: number) => (
              <Avatar key={index}>{member.firstName?.charAt(0) || "U"}</Avatar>
            ))}
          </Avatar.Group>
        )}
      </Card>
      )
}