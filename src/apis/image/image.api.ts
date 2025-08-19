import { Base_URL } from "@/constant/api";
import axios from "axios";

export const uploadImage = async (id: string, file: File) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    console.log("업로드 요청:", {
      url: `${Base_URL}/${id}/images/upload`,
      id,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
    });

    const response = await axios.post(
      `${Base_URL}/${id}/images/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("업로드 응답:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("업로드 에러 상세:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers,
      },
    });
    throw error;
  }
};
