import { FetchCommentDTO, IComment } from '@/dtos/CommentDTO';
import { api } from '@/services/api';

export async function createComplaint({
  description,
  name,
}: ICreateComplaint): Promise<ICreateComplaintResponse> {
  const { data } = await api.post<ICreateComplaintResponse>('/complaints', {
    name,
    description,
  });

  return data;
}

export async function updateComplaint(data: IUpdateComplaint): Promise<void> {
  await api.put(`/complaints/${data.id}`, data);
}

export async function deleteComplaintImagesByIds(ids: string[]): Promise<void> {
  await api.delete('/complaints/images', { data: { complaintImagesIds: ids } });
}

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

type IAddComment = {
  complaintId: string;
  message: string;
};

type ICreateComplaint = {
  name: string;
  description: string;
};

type IUpdateComplaint = {
  id: string;
  name?: string;
  description?: string;
};

type ICreateComplaintResponse = {
  name: string;
  description: string;
  user_id: string;
  is_active: boolean;
  id: string;
};
