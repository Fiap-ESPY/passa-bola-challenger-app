import { ImageSourcePropType } from "react-native";

export interface Player {
  id: number;
  name: string;
  goals: number;
  assists?: number;
  yellowCards?: number;
  redCards?: number;
  photo?: ImageSourcePropType;
}
