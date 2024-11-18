import {Component, inject, OnInit} from '@angular/core';
import {UserService} from '../../../services/user/user.service';
import {User} from '../../../entities/user.entity';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {
  private readonly userService = inject(UserService)

  user: User

  async ngOnInit(): Promise<void> {
    this.user = await this.userService.getLoggedUser();
  }
}
