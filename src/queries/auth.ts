import { UserDTO } from '@/dtos/UserDTO';
import { api } from '@/services/api';

export async function fetchMyUser(): Promise<UserDTO> {
  const response = await api.get<UserDTO>('/users/me');
  return response.data;
}
