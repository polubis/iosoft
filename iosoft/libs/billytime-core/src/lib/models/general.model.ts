export type Id = string | number;

export type Description = string | null;

export interface Dictionary {
  id: Id;
  label: string;
  value: string;
}
