'use client'

import { community, member } from "@/types/communities";
import { Avatar, Button, Card } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { ROUTE_CONSTANTS } from "@/utilis/constants";

export default function Community({ community }: { community: community }) {
  const { push } = useRouter();
  
  return (
    <Card
      className="collab"
      title={community.name}
      style={{ width: 300, margin: "1rem" }}
      styles={{
        body: {
          display: "flex",
          flexDirection: "column",
          gap: 12,
        },
      }}
    >
      <p style={{ minHeight: 48 }}>{community.description || "No description available."}</p>

      <div>
        <strong>Members:</strong> {community.members?.length || 0}
      </div>

      {community.members && community.members.length > 0 && (
        <Avatar.Group max={{ count: 3 }} size="small" style={{ marginBottom: 8 }}>
          {community.members.map((member: member, index: number) => (
            <Avatar key={index} src={member.imgUrl} />
          ))}
        </Avatar.Group>
      )}

      <Button onClick={() => push(`${ROUTE_CONSTANTS.COMMUNITY}/${community.id}`)} type="primary" icon={<InfoCircleOutlined />}>
        Details
      </Button>
    </Card>
  );
}