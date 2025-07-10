import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VinculadoresComponent } from './vinculadores.component';

describe('VinculadoresComponent', () => {
  let component: VinculadoresComponent;
  let fixture: ComponentFixture<VinculadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VinculadoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VinculadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
