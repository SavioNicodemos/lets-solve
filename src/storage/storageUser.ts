import { UserDTO } from '@dtos/UserDTO';
import LocalStorage from '@storage/localStorage';

import { USER_STORAGE } from './storageConfig';

export async function storageUserSave(user: UserDTO) {
  await LocalStorage.setItem(USER_STORAGE, JSON.stringify(user));
}

export async function storageUserGet() {
  const storage = await LocalStorage.getItem(USER_STORAGE);

  const user: UserDTO = storage ? JSON.parse(storage) : {};

  return user;
}

export async function storageUserRemove() {
  await LocalStorage.removeItem(USER_STORAGE);
}
