import { issue } from "./issues";

export interface editor {
    onChange: (content: string, editor: any) => void;
    value: string;  
}

export interface FormInterface {
    form: any;
    onFinish: (values: any) => void;
}
  
export interface EditInterface {
    isOpen: boolean;
    data?: issue;        
    onClose: () => void
}