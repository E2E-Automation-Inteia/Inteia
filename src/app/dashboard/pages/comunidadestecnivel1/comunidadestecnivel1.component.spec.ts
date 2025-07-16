import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Comunidadestecnivel1Component } from './comunidadestecnivel1.component';

describe('Comunidadestecnivel1Component', () => {
  let component: Comunidadestecnivel1Component;
  let fixture: ComponentFixture<Comunidadestecnivel1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Comunidadestecnivel1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Comunidadestecnivel1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
