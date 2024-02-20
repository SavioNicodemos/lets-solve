import { FetchCommentDTO, IComment } from '@/dtos/CommentDTO';
import { IComplaintId, ISubmitEvaluation } from '@/dtos/ComplaintDTO';
import { api } from '@/services/api';
import { handleError } from '@/utils/handleError';

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

export const submitEvaluation = async ({
  complaintId,
  isSolved,
  score,
}: ISubmitEvaluationRequest) => {
  const response = await api.patch(`/complaints/${complaintId}/evaluate`, {
    isSolved,
    score,
  });

  return response.data;
};

export const changeAdVisibility = async (
  complaintId: IComplaintId,
  complaintActualStatus: boolean,
) => {
  try {
    const response = await api.patch(`/complaints/${complaintId}`, {
      is_active: !complaintActualStatus,
    });

    return response.data.is_active;
  } catch (error) {
    handleError(error);
    return complaintActualStatus;
  }
};

type ISubmitEvaluationRequest = ISubmitEvaluation & {
  complaintId: IComplaintId;
};

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
