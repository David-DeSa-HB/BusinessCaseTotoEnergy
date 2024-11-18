import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.development';
import {EditUserInput, User} from '../../entities/user.entity';
import {lastValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http=inject(HttpClient)

  private readonly rootUrl = environment.API_URL
  private readonly resource= 'user'


  async getByEmail(email:string):Promise<User>{
    const http$=this.http.get<User>(`${this.rootUrl}/${this.resource}/email/${email}`)
    return lastValueFrom(http$)
  }

  async getById(id:string):Promise<User>{
    const http$=this.http.get<User>(`${this.rootUrl}/${this.resource}/id/${id}`)
    return lastValueFrom(http$)
  }

  async getLoggedUser(): Promise<User> {
    const http$ = this.http.get<User>(`${this.rootUrl}/${this.resource}/me`);
  return lastValueFrom(http$);
  }

  async edit(id:string, editUserInput:EditUserInput): Promise<void> {
    const http$= this.http.put<void>(`${this.rootUrl}/${this.resource}/${id}`, editUserInput)
    return lastValueFrom(http$)
  }

  async delete(id:string): Promise<void> {
    const http$= this.http.delete<void>(`${this.rootUrl}/${this.resource}/${id}`)
    return lastValueFrom(http$)
  }
}
