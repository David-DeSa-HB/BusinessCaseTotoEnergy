import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {RegisterInput} from '../../entities/register.entity';
import {NgIf} from '@angular/common';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router)
  form: FormGroup;
  errMsg: string | undefined

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]
      ),
      password: new FormControl('', [Validators.required,
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
        ]
      ),

      lastName: new FormControl('', [Validators.required]),

      firstName: new FormControl('', [Validators.required]),

      keepConnected: new FormControl(false)
    })
  }

  async onSubmitForm() {
    if (this.form.valid) {
      const registerInput: RegisterInput = {
        email: this.form.value.email,
        password: this.form.value.password,
        lastName: this.form.value.lastName,
        firstName: this.form.value.firstName
      }
      try {
        await this.authService.register(registerInput).catch(console.log)
        this.router.navigateByUrl('/')
      } catch (e: any) {
        console.log(e)
        // this.errMsg = e.error.message
        // TODO BACKEND MESSAGE FOR THIS
        this.errMsg = "email or password error"
      }
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    return (
      this.form.get(fieldName)!.invalid &&
      (this.form.get(fieldName)!.dirty || this.form.get(fieldName)!.touched)
    )
  }
}
