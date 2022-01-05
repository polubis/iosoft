import { addDays, getDaysInMonth } from 'date-fns';

import { ConvertedDate, ConvertedMonth, DateType } from '../models';

export const MONTHS_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const resetDay = (date: Date): Date => {
  date.setDate(1);
  return date;
};

export const generateYears = (year: number, range: number): number[] => {
  const prevYears = Array.from(
    { length: range },
    (_, i) => year - (i + 1)
  ).reverse();
  const nextYears = Array.from({ length: range }, (_, i) => year + i + 1);
  return [...prevYears, year, ...nextYears];
};

export const toConvertedDates = (
  dates: Date[],
  type: DateType
): ConvertedDate[] =>
  dates.map((date) => ({
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    id: `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`,
    type,
    original: date,
  }));

export const decrementDateByMonth = (date: Date): Date => {
  const day = date.getDate();
  const decrementedMonth = date.getMonth() - 1;
  const month = decrementedMonth === -1 ? 11 : decrementedMonth;
  const currentYear = date.getFullYear();
  const year = decrementedMonth === -1 ? currentYear - 1 : currentYear;
  return new Date(year, month, day);
};

export const incrementDateByMonth = (date: Date): Date => {
  const day = date.getDate();
  const incrementedMonth = date.getMonth() + 1;
  const month = incrementedMonth === 12 ? 0 : incrementedMonth;
  const currentYear = date.getFullYear();
  const year = incrementedMonth === 12 ? currentYear + 1 : currentYear;
  return new Date(year, month, day);
};

export const generatePrevDates = (date: Date): Date[] => {
  const decrementedDate = decrementDateByMonth(date);
  const daysInMonth = getDaysInMonth(decrementedDate);
  const firstDayOfWeek = resetDay(date).getDay();

  return firstDayOfWeek === 0
    ? []
    : Array.from(
        { length: firstDayOfWeek - 1 },
        (_, i) =>
          new Date(
            decrementedDate.getFullYear(),
            decrementedDate.getMonth(),
            daysInMonth - i
          )
      ).reverse();
};

export const generateInnerDates = (date: Date): Date[] => {
  return Array.from(
    { length: getDaysInMonth(date) },
    (_, i) => new Date(date.getFullYear(), date.getMonth(), i + 1)
  );
};

export const generateNextDates = (date: Date): Date[] => {
  const incrementedDate = incrementDateByMonth(date);
  const lastDayOfMonthDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    getDaysInMonth(date)
  );

  return Array.from(
    { length: 7 - lastDayOfMonthDate.getDay() },
    (_, i) =>
      new Date(incrementedDate.getFullYear(), incrementedDate.getMonth(), i + 1)
  );
};

export const generateDates = (date: Date): ConvertedDate[] => {
  const MAX_DATES = 42;
  const prevDates = generatePrevDates(date);
  const innerDates = generateInnerDates(date);
  const nextDates = generateNextDates(date);
  const dates = [...prevDates, ...innerDates, ...nextDates];
  let convertedDates = [
    ...toConvertedDates(prevDates, 'prev'),
    ...toConvertedDates(innerDates, 'inner'),
    ...toConvertedDates(nextDates, 'next'),
  ];

  if (prevDates.length < nextDates.length) {
    const firstDate = dates[0];
    const additionalDates = Array.from(
      { length: MAX_DATES - dates.length },
      (_, i) => addDays(firstDate, -(i + 1))
    );

    convertedDates = [
      ...toConvertedDates(additionalDates, 'prev'),
      ...convertedDates,
    ];
  } else {
    const lastDate = dates[dates.length - 1];
    const additionalDates = Array.from(
      { length: MAX_DATES - dates.length },
      (_, i) => addDays(lastDate, i + 1)
    );

    convertedDates = [
      ...convertedDates,
      ...toConvertedDates(additionalDates, 'next'),
    ];
  }

  return convertedDates;
};

export const generateMonths = (years: number[]): ConvertedMonth[] => {
  const months: ConvertedMonth[] = [];

  years.forEach((year) => {
    MONTHS_NAMES.forEach((name, idx) => {
      months.push({
        name,
        dates: generateDates(new Date(year, idx)),
        year,
        monthIdx: idx,
      });
    });
  });

  return months;
};

export const getUpperYears = (year: number, years: number[]): number[] => {
  return years.filter((cYear) => cYear > year);
};

export const getLowerYears = (year: number, years: number[]): number[] => {
  return years.filter((cYear) => cYear < year);
};

export const generateUpperYears = (year: number, amount: number): number[] =>
  Array.from({ length: amount }, (_, i) => year + i + 1);

export const generateLowerYears = (year: number, amount: number): number[] =>
  Array.from({ length: amount }, (_, i) => year - (i + 1)).reverse();
