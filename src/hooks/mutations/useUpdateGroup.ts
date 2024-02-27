import { useMutation } from '@tanstack/react-query';

import { IImageUpload } from '@/dtos/ComplaintDTO';
import { updateGroup } from '@/queries/mutations/groups';

export const useUpdateGroup = (groupId: number) => {
  return useMutation({
    mutationFn: ({ name, image }: Props) =>
      updateGroup({ groupId, name, image }),
    mutationKey: ['update-group', groupId],
  });
};

type Props = {
  name?: string;
  image?: IImageUpload;
};
