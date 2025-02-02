import { api } from '@/services/api';
import { FetchCommentDTO, IComment } from './types';
import { LaravelPagination } from '@/features/shared/dtos/RequestsDTO';
import { IComplaintId } from '../types';

export const getComments = async ({
  complaintId,
  page,
}: IGetComments): Promise<LaravelPagination<IComment>> => {
  const response = await api.get<LaravelPagination<FetchCommentDTO>>(
    `/complaints/${complaintId}/comments?page=${page}`,
  );

  const comments: IComment[] = response.data.data.map(comment => ({
    ...comment,
    created_at: new Date(comment.created_at),
  }));

  const newComments: LaravelPagination<IComment> = {
    ...response.data,
    data: comments,
  };

  return newComments;
};

export async function addComment({
  complaintId,
  message,
}: IAddComment): Promise<IComment> {
  const response = await api.post<FetchCommentDTO>(
    `complaints/${complaintId}/comments`,
    {
      content: message,
    },
  );

  const comment: IComment = {
    ...response.data,
    created_at: new Date(response.data.created_at),
  };

  return comment;
}

type IGetComments = {
  complaintId: IComplaintId;
  page: number;
};

type IAddComment = {
  complaintId: string;
  message: string;
};
