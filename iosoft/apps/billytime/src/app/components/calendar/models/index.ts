export type DateType = 'prev' | 'inner' | 'next';

export interface ConvertedDate {
  day: number;
  month: number;
  year: number;
  id: string;
  type: DateType;
  original: Date;
}

export type ActiveDates = Record<string, boolean>;

export interface ConvertedMonth {
  name: string;
  monthIdx: number;
  dates: ConvertedDate[];
  year: number;
}
