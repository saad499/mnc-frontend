import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventpostComponent } from './eventpost.component';

describe('EventpostComponent', () => {
  let component: EventpostComponent;
  let fixture: ComponentFixture<EventpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventpostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
