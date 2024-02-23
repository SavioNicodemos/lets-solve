import { IGroupDTO } from '@/dtos/GroupDTO';
// import { api } from '@/services/api';

export const getGroups = async (): Promise<IGroupDTO[]> => {
  // const response = await api.get<FetchGroups>(`/groups`);

  // return response.data;
  return Promise.resolve(groups);
};

const groups: IGroupDTO[] = [
  {
    id: 1,
    name: 'Cool Office Group',
    image_url: 'https://source.unsplash.com/random/300x300',
    users_count: 5,
  },
  {
    id: 2,
    name: 'Family Group',
    image_url: 'https://source.unsplash.com/random/350x350',
    users_count: 8,
  },
  {
    id: 3,
    name: 'Me and my GF',
    image_url: 'https://source.unsplash.com/random/400x400',
    users_count: 2,
  },
];
