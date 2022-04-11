import { useEffect, useMemo, useState } from 'react';
import { delay, mergeMap, of, Subject, tap } from 'rxjs';
import { usePortal } from '../../utils';

import { Alert, AlertProps } from './alert';

import css from './alert.module.less';

interface AlertData extends Omit<AlertProps, 'onClose' | 'marker'> {
  id: number;
}

const alert = new Subject<AlertData>();
const alerts$ = alert.asObservable();

export const Alerts = () => {
  const render = usePortal();
  const [alerts, setAlerts] = useState<AlertData[]>([]);

  const closeAlert = (id: number) => {
    setAlerts((prevAlerts) => prevAlerts.filter((al) => al.id !== id));
  };

  const sub = useMemo(
    () =>
      alerts$
        .pipe(
          mergeMap((alert) =>
            of(null).pipe(
              tap(() => {
                setAlerts((prevAlerts) => [
                  ...prevAlerts,
                  {
                    ...alert,
                    id: alert.id,
                    onClose: () => closeAlert(0),
                  },
                ]);
              }),
              delay(4000),
              tap(() => {
                closeAlert(alert.id);
              })
            )
          )
        )
        .subscribe(),
    []
  );

  useEffect(() => {
    return () => {
      sub.unsubscribe();
    };
  }, []);

  return render(
    <div className={css.alerts}>
      {alerts.map((alert, idx) => (
        <Alert
          key={alert.id}
          marker={idx + 1}
          {...alert}
          onClose={() => closeAlert(alert.id)}
        />
      ))}
    </div>
  );
};

export const showAlert = (
  message: AlertData['message'],
  type?: AlertData['type']
) => {
  alert.next({ message, type, id: Date.now() });
};
