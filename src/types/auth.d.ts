import { AppDispatch } from "@/state-management/redux/store";

export interface Register {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    collabId?: string;
  }
  
  export interface RegisterFunctionProps {
    values: Register;
    setLoading: (val: boolean) => void;
    push: (path: string) => void; 
    dispatch?: AppDispatch;
  }
  