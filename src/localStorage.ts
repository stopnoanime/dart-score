import { useEffect } from "react";

export function getKey<T>(key: string, defaultValue: T): T {
  const keyValue = localStorage.getItem(key);

  if (keyValue === null) return defaultValue;

  return JSON.parse(keyValue) as T;
}

export function syncKey(key: string, value: any) {
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);
}

export function deleteKey(key: string) {
  localStorage.removeItem(key);
}
