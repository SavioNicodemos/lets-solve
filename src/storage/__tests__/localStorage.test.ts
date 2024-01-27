import AsyncStorage from '@react-native-async-storage/async-storage';
import LocalStorage from '../localStorage';

const AsyncStorageMock = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

describe('LocalStorage', () => {
  beforeEach(() => {
    AsyncStorageMock.setItem.mockClear();
    AsyncStorageMock.getItem.mockClear();
    AsyncStorageMock.removeItem.mockClear();
  });

  it('setItem calls AsyncStorage.setItem with the correct arguments', async () => {
    await LocalStorage.setItem('testKey', 'testValue');
    expect(AsyncStorageMock.setItem).toHaveBeenCalledWith(
      'testKey',
      'testValue',
    );
  });

  it('getItem calls AsyncStorage.getItem with the correct arguments', async () => {
    AsyncStorageMock.getItem.mockResolvedValueOnce('testValue');
    const value = await LocalStorage.getItem('testKey');
    expect(AsyncStorageMock.getItem).toHaveBeenCalledWith('testKey');
    expect(value).toEqual('testValue');
  });

  it('removeItem calls AsyncStorage.removeItem with the correct arguments', async () => {
    await LocalStorage.removeItem('testKey');
    expect(AsyncStorageMock.removeItem).toHaveBeenCalledWith('testKey');
  });
});
