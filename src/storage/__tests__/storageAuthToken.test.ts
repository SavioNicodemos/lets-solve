// Assuming you mock LocalStorage and AUTH_STORAGE
import LocalStorage from '@storage/localStorage';
import { AUTH_STORAGE } from '@storage/storageConfig';
import {
  storageAuthTokenSave,
  storageAuthTokenGet,
  storageAuthTokenRemove,
} from '../storageAuthToken';

jest.mock('@storage/localStorage', () => {
  return {
    setItem: jest.fn().mockResolvedValue(undefined),
    getItem: jest.fn().mockResolvedValue(null),
    removeItem: jest.fn().mockResolvedValue(undefined),
  };
});

describe('Auth token storage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should save auth token in storage', async () => {
    const mockAuthToken = {
      token: 'testToken',
      refreshToken: 'testRefreshToken',
    };
    await storageAuthTokenSave(mockAuthToken);
    expect(LocalStorage.setItem).toHaveBeenCalledWith(
      AUTH_STORAGE,
      JSON.stringify(mockAuthToken),
    );
  });

  it('should get auth token from storage', async () => {
    const mockStorage = JSON.stringify({
      token: 'testToken',
      refreshToken: 'testRefreshToken',
    });
    (LocalStorage.getItem as jest.Mock).mockResolvedValueOnce(mockStorage);
    const authToken = await storageAuthTokenGet();
    expect(authToken).toEqual(JSON.parse(mockStorage));
  });

  it('should remove auth token from storage', async () => {
    await storageAuthTokenRemove();
    expect(LocalStorage.removeItem).toHaveBeenCalledWith(AUTH_STORAGE);
  });
});
