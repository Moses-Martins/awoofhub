import { UploadableFile } from "@/types/files";
import { useMutation } from "@tanstack/react-query";
import FileService from "../../services/file-service";
import { ApiResponse } from "../../types/api-response";

export const singlePhoto = (formData: UploadableFile): Promise<ApiResponse<string>> => {
  return FileService.uploadSinglePhoto(formData);
};

export const useUploadSinglePhoto = () => {

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (formData: UploadableFile) => singlePhoto(formData),
    onSuccess: (res) => {

    },
  });

  return {
    uploadPhoto: mutateAsync,
    isPending,
  };
};