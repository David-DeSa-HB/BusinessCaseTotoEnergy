import {Component, inject, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';

const NO_NAVBAR_URLS =['login']
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
private readonly authservice: AuthService = inject(AuthService);
private readonly router: Router = inject(Router);

isVisible: boolean = false;

ngOnInit() {
  this.router.events.subscribe(event => {
    this.isVisible = !(event instanceof NavigationEnd && NO_NAVBAR_URLS.some(
      url => event.url.includes(url)))
  })
}

  onClickLogOut() {
    this.authservice.logOut()
    this.router.navigateByUrl('/login');
  }
}
