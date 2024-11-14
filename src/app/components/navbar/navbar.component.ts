import {Component, inject, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {filter, map, Observable} from 'rxjs';
import {AsyncPipe, NgIf} from '@angular/common';

const NO_NAVBAR_URLS =['login']
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
private readonly authservice: AuthService = inject(AuthService);
private readonly router: Router = inject(Router);

isVisible$: Observable<boolean>;
token$: Observable<string|undefined>;

ngOnInit() {
  this.isVisible$=this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map((event: NavigationEnd) => !NO_NAVBAR_URLS
      .some(url => event.url.includes(url)))
  )
  this.token$=this.authservice.token$;
}

  onClickLogOut() {
    this.authservice.logOut()
    this.router.navigateByUrl('/login');
  }
}
