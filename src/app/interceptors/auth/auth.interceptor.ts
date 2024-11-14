import { HttpInterceptorFn } from '@angular/common/http';
import {AuthService} from '../../services/auth/auth.service';
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {from, NEVER} from 'rxjs';

const NO_BEARER_URLS=['/auth']

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  let toHandle= req
  if (!NO_BEARER_URLS.some(url => req.url.includes(url))) {
    if(authService.token) {
      toHandle = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authService.token}`)
      });
    }else{
      authService.logOut()
      router.navigateByUrl('/login')
      return from(NEVER)
    }
  }
  return next(toHandle);
};
