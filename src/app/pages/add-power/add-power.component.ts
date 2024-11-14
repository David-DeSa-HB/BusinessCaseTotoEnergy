import {Component, inject} from '@angular/core';
import {PowerFormComponent} from '../../components/power-form/power-form.component';
import {AddPowerInput} from '../../entities/power.entity';
import {PowerService} from '../../services/power/power.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-power',
  standalone: true,
  imports: [
    PowerFormComponent
  ],
  templateUrl: './add-power.component.html',
  styleUrl: './add-power.component.css'
})

export class AddPowerComponent {
  private readonly powerService = inject(PowerService)
  private readonly router = inject(Router)

  async onPowerSubmitted(addPowerInput: AddPowerInput): Promise<void> {
    await this.powerService.create(addPowerInput)
    this.router.navigateByUrl('/power/list')
  }
}
