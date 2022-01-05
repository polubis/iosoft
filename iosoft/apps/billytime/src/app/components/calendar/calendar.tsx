// import { Slider } from '../slider';
import styles from './calendar.module.less';
// import { DaysGrid } from './components';
// import {
//   generateLowerYears,
//   generateMonths,
//   generateUpperYears,
//   generateYears,
//   MONTHS_NAMES,
//   useSubject,
// } from './utils';
// import { useEffect, useLayoutEffect, useRef, useState } from 'react';
// import { ActiveDates, ConvertedMonth } from './models';
// import { debounceTime, delay, generate, Subscription, tap } from 'rxjs';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Slider } from '..';
import { ConvertedMonth } from './models';
import {
  generateLowerYears,
  generateMonths,
  generateUpperYears,
  MONTHS_NAMES,
  useSubject,
} from './utils';

import SwiperCore, { Virtual, FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import { DaysGrid } from './components';
import { VirtualOptions } from 'swiper/types';
import { debounceTime, delay, Subscription, tap } from 'rxjs';

SwiperCore.use([Virtual, FreeMode]);

// const yearsToBoolDict = (years: number[]): Record<number, boolean> =>
//   years.reduce((acc, year) => ({ ...acc, [year]: true }), {});

// const Calendar = ({ initDate = new Date(), range = 4, yearsAmount = 5 }) => {
//   const [activeMonth, setActiveMonth] = useState(initDate.getMonth());
//   const [activeYear, setActiveYear] = useState(initDate.getFullYear());
//   const [years, setYears] = useState(generateYears(activeYear, range));
//   const [months, setMonths] = useState(generateMonths(years));
//   const alreadyGeneratedMonthsByYears = useRef(yearsToBoolDict(years));
//   const [activeDates, setActiveDates] = useState<ActiveDates>({});
//   const [swiperRef, setSwiperRef] = useState<SwiperCore | null>(null);
//   const [slide, slide$] = useSubject<number>();
//   const [slideEnd, slideEnd$] = useSubject<number>();
//   const [slideReachEnd, slideReachEnd$] = useSubject<number>();
//   const [slideReachBegining, slideReachBegining$] = useSubject<number>();
//   const isScrolled = useRef(false);

//   const handleActiveMonthSet = (month: number): void => {
//     setActiveMonth(month);
//     // After set scroll to dedicated element
//   };

//   const handleActiveYearSet = (year: number): void => {
//     setActiveYear(year);
//     // After set scroll to dedicated element
//   };

//   const handleActiveDatesSet = (id: string): void => {
//     setActiveDates({ ...activeDates, [id]: !activeDates[id] });
//   };

//   const scrollToInitDate = (): void => {
//     if (!swiperRef || isScrolled.current) {
//       return;
//     }

//     const idx = months.findIndex(
//       (m) => m.year === activeYear && m.monthIdx === activeMonth
//     );
//     swiperRef.slideTo(idx, 0);
//     isScrolled.current = true;
//   };

//   const registerEvents = (): void => {
//     swiperRef?.on('slideChange', (swiper) => {
//       slide.next(swiper.realIndex);
//     });
//     swiperRef?.on('slideChangeTransitionEnd', (swiper) => {
//       slideEnd.next(swiper.realIndex);
//     });
//     swiperRef?.on('reachBeginning', (swiper) => {
//       slideReachBegining.next(swiper.realIndex);
//     });
//     swiperRef?.on('reachEnd', (swiper) => {
//       slideReachEnd.next(swiper.realIndex);
//     });
//   };

//   const generateFilteredMonths = (newYears: number[]): ConvertedMonth[] => {
//     return generateMonths([...newYears]).filter(
//       (month) => !alreadyGeneratedMonthsByYears.current[month.year]
//     );
//   };

//   const syncAlreadyGeneratedMonthsByYears = (newYears: number[]): void => {
//     alreadyGeneratedMonthsByYears.current = {
//       ...alreadyGeneratedMonthsByYears.current,
//       ...yearsToBoolDict(newYears),
//     };
//   };

//   const hasGeneratedMonths = (newYears: number[]): boolean => {
//     return newYears.every(
//       (year) => alreadyGeneratedMonthsByYears.current[year]
//     );
//   };

//   const appendMonths = (newYears: number[]): void => {
//     setMonths([...months, ...generateFilteredMonths(newYears)]);
//     syncAlreadyGeneratedMonthsByYears(newYears);
//   };

//   const prependMonths = (newYears: number[]): void => {
//     setMonths([...generateFilteredMonths(newYears), ...months]);
//     syncAlreadyGeneratedMonthsByYears(newYears);
//   };

//   useLayoutEffect(() => {
//     registerEvents();
//     scrollToInitDate();
//   }, [swiperRef]);

//   useEffect(() => {
//     const subs = new Subscription();

//     subs.add(
//       slide$
//         .pipe(
//           debounceTime(200),
//           tap((idx) => {
//             const month = months[idx];
//             setActiveMonth(month.monthIdx);
//             setActiveYear(month.year);
//           })
//         )
//         .subscribe()
//     );
//     subs.add(
//       slideEnd$
//         .pipe(
//           tap(() => {
//             swiperRef?.update();
//             swiperRef?.slideReset();
//           })
//         )
//         .subscribe()
//     );
//     subs.add(
//       slideReachEnd$
//         .pipe(
//           tap(() => {
//             const newYears = generateUpperYears(years[range], years.length - 4);

//             setYears(newYears);

//             if (hasGeneratedMonths(newYears)) {
//               // SCROLL TO ITEM
//             } else {
//               appendMonths(newYears);
//             }
//           })
//         )
//         .subscribe()
//     );
//     subs.add(
//       slideReachBegining$
//         .pipe(
//           tap(() => {
//             const newYears = generateLowerYears(
//               years[years.length - range],
//               yearsAmount
//             );
//             setYears(newYears);

//             if (hasGeneratedMonths(newYears)) {
//               // SCROLL TO ITEM
//             } else {
//               prependMonths(newYears);
//             }
//           })
//         )
//         .subscribe()
//     );

//     return () => {
//       subs.unsubscribe();
//     };
//   }, [swiperRef, months, years]);

//   console.log(alreadyGeneratedMonthsByYears.current);

//   return (
// <div className={styles['root']}>
//   <Slider className={styles['row']}>
//     {years.map((year) => (
//       <button
//         className={`${styles['rounded-btn']} ${styles['big-btn']} ${
//           activeYear === year ? styles['active'] : ''
//         }`}
//         key={year}
//         onClick={() => handleActiveYearSet(year)}
//       >
//         {year}
//       </button>
//     ))}
//   </Slider>

//   <Slider className={styles['row']}>
//     {MONTHS_NAMES.map((name, idx) => (
//       <button
//         className={`${styles['rounded-btn']} ${
//           activeMonth === idx ? styles['active'] : ''
//         }`}
//         key={name}
//         onClick={() => handleActiveMonthSet(idx)}
//       >
//         {name}
//       </button>
//     ))}
//   </Slider>

//   <Swiper
//     className={styles['days-grid-swiper']}
//     slidesPerView={4}
//     freeMode
//     virtual
//     onSwiper={setSwiperRef}
//   >
//     {months.map((month, i) => (
//       <SwiperSlide
//         className={styles['days-grid-swiper-item']}
//         key={month.name + i}
//       >
//         {month.name + month.year}
//         <DaysGrid
//           activeDates={activeDates}
//           dates={month.dates}
//           onDayClick={(date) => handleActiveDatesSet(date.id)}
//         />
//       </SwiperSlide>
//     ))}
//   </Swiper>
// </div>
// };

// export { Calendar };

interface CalendarProps {
  initDate?: Date;
  virtualYearsRange?: number;
  visibleYearsRange?: number;
  virtualYearsGenerationOffset?: number;
}

const generateYears = (year: number, amount: number): number[] => [
  ...generateLowerYears(year, amount),
  year,
  ...generateUpperYears(year, amount),
];

export const Calendar = ({
  initDate = new Date(),
  virtualYearsRange = 5,
  visibleYearsRange = 4,
  virtualYearsGenerationOffset = 2,
}: CalendarProps) => {
  const [swiperRef, setSwiperRef] = useState<SwiperCore>();
  const [activeYear, setActiveYear] = useState(initDate.getFullYear());
  const [activeMonth, setActiveMonth] = useState(initDate.getMonth());
  const [virtualYears, setVirtualYears] = useState(
    generateYears(activeYear, virtualYearsRange)
  );
  const [months, setMonths] = useState(generateMonths(virtualYears));

  const [slideChange, slideChange$] = useSubject<SwiperCore>();

  const visibleYears = useMemo(
    () => generateYears(activeYear, visibleYearsRange),
    [activeYear, visibleYearsRange]
  );

  const scrollToInitDate = (): void => {
    const idx = months.findIndex(
      (m) => m.year === activeYear && m.monthIdx === activeMonth
    );
    swiperRef?.slideTo(idx, 0);
  };

  const attachEvents = (): void => {
    swiperRef?.on('slideChange', (swiper) => {
      slideChange.next(swiper);
    });
  };

  useEffect(() => {
    const subs = new Subscription();

    subs.add(
      slideChange$
        .pipe(
          debounceTime(150),
          tap((swiper) => {
            const month = months[swiper.realIndex];
            setActiveMonth(month.monthIdx);
            setActiveYear(month.year);
          }),
          delay(200),
          tap((swiper) => {
            swiper.slideToClosest();
          })
        )
        .subscribe()
    );

    return () => {
      subs.unsubscribe();
    };
  }, []);

  useLayoutEffect(() => {
    attachEvents();
  }, [swiperRef, months]);

  useLayoutEffect(() => {
    scrollToInitDate();
  }, [swiperRef]);

  return (
    <div className={styles['root']}>
      <Slider className={styles['row']}>
        {visibleYears.map((year) => (
          <button
            className={`${styles['rounded-btn']} ${styles['big-btn']} ${
              activeYear === year ? styles['active'] : ''
            }`}
            key={year}
            // onClick={() => handleActiveYearSet(year)}
          >
            {year}
          </button>
        ))}
      </Slider>

      <Slider className={styles['row']}>
        {MONTHS_NAMES.map((name, idx) => (
          <button
            className={`${styles['rounded-btn']} ${
              activeMonth === idx ? styles['active'] : ''
            }`}
            key={name}
            // onClick={() => handleActiveMonthSet(idx)}
          >
            {name}
          </button>
        ))}
      </Slider>

      <Swiper
        className={styles['days-grid-swiper']}
        slidesPerView={4}
        freeMode
        virtual={{
          addSlidesAfter: virtualYearsRange,
          addSlidesBefore: virtualYearsRange,
        }}
        onSwiper={setSwiperRef}
      >
        {months.map((month, i) => (
          <SwiperSlide
            className={styles['days-grid-swiper-item']}
            key={month.name + i}
          >
            {month.name + month.year}
            <DaysGrid
              activeDates={{}}
              dates={month.dates}
              onDayClick={(date) => {}}
              // onDayClick={(date) => handleActiveDatesSet(date.id)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
