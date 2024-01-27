import LocalStorage from '@storage/localStorage';
import { AUTH_STORAGE } from '@storage/storageConfig';

type StorageAuthTokenProps = {
  token: string;
  refreshToken: string;
};

export async function storageAuthTokenSave({
  token,
  refreshToken,
}: StorageAuthTokenProps) {
  await LocalStorage.setItem(
    AUTH_STORAGE,
    JSON.stringify({ token, refreshToken }),
  );
}

export async function storageAuthTokenGet() {
  const response = await LocalStorage.getItem(AUTH_STORAGE);

  const { token, refreshToken }: StorageAuthTokenProps = response
    ? JSON.parse(response)
    : {};

  return { token, refreshToken };
}

export async function storageAuthTokenRemove() {
  await LocalStorage.removeItem(AUTH_STORAGE);
}
