import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiwareComponent } from './fiware.component';

describe('FiwareComponent', () => {
  let component: FiwareComponent;
  let fixture: ComponentFixture<FiwareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiwareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
