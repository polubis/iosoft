import {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  ReactElement,
} from 'react';
import { debounceTime } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

import styles from './slider.module.less';

interface SliderProps {
  className?: string;
  children: ReactElement | ReactElement[];
  onLeftEdge?: () => void;
  onRightEdge?: () => void;
}

const useOnWindowResize = (onResize: (e: Event) => void, delay = 150) => {
  useEffect(() => {
    const sub = fromEvent(window, 'resize')
      .pipe(debounceTime(delay))
      .subscribe(onResize);

    return () => {
      sub.unsubscribe();
    };
  }, []);
};

const LEFT_LIMIT = 0;

const pxToNumber = (value: string): number => +value.replace('px', '');

const getSliderChildrenWidth = (children: HTMLCollection): number => {
  let acc = 0;
  const length = children.length;

  for (let i = 0; i < length; i++) {
    const child = children[i];
    const { marginRight, width, marginLeft } = getComputedStyle(child);
    acc +=
      pxToNumber(width) +
      pxToNumber(marginLeft || '0px') +
      pxToNumber(marginRight || '0px');
  }

  return acc;
};

const getSliderWidth = (current: HTMLDivElement): number =>
  current.getBoundingClientRect().width;

const calculateRightLimit = (
  children: HTMLCollection,
  sliderWidth: number
): number => getSliderChildrenWidth(children) - sliderWidth;

const isOnRightLimit = (movedTo: number, rightLimit: number): boolean =>
  Math.abs(movedTo) >= rightLimit;

const isOnLeftLimit = (movedTo: number): boolean => movedTo >= LEFT_LIMIT;

const Slider = ({
  className = '',
  children,
  onLeftEdge = () => {},
  onRightEdge = () => {},
}: SliderProps) => {
  const [sliderWidth, setSliderWidth] = useState(0);
  const [rightLimit, setRightLimit] = useState(-1);
  const [draging, setDraging] = useState(false);
  const [distance, setDistance] = useState({
    clickedIn: 0,
    lastMovedTo: 0,
    movedTo: 0,
  });

  const sliderRef = useRef<HTMLDivElement>(null);

  const handleStart = (pageX: number): void => {
    setDraging(true);
    setDistance((prevDistance) => ({ ...prevDistance, clickedIn: pageX }));
  };

  const handleMove = (pageX: number): void => {
    setDistance((prevDistance) => {
      const shift = pageX - prevDistance.clickedIn;
      const newMovedTo = shift + prevDistance.lastMovedTo;

      if (isOnLeftLimit(newMovedTo)) {
        onLeftEdge();

        return {
          ...prevDistance,
          movedTo: LEFT_LIMIT,
        };
      }

      if (isOnRightLimit(newMovedTo, rightLimit)) {
        onRightEdge();

        return {
          ...prevDistance,
          movedTo: -rightLimit,
        };
      }

      return {
        ...prevDistance,
        movedTo: newMovedTo,
      };
    });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleStart(e.pageX);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    handleStart(e.changedTouches[0].pageX);
  };

  const saveCurrentMovedTo = () => {
    setDraging(false);
    setDistance((prevDistance) => ({
      ...prevDistance,
      lastMovedTo: prevDistance.movedTo,
      clickedIn: 0,
    }));
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    handleMove(e.pageX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>): void => {
    handleMove(e.changedTouches[0].pageX);
  };

  const recalculate = () => {
    setTimeout(() => {
      // Little hack - but gives option to read data always after last react dom commit phase
      // Also decreases number of possible calculateRightLimit() function calls
      if (sliderRef.current) {
        const sliderWidth = getSliderWidth(sliderRef.current);
        setRightLimit(
          calculateRightLimit(sliderRef.current.children, sliderWidth)
        );
        setSliderWidth(sliderWidth);
      }
    });
  };

  useLayoutEffect(() => recalculate(), [sliderRef, children]);
  useOnWindowResize(recalculate);

  const isGrabCursorEnabled =
    !(distance.movedTo === LEFT_LIMIT) || !(distance.movedTo === -rightLimit);

  return (
    <div className={`${styles['container']} ${className}`}>
      <div
        className={styles['wrapper']}
        onMouseDown={handleMouseDown}
        onMouseUp={saveCurrentMovedTo}
        onMouseLeave={draging ? saveCurrentMovedTo : undefined}
        onMouseMove={draging ? handleMouseMove : undefined}
        onTouchStart={handleTouchStart}
        onTouchEnd={saveCurrentMovedTo}
        onTouchMove={draging ? handleTouchMove : undefined}
        onTouchCancel={draging ? saveCurrentMovedTo : undefined}
      >
        <div
          ref={sliderRef}
          className={`${styles['slider']} ${
            isGrabCursorEnabled ? styles['grab'] : ''
          } ${draging ? styles['draging'] : ''}`}
          style={{
            transform: `translateX(${distance.movedTo}px)`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export { Slider };
