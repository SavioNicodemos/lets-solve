import { FetchCommentDTO, IComment } from '@/dtos/CommentDTO';
import {
  ComplaintDTO,
  FetchComplaint,
  FetchMyComplaintsResponse,
  IComplaintId,
} from '@/dtos/ComplaintDTO';
import { IFiltersDTO } from '@/dtos/FiltersDTO';
import { LaravelPagination } from '@/dtos/RequestsDTO';
import { api } from '@/services/api';
import { handleError } from '@/utils/handleError';

export const getAds = async (filters: IFiltersDTO): Promise<ComplaintDTO[]> => {
  const params = new URLSearchParams();
  if (filters?.complaintName) {
    params.append('query', filters.complaintName);
  }

  const paramsString = params.toString();

  const response = await api.get(`/complaints?${paramsString}`);
  return response.data;
};

export const getMyAds = async (): Promise<FetchMyComplaintsResponse[]> => {
  const response = await api.get('/users/complaints');
  return response.data;
};

export const getComplaint = async (
  complaintId: IComplaintId,
): Promise<ComplaintDTO> => {
  const response = await api.get(`/complaints/${complaintId}`);
  const responseData: FetchComplaint = response.data;

  const complaintData: ComplaintDTO = {
    ...responseData,
    user_id: responseData.user.id,
    complaint_images: responseData.images.map(image => ({
      ...image,
      isExternal: true,
    })),
  };
  return complaintData;
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

type IGetComments = {
  complaintId: IComplaintId;
  page: number;
};
