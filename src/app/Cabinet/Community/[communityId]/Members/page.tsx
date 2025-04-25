'use client';

import { Avatar, Button, Card, Flex, Tooltip } from "antd";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state-management/redux/store";
import { community, member } from "@/types/communities";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { fetchCollab } from "@/state-management/redux/slices/collabSlice";
import { GrStarOutline } from "react-icons/gr";
import { db } from "@/services/firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FIRESTORE_PATH_NAMES } from "@/utilis/constants";
import { userData } from "@/types/userState";

export default function MembersPage() {
  const { collab } = useSelector((state: RootState) => state.collab);
  const { userData } = useSelector((state: RootState) => state.userProfile.authUserInfo);
  const dispatch = useDispatch<AppDispatch>();
  const { communityId } = useParams();
  const isCommunityOwner = userData?.uid && collab?.ownerId === userData.uid;

  useEffect(() => {
    if (communityId && typeof communityId === 'string') {
      dispatch(fetchCollab(communityId));
    }
  }, [communityId, dispatch]);

  if (!collab || !userData || !collab.members?.length) {
    return <div className="p-8 text-center text-gray-500">Loading members...</div>;
  }

  const handleDelete = async (uid: string) => {
    if(communityId && typeof communityId === 'string'){
        const user = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid);
        const userSnap = await getDoc(user);
        const { collaborations } = userSnap.data() as userData;
        await updateDoc(user, {
            collaborations: collaborations.filter((i: string) => i !== communityId)
        });
    
        const collaboration = doc(db, FIRESTORE_PATH_NAMES.COLLABORATIONS, communityId);
        const collabSnap = await getDoc(collaboration);
        const { members } = collabSnap.data() as community;
        await updateDoc(collaboration, {
            members: members.filter(i => i.uid !== uid)
        });
        dispatch(fetchCollab(communityId));
    }
  }
  
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Community Members</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {collab.members.map((member: member, index: number) =>{ 
            const isOwner = member.uid === collab.ownerId;
            return (
                <Card key={index} className="flex items-center gap-4 relative">
                  <Avatar src={member.imgUrl} size={64}>
                    {!member.imgUrl && `${member.firstName[0]}${member.lastName[0]}`}
                  </Avatar>
                  <Flex vertical gap={10}>
                    <div className="text-lg font-medium flex items-center gap-2">
                      {member.firstName} {member.lastName} 
                      {isOwner && (
                        <Tooltip title="Community Owner">
                            <GrStarOutline className="text-yellow-500" />
                        </Tooltip>
                        )}
                    </div>
                    {userData.uid !== member.uid && <Button type="primary">Start Chat</Button>}
                    {isCommunityOwner && !isOwner && <Button danger onClick={() => handleDelete(member.uid)}>Delete Member</Button>}
                    </Flex>
                </Card>
                )})}
      </div>
    </div>
  );
}
