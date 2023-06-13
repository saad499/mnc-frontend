import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyjoinusComponent } from './whyjoinus.component';

describe('WhyjoinusComponent', () => {
  let component: WhyjoinusComponent;
  let fixture: ComponentFixture<WhyjoinusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhyjoinusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyjoinusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
