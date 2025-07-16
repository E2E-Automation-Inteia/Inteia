import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramascolcienciasComponent } from './programascolciencias.component';

describe('ProgramascolcienciasComponent', () => {
  let component: ProgramascolcienciasComponent;
  let fixture: ComponentFixture<ProgramascolcienciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramascolcienciasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgramascolcienciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
