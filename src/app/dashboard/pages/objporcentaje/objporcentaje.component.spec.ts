import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjporcentajeComponent } from './objporcentaje.component';

describe('ObjporcentajeComponent', () => {
  let component: ObjporcentajeComponent;
  let fixture: ComponentFixture<ObjporcentajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjporcentajeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ObjporcentajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
