import AsyncStorage from '@react-native-async-storage/async-storage';

const ORGANIZATION_KEY = 'organizationStore';

export async function loadOrganization<T = any[]>(): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(ORGANIZATION_KEY);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch (e) {
    console.log('loadOrganization error', e);
    return null;
  }
}

export async function saveOrganization<T = any[]>(organization: T): Promise<void> {
  try {
    await AsyncStorage.setItem(ORGANIZATION_KEY, JSON.stringify(organization));
  } catch (e) {
    console.log('saveOrganization error', e);
  }
}

export async function clearOrganization(): Promise<void> {
  try {
    await AsyncStorage.removeItem(ORGANIZATION_KEY);
  } catch (e) {
    console.log('clearOrganization error', e);
  }
}
