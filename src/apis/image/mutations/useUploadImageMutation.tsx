import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "../image.api";

export const useUploadImageMutation = (id: number) => {
  return useMutation({
    mutationFn: (file: File) => uploadImage(id, file),
    onSuccess: (data) => {
      return data.url;
    },
  });
};
