import { NgIf } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth/auth.service'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  form: FormGroup
  errMsg: string | undefined

  ngOnInit (): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required,
        Validators.pattern('^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$')
        ]
      ),
      password: new FormControl('', [Validators.required,
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
        ]
      ),
      keepConnected: new FormControl(false)
    })
  }

  async onLoginSubmit (): Promise<void> {
    if (this.form.valid) {
      const { email, password, keepConnected } = this.form.value
      try {
        await this.authService.login(email, password, keepConnected)
        this.router.navigateByUrl('/')
      } catch (e: any) {
        // this.errMsg = e.error.message
        // TODO BACKEND MESSAGE FOR THIS
        this.errMsg = "email or password error"
      }
    }
  }
}
