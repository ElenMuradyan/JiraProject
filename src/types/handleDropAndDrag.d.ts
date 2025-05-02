import { AppDispatch } from "@/state-management/redux/store";
import { data } from "./issues";
import { issue } from "@/types/issues";
import { FormInstance } from "antd";
import { ParamValue } from "next/dist/shared/lib/router/utils/parse-path"; // or your custom type

export interface HandleCreateIssueParams {
  values: issue;
  communityId: string;
  setButtonLoading: (val: boolean) => void;
  onClose: () => void;
  form: FormInstance;
  dispatch: AppDispatch
}

export interface HandleEditIssueParams {
  formData: issue;
  data: issue;
  communityId: ParamValue;
  setButtonLoading: (val: boolean) => void;
  onClose: () => void;
  dispatch: AppDispatch
}

export interface HandleCloseParams {
  onClose: () => void;
  form: FormInstance;
}

export interface handleDropAndDragInterface {
    result: any,
    communityId: string,
    data: data,
    dispatch: AppDispatch
}