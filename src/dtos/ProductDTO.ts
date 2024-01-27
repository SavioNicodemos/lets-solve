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

export type CreateProductDTO = {
  name: string;
  description: string;
  product_images: IImageUpload[];
};

export type ShowAdDetailsDTO = CreateProductDTO & {
  user: User;
  product_images: ImagesDTO[] | IImageUpload[];
};

export type ProductDTO = ShowAdDetailsDTO & {
  id: string;
  user_id: string;
  is_active: boolean;
};

export type ProductApiDTO = Omit<ProductDTO, 'payment_methods'> & {
  payment_methods: IPaymentMethodObject[];
};

export type IProductId = string;

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
