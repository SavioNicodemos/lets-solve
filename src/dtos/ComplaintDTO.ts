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
  user: User;
  complaint_images: ImagesDTO[] | IImageUpload[];
};

export type ComplaintDTO = ShowAdDetailsDTO & {
  id: string;
  user_id: string;
  is_active: boolean;
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
