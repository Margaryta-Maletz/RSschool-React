import { useCallback, useState } from 'react';

const useLocalStorage = (key: string) => {
  const initState = useCallback(() => {
    return localStorage.getItem(key);
  }, [key]);

  const [value, setValue] = useState(initState());

  const setNewValue = (newValue: string) => {
    localStorage.setItem(key, newValue);
    setValue(newValue);
  };

  return [value, setNewValue] as const;
};

export default useLocalStorage;
