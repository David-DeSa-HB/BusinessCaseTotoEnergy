import {HttpClient} from '@angular/common/http'
import {inject, Injectable} from '@angular/core'
import {BehaviorSubject, lastValueFrom, Observable} from 'rxjs'
import {environment} from '../../../environments/environment.development'
import {RegisterInput} from '../../entities/register.entity';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient)

  private _token$: BehaviorSubject<string|undefined> = new BehaviorSubject<string|undefined>(undefined);
  _roles$: BehaviorSubject<string[]|undefined> = new BehaviorSubject<string[]|undefined>(undefined)

  private readonly rootUrl = environment.API_URL
  private readonly resource = 'auth'

  constructor() {
    const token = localStorage.getItem(environment.LOCALSTORAGE_KEYS.TOKEN)
    if (token) {
      this._token$.next(token);
      this._roles$.next(this.decodeToken(token).roles)
    }
  }

  get token(): string | undefined {
    return this._token$.value; //read and write
  }

  get token$(): Observable<string | undefined> {
    return this._token$.asObservable(); //read only
  }

  async login(email: string, password: string, keepConnected: boolean): Promise<void> {
    const obs$ = this.http
      .post<{ token: string }>(
        `${this.rootUrl}/${this.resource}/login`,
        {email, password}
      )

    return lastValueFrom(obs$)
      .then(res => {
        this._token$.next(res.token)
        this._roles$.next(this.decodeToken(res.token).roles)
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
    this._token$.next(undefined)
  }

  private decodeToken(token: string): any {
    console.log(jwtDecode(token))
    return jwtDecode(token)
  }
}
