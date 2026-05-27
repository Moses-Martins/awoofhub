import { useQuery } from '@tanstack/react-query';
import CommentService from '../../services/comment-service';
import { Comment } from "../../types/comment";

type GetCommentOptions = {
    id: string;
};

export const getComment = async ({id}: GetCommentOptions): Promise<Comment[]> => {
    const result = await CommentService.getAllComments(id);
    return result.data
};

export const useComment = ({id}: GetCommentOptions) => {
    const { data, isLoading } = useQuery({
        queryKey: ['comment', id],
        queryFn: () => getComment({id}),
    });

    return {
        data,
        isLoading
    };
};

