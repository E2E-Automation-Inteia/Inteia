import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasificacionGrupoComponent } from './clasificacion-grupo.component';

describe('ClasificacionGrupoComponent', () => {
  let component: ClasificacionGrupoComponent;
  let fixture: ComponentFixture<ClasificacionGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClasificacionGrupoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClasificacionGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
