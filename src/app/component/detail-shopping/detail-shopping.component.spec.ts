import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailShoppingComponent } from './detail-shopping.component';

describe('DetailShoppingComponent', () => {
  let component: DetailShoppingComponent;
  let fixture: ComponentFixture<DetailShoppingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailShoppingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
