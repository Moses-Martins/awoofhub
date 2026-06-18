
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CommentService from "../../services/comment-service";
import { Comment, commentData } from "../../types/comment";

type WriteCommentOptions = {
  id: string;
};

export const WriteComment = async (offerId: string, data: commentData): Promise<Comment> => {
  const result = await CommentService.writeComment(offerId, data);
  return result.data
};

export const useWriteComment = ({ id }: WriteCommentOptions) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: commentData) => WriteComment(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['comment', id] });
    },
  });

  return { writeComment: mutate, isPending };
};
