import { ComplaintStatusDTO } from './ComplaintStatusDTO';
import { PublicUserDTO } from './UserDTO';

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

export type ShowSolveDetailsDTO = Omit<CreateComplaintDTO, 'images'> & {
  id?: string;
  user: PublicUserDTO;
  images: (ImagesDTO | IImageUpload)[];
  state: ComplaintStatusDTO;
};

export type ComplaintDTO = Omit<ShowSolveDetailsDTO, 'images'> & {
  id: string;
  is_active: boolean;
  state: ComplaintStatusDTO;
  user: PublicUserDTO;
  images: ImagesDTO[];
};

export type PublicComplaintListDTO = {
  id: string;
  name: string;
  image: null | { id: string; path: string };
  state: ComplaintStatusDTO;
  user: PublicUserDTO;
};

export type IComplaintId = string;

export type ImagesDTO = {
  id: string;
  path: string;
  isExternal: true;
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
  user: PublicUserDTO;
};

export type MyComplaintsStatusEnum = 'OPEN' | 'CLOSED' | 'ALL';
