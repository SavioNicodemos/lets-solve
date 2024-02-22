import { ComplaintStatusDTO } from './ComplaintStatusDTO';

export type IImageUpload = {
  id?: string;
  name: string;
  uri: string;
  path: string;
  isExternal: false;
  type: string;
};

export type ISubmitEvaluation = {
  isSolved: boolean;
  score: number;
};

export type CreateComplaintDTO = {
  name: string;
  description: string;
  images: (IImageUpload | ImagesDTO)[];
};

export type ShowAdDetailsDTO = Omit<CreateComplaintDTO, 'images'> & {
  id?: string;
  user: User;
  images: (ImagesDTO | IImageUpload)[];
  state: ComplaintStatusDTO;
};

export type ComplaintDTO = Omit<ShowAdDetailsDTO, 'images'> & {
  id: string;
  is_active: boolean;
  state: ComplaintStatusDTO;
  user: User;
  images: ImagesDTO[];
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
  is_resolved: boolean;
  images: ImagesDTO[];
  state: ComplaintStatusDTO;
};

export type FetchComplaint = FetchMyComplaintsResponse & {
  user: User;
};
