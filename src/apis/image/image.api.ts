import { Base_URL } from "@/constant/api";
import axios from "axios";

export const uploadImage = async (tenantId: string, file: File) => {
  const formData = new FormData();
  formData.append("image", file);
  const response = await axios.post(
    `${Base_URL}/${tenantId}/images/upload`,
    formData
  );
  return response.data;
};
