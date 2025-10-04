
export interface Player {
  id: number;
  name?: string;
  age?: number;
  position?: string;
  goals?: number;
  assists?: number;
  yellowCards?: number;
  redCards?: number;
  photo?: string | null;
}
