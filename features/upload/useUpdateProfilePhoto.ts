import { useMutation } from "@tanstack/react-query";
import FileService from "../../services/file-service";
import { ApiResponse } from "../../types/api-response";

export const singlePhoto = (file: File): Promise<ApiResponse<string>> => {
  return FileService.uploadSinglePhoto(file);
};

export const useUploadSinglePhoto = () => {

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (file: File) => singlePhoto(file),
    onSuccess: (res) => {

    },
  });

  return {
    uploadPhoto: mutateAsync,
    isPending,
  };
};