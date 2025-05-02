'use client';

import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state-management/redux/store";
import { member } from "@/types/communities";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { fetchCollab } from "@/state-management/redux/slices/collabSlice";
import MemberCard from "@/components/sheard/MemberCard/page";
import { handleDeleteMember, navigateToChat } from "@/features/member/memberHandlers";

export default function MembersPage() {
  const { collab } = useSelector((state: RootState) => state.collab);
  const { userData } = useSelector((state: RootState) => state.userProfile.authUserInfo);
  const dispatch = useDispatch<AppDispatch>();
  const { communityId } = useParams();
  const { push } = useRouter();
  const amIOwner = userData?.uid === collab?.ownerId;

  useEffect(() => {
    if (communityId && typeof communityId === 'string') {
      dispatch(fetchCollab(communityId));
    }
  }, [communityId, dispatch]);

  if (!collab || !userData || !collab.members?.length) {
    return <div className="p-8 text-center text-gray-500">Loading members...</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Community Members</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {collab.members.map((member: member, index: number) =>{ 
            const isOwner = member.uid === collab.ownerId;
            if(typeof communityId === 'string'){
              return <MemberCard key={index} amIOwner={amIOwner && member.uid !== userData.uid} isOwner={isOwner} member={member} onStartChat={() => navigateToChat({uid1: userData.uid, uid2: member.uid, communityId: communityId as string, push, userData, dispatch})} onDelete={() => handleDeleteMember({uid:member.uid, communityId: communityId as string, dispatch})}/>
            }})}
      </div>
    </div>
  );
}