import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileFormService } from 'src/app/services/profile-form.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profileForm!: FormGroup;
  constructor(private profileFormService: ProfileFormService) {
  }

  ngOnInit(): void {
    // при загрузке страницы достаю сохранёные данные, если они есть
    const valueForm = this.profileFormService.parseValue();

    this.profileForm = new FormGroup({
      'email': new FormControl(valueForm.email || '', [Validators.required, Validators.email]),
      'tel': new FormControl(
        valueForm.tel || '',
        [Validators.required, Validators.pattern(/([+]?\d[ ]?[(]?\d{3}[)]?[ ]?\d{3}[- ]?\d{2}[- ]?\d{2})$/g)]
      ),
    });
  }

  // вывожу данные в кносоли
  // очищаю локальное хранилище, после отправки
  // и очищаю поля формы
  submitProfileChangeInfo() {
    console.log('Вывод данных формы в json формате', this.profileFormService.getValue());
    this.profileFormService.clearValue();

    this.profileForm.reset();
  }

  // при вводе значений в полях формы, сохраняю в локальном хранилище результат,
  // чтобы при перезагрузке восстановить данные
  saveValue() {
    this.profileFormService.setValue(this.profileForm.value);
  }
}
