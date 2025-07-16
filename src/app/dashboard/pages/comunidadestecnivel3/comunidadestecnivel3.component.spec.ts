import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Comunidadestecnivel3Component } from './comunidadestecnivel3.component';

describe('Comunidadestecnivel3Component', () => {
  let component: Comunidadestecnivel3Component;
  let fixture: ComponentFixture<Comunidadestecnivel3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Comunidadestecnivel3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Comunidadestecnivel3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
