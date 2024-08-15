import { useEffect } from "react";

export function getKey<T>(key: string, defaultValue: T): T {
  const keyValue = localStorage.getItem(key);

  if (keyValue === null) return defaultValue;

  return JSON.parse(keyValue) as T;
}

export function useSyncKey<T>(key: string, value: T) {
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);
}

export function deleteKey(key: string) {
  localStorage.removeItem(key);
}
