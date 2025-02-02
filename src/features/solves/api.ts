import {
  FetchComplaint,
  FetchMyComplaintsResponse,
  IComplaintId,
  ISubmitEvaluation,
  MyComplaintsStatusEnum,
  PublicComplaintListDTO,
} from './types';
import { IFiltersDTO } from '@/features/shared/dtos/FiltersDTO';
import { api } from '@/services/api';
import { handleError } from '@/utils/handleError';
import { GroupId } from '../groups/types';
import { IImageUpload } from '../shared/images/types';

export const getSolves = async (
  filters: IFiltersDTO,
  groupId: GroupId,
): Promise<PublicComplaintListDTO[]> => {
  const params = new URLSearchParams();
  if (filters?.complaintName) {
    params.append('query', filters.complaintName);
  }
  params.append('group_id', String(groupId));

  const paramsString = params.toString();

  const response = await api.get(`/complaints?${paramsString}`);
  return response.data;
};

export const getMySolves = async ({
  groupId,
  state = 'ALL',
}: {
  groupId: GroupId;
  state?: MyComplaintsStatusEnum;
}): Promise<FetchMyComplaintsResponse[]> => {
  const params = new URLSearchParams();
  params.append('group_id', String(groupId));
  params.append('state', state);
  const response = await api.get(`/users/complaints?${params.toString()}`);
  return response.data;
};

export const getComplaint = async (
  complaintId: IComplaintId,
): Promise<FetchComplaint> => {
  const response = await api.get<FetchComplaint>(`/complaints/${complaintId}`);

  return response.data;
};

export async function createComplaint({
  description,
  name,
  groupId,
}: ICreateComplaint): Promise<ICreateComplaintResponse> {
  const { data } = await api.post<ICreateComplaintResponse>('/complaints', {
    name,
    description,
    group_id: groupId,
  });

  return data;
}

export async function updateComplaint(data: IUpdateComplaint): Promise<void> {
  await api.put(`/complaints/${data.id}`, data);
}

export async function deleteComplaintImagesByIds(ids: string[]): Promise<void> {
  await api.delete('/complaints/images', { data: { complaintImagesIds: ids } });
}

export async function addImagesToComplaint({
  complaintId,
  images,
}: {
  complaintId: string;
  images: IImageUpload[];
}): Promise<void> {
  const formData = new FormData();
  formData.append('complaint_id', complaintId);
  images.forEach((image: any) => {
    formData.append('images[]', image);
  });

  await api.postForm('/complaints/images', formData);
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

export const changeSolveVisibility = async (
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

type ICreateComplaint = {
  name: string;
  description: string;
  groupId: GroupId;
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
