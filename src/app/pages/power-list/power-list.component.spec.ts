import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerListComponent } from './power-list.component';

describe('PowerListComponent', () => {
  let component: PowerListComponent;
  let fixture: ComponentFixture<PowerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PowerListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PowerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
