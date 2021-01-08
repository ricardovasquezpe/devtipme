import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSolutionComponent } from './detail-solution.component';

describe('DetailSolutionComponent', () => {
  let component: DetailSolutionComponent;
  let fixture: ComponentFixture<DetailSolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailSolutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
