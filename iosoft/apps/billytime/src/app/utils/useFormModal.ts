import { useState } from 'react';
import { Id } from '@iosoft/billytime-core';

const DEFAULT_ID = -1;

export const useFormModal = <T>() => {
  const [formModalData, setFormModalData] = useState<T | null>(null);
  const [formModalId, setFormModalId] = useState<Id>(DEFAULT_ID);
  console.log(formModalId);
  return {
    formModalData,
    formModalId,
    openForCreate: (data: T) => {
      setFormModalData(data);
    },
    openForEdit: (data: T, id: Id) => {
      setFormModalData(data);
      setFormModalId(id);
    },
    close: () => {
      setFormModalData(null);
      setFormModalId(DEFAULT_ID);
    },
  };
};
