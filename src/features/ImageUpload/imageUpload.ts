import { supabase } from "@/services/supabase/supabase";
import { UploadProps } from "antd";
import { RcFile } from "antd/es/upload";
import { UploadRequestOption } from "rc-upload/lib/interface";

export const handleImageUpload: UploadProps["customRequest"] = async (options: UploadRequestOption) => {
    try {
        const imageFile = options.file as RcFile;
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `products/${fileName}`;

        const { error } = await supabase.storage.from("product-images").upload(filePath, imageFile);

        if (error) {
            options.onError?.(error); 
        } else {
            const { data: publicUrlData } = supabase.storage
                .from("product-images")
                .getPublicUrl(filePath);

            const imageUrl = publicUrlData.publicUrl;

            options.onSuccess?.(publicUrlData);

            return imageUrl;
        }
    } catch (error) {
        const err = error as Error;
        options.onError?.(err);
    }
};