import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Comunidadestecnivel2Component } from './comunidadestecnivel2.component';

describe('Comunidadestecnivel2Component', () => {
  let component: Comunidadestecnivel2Component;
  let fixture: ComponentFixture<Comunidadestecnivel2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Comunidadestecnivel2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Comunidadestecnivel2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
