import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontTemplateComponent } from './front-template.component';

describe('FrontTemplateComponent', () => {
  let component: FrontTemplateComponent;
  let fixture: ComponentFixture<FrontTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
