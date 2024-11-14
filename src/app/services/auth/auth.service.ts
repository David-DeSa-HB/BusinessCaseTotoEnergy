import {HttpClient} from '@angular/common/http'
import {inject, Injectable} from '@angular/core'
import {lastValueFrom} from 'rxjs'
import {environment} from '../../../environments/environment.development'
import {RegisterInput} from '../../entities/register.entity';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient)

  private _token: string | undefined

  private readonly rootUrl = environment.API_URL
  private readonly resource = 'auth'

  constructor() {
    const token = localStorage.getItem(environment.LOCALSTORAGE_KEYS.TOKEN)
    if (token) {
      this._token=token;
    }
  }

  get token(): string | undefined {
    return this._token
  }

  async login(email: string, password: string, keepConnected: boolean): Promise<void> {
    const obs$ = this.http
      .post<{ token: string }>(
        `${this.rootUrl}/${this.resource}/login`,
        {email, password}
      )

    return lastValueFrom(obs$)
      .then(res => {
        this._token = res.token
        if (keepConnected) {
          localStorage.setItem(environment.LOCALSTORAGE_KEYS.TOKEN, res.token)
        }
      })
  }

  async register(registerInput: RegisterInput): Promise<void> {
    const obs$ = this.http
      .post<void>(
        `${this.rootUrl}/${this.resource}/register`,
        registerInput
      )
    return lastValueFrom(obs$)
  }

  logOut(): void {
    localStorage.removeItem(environment.LOCALSTORAGE_KEYS.TOKEN);
    this._token = undefined
  }
}
