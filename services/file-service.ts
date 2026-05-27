import { apiClient } from "../lib/apiClient";
import { ApiResponse } from "../types/api-response";

async function uploadSinglePhoto(file: File): Promise<ApiResponse<string>> {

    const formData = new FormData();
    
    formData.append("file", file);

    const res: ApiResponse<string> = await apiClient.post('/files/upload/', formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return res;
}


const FileService = {
    uploadSinglePhoto
};

export default FileService;
