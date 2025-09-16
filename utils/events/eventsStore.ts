import { MatchEvent } from '@/model/match';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'eventsStore';

export const loadEvents = async (): Promise<MatchEvent[] | null> => {
  const raw = await AsyncStorage.getItem(KEY);

  if (!raw) return null;

  try {
    return JSON.parse(raw) as MatchEvent[];
  } catch {
    await AsyncStorage.removeItem(KEY);
    return null;
  }
};

export const saveEvents = async (events: MatchEvent[]): Promise<void> => {
  await AsyncStorage.setItem(KEY, JSON.stringify(events));
};

export const clearEvents = async (): Promise<void> => {
  await AsyncStorage.removeItem(KEY);
};
