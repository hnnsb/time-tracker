export function saveToLocalStorage<T>(key: string, value: T[]) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocalStorage<T>(key: string): T[] {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

export function removeFromLocalStorage(key: string): void {
  localStorage.removeItem(key);
}

export function clearLocalStorage(): void {
  localStorage.clear();
}
