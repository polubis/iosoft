import { useMemo } from 'react';
import { Subject } from 'rxjs';

export const useSubject = <T>() => {
  const subjects = useMemo(() => {
    const subject = new Subject<T>();
    const obs$ = subject.asObservable();

    return [subject, obs$] as const;
  }, []);

  return subjects;
};
