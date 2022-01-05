// import { useEffect, useLayoutEffect, useRef, useState } from 'react';
// import { ActiveDates } from '../models';
// import {
//   generateMonths,
//   generateYears,
//   getLowerYears,
//   getUpperYears,
//   MONTHS_NAMES,
// } from './date';

// import SwiperCore, { FreeMode } from 'swiper';

// SwiperCore.use([FreeMode]);

// export const useCalendar = (initDate: Date) => {
//   const [swiperRef, setSwiperRef] = useState<SwiperCore | null>(null);

//   const [activeDates, setActiveDates] = useState<ActiveDates>({});
//   const [activeMonth, setActiveMonth] = useState(initDate.getMonth());
//   const [activeYear, setActiveYear] = useState(initDate.getFullYear());
//   const [years, setYears] = useState(generateYears(activeYear));
//   const [months, setMonths] = useState(generateMonths(years));

//   const alreadyCalculatedYears = useRef([years.join(',')]);
//   const isScrolled = useRef(false);

//   const toggleActive = (id: string): void => {
//     setActiveDates({ ...activeDates, [id]: !activeDates[id] });
//   };

//   const scrollToCurrentDate = (): void => {
//     const idx = months.findIndex(
//       (m) => m.year === activeYear && m.monthIdx === activeMonth
//     );

//     swiperRef?.slideTo(idx, 0);

//     isScrolled.current = true;
//   };

//   useEffect(() => {
//     if (activeYear === years[0] || activeYear === years[years.length - 1]) {
//       const newYears = generateYears(activeYear);

//       setYears(newYears);

//       const joinedNewYears = newYears.join(',');

//       if (alreadyCalculatedYears.current.includes(joinedNewYears)) {
//         return;
//       }

//       alreadyCalculatedYears.current.push(joinedNewYears);

//       if (activeYear === years[0]) {
//         setMonths((months) => {
//           const generatedMonths = generateMonths(
//             getLowerYears(years[0], newYears)
//           );

//           const newMonths = [...generatedMonths, ...months];

//           return newMonths;
//         });
//       }

//       if (activeYear === years[years.length - 1]) {
//         setMonths((months) => {
//           const generatedMonths = generateMonths(
//             getUpperYears(years[years.length - 1], newYears)
//           );

//           const newMonths = [...months, ...generatedMonths];

//           return newMonths;
//         });
//       }
//     }
//   }, [years, activeYear]);

//   useLayoutEffect(() => {
//     if (!isScrolled.current) {
//       scrollToCurrentDate();
//     }
//   }, [swiperRef]);

//   console.log(months);

//   return {
//     activeDates,
//     activeMonth,
//     activeYear,
//     MONTHS_NAMES,
//     months,
//     years,
//     toggleActive,
//     setActiveMonth,
//     setActiveYear,
//     swiperRef,
//     setSwiperRef,
//   };
// };
