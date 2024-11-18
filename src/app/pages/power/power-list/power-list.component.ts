import {Component, inject, OnInit} from '@angular/core';
import {PowerService} from '../../../services/power/power.service';
import {Power} from '../../../entities/power.entity';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-power-list',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './power-list.component.html',
  styleUrl: './power-list.component.css'
})
export class PowerListComponent implements OnInit {
  private readonly powerService = inject(PowerService);

  powers: Power[];

  async ngOnInit(): Promise<void> {
    this.powers = await this.powerService.list();
  }

  async onClickDelete(id: number):Promise<void> {
    await this.powerService.delete(id)
    this.powers = await this.powerService.list()
  }
}
