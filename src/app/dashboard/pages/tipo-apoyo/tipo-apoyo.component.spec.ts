import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoApoyoComponent } from './tipo-apoyo.component';

describe('TipoApoyoComponent', () => {
  let component: TipoApoyoComponent;
  let fixture: ComponentFixture<TipoApoyoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoApoyoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoApoyoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
