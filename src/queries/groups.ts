import { FetchGroupById, FetchInvitedUser, IGroupDTO } from '@/dtos/GroupDTO';
import { PublicUserDTO } from '@/dtos/UserDTO';
// import { api } from '@/services/api';

export const getGroups = async (): Promise<IGroupDTO[]> => {
  // const response = await api.get<IGroupDTO[]>(`/groups`);

  // return response.data;
  return Promise.resolve(groups);
};

export const getGroupById = async (id: number): Promise<FetchGroupById> => {
  // const response = await api.get<IGroupDTO>(`/groups/${id}`);

  // return response.data;
  let foundGroup = groups.find(group => group.id === id);
  if (!foundGroup) {
    [foundGroup] = groups;
  }

  return Promise.resolve(foundGroup);
};

export const getInvitedUsers = async (
  id: number,
): Promise<FetchInvitedUser[]> => {
  // const response = await api.get<IGroupDTO>(`/groups/${id}/invites`);

  // return response.data;
  console.log(id);
  const invitedUsers: FetchInvitedUser[] = [
    {
      id: 1,
      email: 'oi@example.com',
    },
    {
      id: 2,
      email: 'hello@example.com',
    },
  ];

  return Promise.resolve(invitedUsers);
};

const users: PublicUserDTO[] = [
  {
    avatar_url: 'https://source.unsplash.com/random/300x300',
    id: 'ffd2f542-1a29-4ce0-8220-13527e4ca0a2',
    name: 'John Doe',
  },
  {
    avatar_url: 'https://source.unsplash.com/random/350x350',
    id: '2',
    name: 'Jane Doe',
  },
  {
    avatar_url: 'https://source.unsplash.com/random/400x400',
    id: '3',
    name: 'Fulano',
  },
  {
    avatar_url: 'https://source.unsplash.com/random/450x450',
    id: '4',
    name: 'Ciclano',
  },
  {
    avatar_url: 'https://source.unsplash.com/random/500x500',
    id: '5',
    name: 'Beltrano',
  },
];

const groups: FetchGroupById[] = [
  {
    id: 1,
    name: 'Cool Office Group',
    image_url: 'https://source.unsplash.com/random/300x300',
    participants_count: 5,
    participants: users.slice(0, 5),
    is_admin: true,
  },
  {
    id: 2,
    name: 'Family Group',
    image_url: 'https://source.unsplash.com/random/350x350',
    participants_count: 4,
    participants: users.slice(0, 4),
    is_admin: false,
  },
  {
    id: 3,
    name: 'Me and my GF',
    image_url: 'https://source.unsplash.com/random/400x400',
    participants_count: 2,
    participants: users.slice(0, 2),
    is_admin: true,
  },
];
