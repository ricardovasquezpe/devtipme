import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTipComponent } from './my-tip.component';

describe('MyTipComponent', () => {
  let component: MyTipComponent;
  let fixture: ComponentFixture<MyTipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
