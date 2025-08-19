import { BASE_URL } from "@/constant/api";
import instance from "../api";

export const uploadImage = async (tenantId: string, file: File) => {
  const formData = new FormData();
  formData.append("image", file);
  const response = await instance.post(`/images/upload`, formData);
  return response.data;
};
