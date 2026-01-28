import { useEffect, useState } from 'react';

export const useLocalStorage = (key: string) => {
  const [value, setValue] = useState(localStorage.getItem(key));

  useEffect(() => {
    const localStorageSetHandler = function (e: any) {
      if (e.key === key) {
        setValue(e.value);
      }
    };
    const localStorageRemoveHandler = function (e: any) {
      if (e.key === key) {
        setValue(null);
      }
    };

    document.addEventListener('itemInserted', localStorageSetHandler);
    document.addEventListener('itemRemoved', localStorageRemoveHandler, false);

    return () => {
      document.removeEventListener('itemInserted', localStorageSetHandler, false);
      document.removeEventListener('itemRemoved', localStorageRemoveHandler);
    };
  }, [key]);

  return value;
};
