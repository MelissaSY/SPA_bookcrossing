import { useState } from "react";

 function useAccessToken () {
  const key =  'accessToken';
  const [value, setValue] = useState<string|null>(null);
  const setItem = (value: string) => {
    localStorage.setItem(key, value);
    setValue(value);  
  }
  const getItem = () => {
    const value = localStorage.getItem(key);
    setValue(value);
    return value;
  }

  const removeItem = () => {
    localStorage.removeItem(key);
    setValue(null);
  };

  return { value, setItem, getItem, removeItem };
}
export default useAccessToken
