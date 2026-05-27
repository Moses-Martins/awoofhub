import { apiClient } from "../lib/apiClient";
import { ApiResponse } from "../types/api-response";
import { Comment, commentData } from "../types/comment";


async function writeComment(id: string, payload: commentData): Promise<ApiResponse<Comment>> {
  const res: ApiResponse<Comment> = await apiClient.post(`/comments/${id}`, payload)

  return res;
}

async function getAllComments(id: string): Promise<ApiResponse<Comment[]>> {
    const res: ApiResponse<Comment[]> = await apiClient.get(`/comments/offer/${id}`)

    return res;
}

const CommentService = {
    writeComment,
    getAllComments,
};

export default CommentService;

