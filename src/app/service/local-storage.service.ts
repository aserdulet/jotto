import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService<T> {
  get(key: string) {
    return JSON.parse(localStorage.getItem(key) ?? '[]') as T;
  }

  set(key: string, value:T) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
