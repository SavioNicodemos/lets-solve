import { useQuery } from '@tanstack/react-query';
import { getGroupInvites, getInvitedUsers } from './api';
import { GroupId } from '../types';
import {
  USE_GROUP_INVITES_QUERY_KEY,
  USE_INVITED_USERS_QUERY_KEY,
} from './constants';

export const useGroupInvites = () => {
  return useQuery({
    queryKey: [USE_GROUP_INVITES_QUERY_KEY],
    queryFn: () => getGroupInvites(),
    meta: {
      errorMessage: 'Ocorreu um erro ao buscar seus convites.',
    },
  });
};

export const useInvitedUsers = (id: GroupId) =>
  useQuery({
    queryKey: [USE_INVITED_USERS_QUERY_KEY, id],
    queryFn: () => getInvitedUsers(id),
    initialData: [],
    meta: {
      errorMessage: 'Ocorreu um erro ao buscar os usuários convidados.',
    },
  });
