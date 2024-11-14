import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPowerComponent } from './edit-power.component';

describe('EditPowerComponent', () => {
  let component: EditPowerComponent;
  let fixture: ComponentFixture<EditPowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPowerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
