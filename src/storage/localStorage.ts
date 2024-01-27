import AsyncStorage from '@react-native-async-storage/async-storage';

const LocalStorage = {
  setItem: (key: string, value: string) => {
    return AsyncStorage.setItem(key, value);
  },
  getItem: (key: string) => {
    return AsyncStorage.getItem(key);
  },
  removeItem: (key: string) => {
    return AsyncStorage.removeItem(key);
  },
};

export default LocalStorage;
