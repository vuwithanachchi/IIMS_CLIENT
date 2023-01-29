import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MProductsComponent } from './m-products.component';

describe('MProductsComponent', () => {
  let component: MProductsComponent;
  let fixture: ComponentFixture<MProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
