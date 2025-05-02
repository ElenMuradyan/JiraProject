import { community } from "@/types/communities";
import { FormInstance } from "antd";
import { AppDispatch } from "@/state-management/redux/store";
import { userData } from "@/types/userState";

export interface HandleFinishAddingParams {
  values: community;
  setSubmitting: (val: boolean) => void;
  form: FormInstance;
  setId: (val: string) => void;
  setOpen: (val: boolean) => void;
  userData: userData;
}

export interface HandleCloseParams {
  setId: (val: string) => void;
  setOpen: (val: boolean) => void;
  userData: userData;
  dispatch: AppDispatch;
}

export interface OnFinishParams {
  collabId: string;
  form: FormInstance;
  push: (val: string) => void;
  dispatch: AppDispatch;
  userData: userData;
}
