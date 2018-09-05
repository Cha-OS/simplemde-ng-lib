import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplemdeNgLibComponent } from './simplemde-ng-lib.component';

describe('SimplemdeNgLibComponent', () => {
  let component: SimplemdeNgLibComponent;
  let fixture: ComponentFixture<SimplemdeNgLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimplemdeNgLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplemdeNgLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
