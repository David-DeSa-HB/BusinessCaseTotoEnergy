import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AddPowerInput, EditPowerInput, Power} from '../../entities/power.entity';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-power-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './power-form.component.html',
  styleUrl: './power-form.component.css'
})
export class PowerFormComponent implements OnInit {
  @Input() powerToEdit?: Power
  @Output() formSubmitted: EventEmitter<AddPowerInput | EditPowerInput> = new EventEmitter()
  form: FormGroup

  ngOnInit(): void {
    this.form = new FormGroup({
      value: new FormControl(this.powerToEdit ? this.powerToEdit.value : 0,
        [Validators.required, Validators.min(0)]),
    })
  }

  async onFormSubmitted(): Promise<void> {
    if (this.form.valid) {
      const powerInput: AddPowerInput | EditPowerInput = {
        value: this.form.value.value,
      }
      this.formSubmitted.emit(powerInput)
    }
  }
}
