import {Component, inject, Input, numberAttribute, OnInit} from '@angular/core';
import {PowerService} from '../../services/power/power.service';
import {Power} from '../../entities/power.entity';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-power-detail',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './power-detail.component.html',
  styleUrl: './power-detail.component.css'
})
export class PowerDetailComponent implements OnInit{
  @Input({transform:numberAttribute})id:number
  private readonly powerService= inject(PowerService)

  power:Power

  async ngOnInit():Promise<void> {
    this.power = await this.powerService.getById(this.id)
  }
}
