import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CobrarPedido } from './cobrar-pedido';

describe('CobrarPedido', () => {
  let component: CobrarPedido;
  let fixture: ComponentFixture<CobrarPedido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CobrarPedido],
    }).compileComponents();

    fixture = TestBed.createComponent(CobrarPedido);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
