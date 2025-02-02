import { useMutation } from '@tanstack/react-query';
import { createGroup, deleteFromGroup, updateGroup } from './api';
import { useGroup, useGroups } from './queries';
import { CreateGroupProps, GroupId, UpdateGroupProps } from './types';
import {
  CREATE_GROUP_MUTATION_KEY,
  DELETE_GROUP_MUTATION_KEY,
  UPDATE_GROUP_MUTATION_KEY,
} from './constants';

export const useCreateGroup = () => {
  return useMutation({
    mutationFn: ({ name, image }: CreateGroupProps) =>
      createGroup({ name, image }),
    mutationKey: [CREATE_GROUP_MUTATION_KEY],
  });
};

export const useRemoveUserFromGroup = (groupId: GroupId) => {
  const { refetch: refetchGroups } = useGroups();
  const { refetch: refetchCurrentGroup } = useGroup(groupId);
  return useMutation({
    mutationFn: (userId: string) => deleteFromGroup({ groupId, userId }),
    mutationKey: [DELETE_GROUP_MUTATION_KEY, groupId],
    onSuccess: () => {
      refetchGroups();
      refetchCurrentGroup();
    },
  });
};

export const useUpdateGroup = (groupId: GroupId) => {
  return useMutation({
    mutationFn: ({ name, image }: UpdateGroupProps) =>
      updateGroup({ groupId, name, image }),
    mutationKey: [UPDATE_GROUP_MUTATION_KEY, groupId],
  });
};
