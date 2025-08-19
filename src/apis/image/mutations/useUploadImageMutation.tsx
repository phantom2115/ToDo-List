import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "../image.api";

export const useUploadImageMutation = () => {
  return useMutation({
    mutationFn: ({ tenantId, file }: { tenantId: string; file: File }) =>
      uploadImage(tenantId, file),
    onSuccess: (data) => {
      return data.url;
    },
  });
};
