import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftSidedNavBarComponent } from './left-sided-nav-bar.component';

describe('LeftSidedNavBarComponent', () => {
  let component: LeftSidedNavBarComponent;
  let fixture: ComponentFixture<LeftSidedNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftSidedNavBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeftSidedNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
