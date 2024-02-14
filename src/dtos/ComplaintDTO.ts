import { ComplaintStatusDTO } from './ComplaintStatusDTO';

export type PaymentMethodsTypes =
  | 'pix'
  | 'card'
  | 'boleto'
  | 'cash'
  | 'deposit';

export type IImageUpload = {
  id?: string;
  name: string;
  uri: string;
  path: string;
  isExternal: boolean;
  type: string;
};

export type CreateComplaintDTO = {
  name: string;
  description: string;
  complaint_images: IImageUpload[];
};

export type ShowAdDetailsDTO = CreateComplaintDTO & {
  id?: string;
  user: User;
  complaint_images: ImagesDTO[] | IImageUpload[];
  state: ComplaintStatusDTO;
};

export type ComplaintDTO = ShowAdDetailsDTO & {
  id: string;
  user_id: string;
  is_active: boolean;
  state: ComplaintStatusDTO;
};

export type ComplaintApiDTO = Omit<ComplaintDTO, 'payment_methods'> & {
  payment_methods: IPaymentMethodObject[];
};

export type IComplaintId = string;

export type ImagesDTO = {
  id: string;
  path: string;
  isExternal: boolean;
};

export type IPaymentMethodObject = {
  key: PaymentMethodsTypes;
  name: string;
};

type User = {
  avatar: string;
  name: string;
  tel: string;
};

export type IComment = {
  id: string;
  comment: string;
  user: User;
  created_at: Date;
};
