'use client';

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { Avatar } from "antd";
import { member } from "@/types/communities";
import { setFullNameLetter } from "@/utilis/helpers/getLetters";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/state-management/redux/store";
import { fetchCollab } from "@/state-management/redux/slices/collabSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { ROUTE_CONSTANTS } from "@/utilis/constants";
import { fetchUserProfileInfo } from "@/state-management/redux/slices/userSlice";

export default function CommunityPage() {
  const { communityId } = useParams();
  const { collab } = useSelector((state: RootState) => state.collab);
  const { userData } = useSelector((state: RootState) => state.userProfile.authUserInfo);
  const dispatch = useDispatch<AppDispatch>();
  const { push } = useRouter();

  useEffect(() => {
    if(communityId && typeof communityId === 'string'){
      dispatch(fetchCollab(communityId));
    }else{
      push(`${ROUTE_CONSTANTS.JOINCOMMUNITY}/${communityId}`);
    }
  },[communityId]);

  if (!collab) {
    return <div className="p-8">Loading community data...</div>;
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">{collab.name}</h1>
      </div>

      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Description</h2>
        <p>{collab.description || "No description provided."}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Members ({collab.members?.length || 0})</h2>
        <Avatar.Group>
          {collab.members.map((member: member, index: number) => (
            <Avatar key={index}>
              {setFullNameLetter({ firstName: member.firstName, lastName: member.lastName })}
            </Avatar>
          ))}
        </Avatar.Group>
      </div>
    </div>
  );
}