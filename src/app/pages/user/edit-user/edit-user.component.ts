import {Component, inject, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EditUserInput, User} from '../../../entities/user.entity';
import {UserService} from '../../../services/user/user.service';
import {NgIf} from '@angular/common';
import {PowerFormComponent} from '../../../components/power-form/power-form.component';
import {UserFormComponent} from '../../../components/user-form/user-form.component';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    NgIf,
    PowerFormComponent,
    UserFormComponent
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit{
  @Input()id:string
  private readonly userService=inject(UserService)
  private readonly router=inject(Router)

  user:User

  async ngOnInit(): Promise<void> {
    this.user = await this.userService.getLoggedUser()
  }

  async onUserSubmitted(editUserInput: EditUserInput): Promise<void>{
    await this.userService.edit(this.id, editUserInput)
    this.router.navigateByUrl('/user/me')
  }
}
