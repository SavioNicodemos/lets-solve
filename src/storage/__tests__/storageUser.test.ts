import LocalStorage from '@storage/localStorage';
import { UserDTO } from '@dtos/UserDTO';
import {
  storageUserSave,
  storageUserGet,
  storageUserRemove,
} from '../storageUser';
import { USER_STORAGE } from '../storageConfig';

// Mock the LocalStorage module
jest.mock('@storage/localStorage', () => {
  return {
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
  };
});

describe('User storage', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    jest.clearAllMocks();
  });

  it('should save user in storage', async () => {
    const mockUser: UserDTO = {
      id: 'uuid',
      name: 'John Doe',
      tel: '2342342',
      avatar: 'avatar.png',
      email: 'test@email.com',
    };
    await storageUserSave(mockUser);
    expect(LocalStorage.setItem).toHaveBeenCalledWith(
      USER_STORAGE,
      JSON.stringify(mockUser),
    );
  });

  it('should get user from storage', async () => {
    const mockStorage = JSON.stringify({
      id: 1,
      name: 'John Doe',
      tel: '2342342',
    });
    (LocalStorage.getItem as jest.Mock).mockResolvedValueOnce(mockStorage);
    const user = await storageUserGet();
    expect(user).toEqual(JSON.parse(mockStorage));
  });

  it('should remove user from storage', async () => {
    await storageUserRemove();
    expect(LocalStorage.removeItem).toHaveBeenCalledWith(USER_STORAGE);
  });
});
