import { AppDispatch } from "@/state-management/redux/store";
import { userData } from "@/types/userState";

export interface HandleDeleteMemberParams {
  uid: string;
  communityId: string;
  dispatch: AppDispatch;
}

export interface NavigateToChatParams {
  uid1: string;
  uid2: string;
  communityId: string;
  userData: userData;
  dispatch: AppDispatch;
  push: (path: string) => void;
}
