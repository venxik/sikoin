import EncryptedStorage from 'react-native-encrypted-storage';

async function saveEncryptedStorage(key: string, value: string | object) {
  const param = typeof value === 'object' ? JSON.stringify(value) : value;

  try {
    await EncryptedStorage.setItem(key, param);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('EncryptedStorage setItem() error: ', error);
  }
}

async function getEncryptedStorage(key: string) {
  const defaultItem = null;

  try {
    const item = await EncryptedStorage.getItem(key);

    if (item !== undefined) {
      return item;
    }
    return defaultItem;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('EncryptedStorage getItem() error: ', error);
    return defaultItem;
  }
}

async function removeItemEncryptedStorage(key: string) {
  try {
    await EncryptedStorage.removeItem(key);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('EncryptedStorage removeItem() error: ', error);
  }
}

async function clearEncryptedStorage() {
  try {
    await EncryptedStorage.clear();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('EncryptedStorage clear() error: ', error);
  }
}

export {
  clearEncryptedStorage,
  getEncryptedStorage,
  removeItemEncryptedStorage,
  saveEncryptedStorage,
};
