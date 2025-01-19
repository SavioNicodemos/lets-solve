import { useMutation } from '@tanstack/react-query';

import { IImageUpload } from '@/dtos/ComplaintDTO';
import { updateGroup } from '@/queries/mutations/groups';
import { GroupId } from '@/dtos/GroupDTO';

export const useUpdateGroup = (groupId: GroupId) => {
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
