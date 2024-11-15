import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { map } from 'rxjs/operators';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRoles = route.data['roles'] as string[];

  return authService._roles$.pipe(
    map(roles => {
      console.log(roles, expectedRoles)
      if (roles && expectedRoles.some(role => roles.includes(role))) {
        console.log(roles, expectedRoles, true)
        return true;
      } else {
        router.navigateByUrl('/login');
        return false;
      }
    })
  );
};
