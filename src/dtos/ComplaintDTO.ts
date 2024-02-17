import { ComplaintStatusDTO } from './ComplaintStatusDTO';

export type IImageUpload = {
  id?: string;
  name: string;
  uri: string;
  path: string;
  isExternal: false;
  type: string;
};

export type CreateComplaintDTO = {
  name: string;
  description: string;
  complaint_images: (IImageUpload | ImagesDTO)[];
};

export type ShowAdDetailsDTO = Omit<CreateComplaintDTO, 'complaint_images'> & {
  id?: string;
  user: User;
  complaint_images: (ImagesDTO | IImageUpload)[];
  state: ComplaintStatusDTO;
};

export type ComplaintDTO = ShowAdDetailsDTO & {
  id: string;
  user_id: string;
  is_active: boolean;
  state: ComplaintStatusDTO;
};

export type IComplaintId = string;

export type ImagesDTO = {
  id: string;
  path: string;
  isExternal: true;
};

type User = {
  id: string;
  name: string;
  avatar_url: string;
};

export type FetchMyComplaintsResponse = {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
  images: ImagesDTO[];
  state: ComplaintStatusDTO;
};

export type FetchComplaint = FetchMyComplaintsResponse & {
  user: User;
};
