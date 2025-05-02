import { db } from "@/services/firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FIRESTORE_PATH_NAMES, ROUTE_CONSTANTS } from "@/utilis/constants";
import { getUser, updateUser } from "@/services/firebase/databaseActions";
import { updateCollabs } from "@/utilis/helpers/updatecollabs";
import { generateChatId } from "@/utilis/helpers/generateChatId";
import { fetchCollab } from "@/state-management/redux/slices/collabSlice";
import { fetchUserProfileInfo } from "@/state-management/redux/slices/userSlice";
import { community } from "@/types/communities";
import { AppDispatch, RootState } from "@/state-management/redux/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export const handleDeleteMember = async (uid: string, communityId: string) => {
   const dispatch = useDispatch<AppDispatch>();

   const { collaborations } = await getUser(uid);
   const updatedCollabs = collaborations.filter((i: string) => i !== communityId);

   await updateUser(uid, { collaborations: updatedCollabs });
   await updateCollabs(uid, updatedCollabs);

   const collaboration = doc(db, FIRESTORE_PATH_NAMES.COLLABORATIONS, communityId);
   const collabSnap = await getDoc(collaboration);
   const { members } = collabSnap.data() as community;

   await updateDoc(collaboration, {
    members: members.filter(i => i.uid !== uid),
   });

   dispatch(fetchCollab(communityId));
};

export const navigateToChat = async (uid1: string, uid2: string, communityId: string) => {
  const { userData } = useSelector((state: RootState) => state.userProfile.authUserInfo);
  const dispatch = useDispatch<AppDispatch>();
  const { push } = useRouter();
  const generatedId = generateChatId(uid1, uid2);

  if (userData && !userData.messages.includes(generatedId)) {
    const { messages } = await getUser(uid2);
    await updateUser(uid1, { messages: [...userData.messages, generatedId] });
    await updateUser(uid2, { messages: [...messages, generatedId] });
    dispatch(fetchUserProfileInfo(userData.uid));
  }

  push(`${ROUTE_CONSTANTS.COMMUNITY}/${communityId}/${ROUTE_CONSTANTS.MESSAGES}/${generatedId}`);
};
