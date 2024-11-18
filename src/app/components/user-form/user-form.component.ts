import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EditUserInput, User} from '../../entities/user.entity';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit{
  @Input() userToEdit?: User
  @Output() formSubmitted: EventEmitter<EditUserInput> = new EventEmitter()

  form:FormGroup

  ngOnInit() {
    this.form = new FormGroup(
      {
        lastName: new FormControl(this.userToEdit ? this.userToEdit.lastName : '',
          [Validators.required]),
        firstName: new FormControl(this.userToEdit ? this.userToEdit.firstName : '',
          [Validators.required]),
        email: new FormControl(this.userToEdit ? this.userToEdit.email : '',
          [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
        birthDate: new FormControl(this.userToEdit ? this.userToEdit.birthDate : ''),
        phone: new FormControl(this.userToEdit ? this.userToEdit.phone : '',
          [Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')])
      })
  }

  async onFormSubmitted(): Promise<void>{
    if(this.form.valid){
      const userInput: EditUserInput={
        lastName:this.form.value.lastName,
        firstName:this.form.value.firstName,
        email:this.form.value.email,
        birthDate:this.form.value.birthDate,
        phone:this.form.value.phone
      }
      this.formSubmitted.emit(userInput)
    }
  }
}
