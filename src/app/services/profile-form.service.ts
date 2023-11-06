import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileFormService {

  constructor() { }

  // перевожу объект в строку и сохраняю в локальном хранилище
  setValue(value: {tel: string, email: string}) {
    localStorage.setItem('profileForm', JSON.stringify(value));
  }

  getValue() {
    return localStorage.getItem('profileForm');
  }

  // разпарсиваю полученные данные из локального хранилища
  parseValue() {
    if(this.isValueSave()) {
      return JSON.parse(this.getValue() || '{}');
    }

    return false;
  }

  clearValue() {
    localStorage.removeItem('profileForm');
  }

  // проверка на существование записи данных формы в локальном хранилище
  isValueSave() {
    return this.getValue() !== null;
  }
}
