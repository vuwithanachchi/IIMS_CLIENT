import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MOrdersComponent } from './m-orders.component';

describe('MOrdersComponent', () => {
  let component: MOrdersComponent;
  let fixture: ComponentFixture<MOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
