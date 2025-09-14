import { UserRole } from '@/model/enum/userRole';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'userSession';

export type SessionData = {
  email: string;
  role: UserRole;
  loggedInAt: string;
};

export class UserSession {
  static save = async (session: SessionData): Promise<void> => {
    await AsyncStorage.setItem(KEY, JSON.stringify(session));
  };

  static get = async (): Promise<SessionData | null> => {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return null;
    
    try {
      return JSON.parse(raw) as SessionData;
    } catch {
      await AsyncStorage.removeItem(KEY);
      return null;
    }
  };

  static isLoggedIn = async (): Promise<boolean> => {
    const s = await UserSession.get();
    return !!s;
  };

  static clear = async (): Promise<void> => {
    await AsyncStorage.removeItem(KEY);
  };

  static hasRole = async (role: UserRole): Promise<boolean> => {
    const s = await UserSession.get();
    return s?.role === role;
  };
}
