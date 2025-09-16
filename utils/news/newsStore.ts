import AsyncStorage from '@react-native-async-storage/async-storage';

const NEWS_KEY = 'newsStore';

export async function loadNews<T = any[]>(): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(NEWS_KEY);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch (e) {
    console.log('loadNews error', e);
    return null;
  }
}

export async function saveNews<T = any[]>(news: T): Promise<void> {
  try {
    await AsyncStorage.setItem(NEWS_KEY, JSON.stringify(news));
  } catch (e) {
    console.log('saveNews error', e);
  }
}

export async function clearNews(): Promise<void> {
  try {
    await AsyncStorage.removeItem(NEWS_KEY);
  } catch (e) {
    console.log('clearNews error', e);
  }
}
