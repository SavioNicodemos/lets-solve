import { useMutation } from '@tanstack/react-query';

import { IImageUpload } from '@/dtos/ComplaintDTO';
import { createGroup } from '@/queries/mutations/groups';

export const useCreateGroup = () => {
  return useMutation({
    mutationFn: ({ name, image }: Props) => createGroup({ name, image }),
    mutationKey: ['create-group'],
  });
};

type Props = {
  name: string;
  image: IImageUpload;
};
