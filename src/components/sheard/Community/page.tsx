'use client'

import { community, member } from "@/types/communities";
import { Avatar, Button, Card } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { ROUTE_CONSTANTS } from "@/utilis/constants";
import { setFullNameLetter } from "@/utilis/helpers/getLetters";

export default function Community({ community }: { community: community }) {
  const { push } = useRouter();
  const { ownerId, members } = community;

  const creator = members.filter(item => item.uid === ownerId)[0];

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
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', minHeight: 64 }}>
        {creator && (
          <Avatar size="large">
            {setFullNameLetter({ firstName: creator.firstName, lastName: creator.lastName })}
          </Avatar>
        )}
        <div
          style={{
            background: "#f5f5f5",
            borderRadius: '0 12px 12px 12px',
            padding: "0.75rem",
            maxWidth: 200,
            fontSize: 14,
            color: "#333",
          }}
        >
          {community.description || <i>No description available.</i>}
        </div>
      </div>

      <div>
        <strong>Members:</strong> {community.members?.length || 0}
      </div>

      {community.members && community.members.length > 0 && (
        <Avatar.Group max={{ count: 3 }} size="small" style={{ marginBottom: 8 }}>
          {community.members.map((member: member, index: number) => (
            <Avatar key={index} >{setFullNameLetter({firstName: member.firstName, lastName: member.lastName})}</Avatar>
          ))}
        </Avatar.Group>
      )}

      <Button onClick={() => push(`${ROUTE_CONSTANTS.COMMUNITY}/${community.id}`)} type="primary" icon={<InfoCircleOutlined />}>
        Details
      </Button>
    </Card>
  );
}