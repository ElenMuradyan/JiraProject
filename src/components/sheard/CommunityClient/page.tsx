'use client'

import { fetchCollab } from "@/state-management/redux/slices/collabSlice";
import { AppDispatch, RootState } from "@/state-management/redux/store";
import { ROUTE_CONSTANTS } from "@/utilis/constants";
import { setFullNameLetter } from "@/utilis/helpers/getLetters";
import { Avatar } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function CommunityClient () {
    const { communityId } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { push } = useRouter();
    const { collab } = useSelector((state: RootState) => state.collab);
  
    useEffect(() => {
      if (communityId && typeof communityId === 'string') {
        dispatch(fetchCollab(communityId));
      } else {
        push(`${ROUTE_CONSTANTS.JOINCOMMUNITY}/${communityId}`);
      }
    }, [communityId]);
  
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
          <h2 className="text-lg font-semibold mb-2">
            Members ({collab.members?.length || 0})
          </h2>
          <Avatar.Group>
            {collab.members.map((member, index) => (
              <Avatar key={index}>
                {setFullNameLetter({
                  firstName: member.firstName,
                  lastName: member.lastName,
                })}
              </Avatar>
            ))}
          </Avatar.Group>
        </div>
      </div>
    );
  
}
