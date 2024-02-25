import { FetchGroupById, IGroupDTO } from '@/dtos/GroupDTO';
import { PublicUserDTO } from '@/dtos/UserDTO';
// import { api } from '@/services/api';

export const getGroups = async (): Promise<IGroupDTO[]> => {
  // const response = await api.get<FetchGroups[]>(`/groups`);

  // return response.data;
  return Promise.resolve(groups);
};

export const getGroupById = async (id: number): Promise<FetchGroupById> => {
  // const response = await api.get<FetchGroups>(`/groups/${id}`);

  // return response.data;
  let foundGroup = groups.find(group => group.id === id);
  if (!foundGroup) {
    [foundGroup] = groups;
  }

  return Promise.resolve(foundGroup);
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
    users_count: 5,
    users: users.slice(0, 5),
    is_admin: true,
  },
  {
    id: 2,
    name: 'Family Group',
    image_url: 'https://source.unsplash.com/random/350x350',
    users_count: 4,
    users: users.slice(0, 4),
    is_admin: false,
  },
  {
    id: 3,
    name: 'Me and my GF',
    image_url: 'https://source.unsplash.com/random/400x400',
    users_count: 2,
    users: users.slice(0, 2),
    is_admin: true,
  },
];
