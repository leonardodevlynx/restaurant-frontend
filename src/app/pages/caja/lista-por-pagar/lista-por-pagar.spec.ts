import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaPorPagar } from './lista-por-pagar';

describe('ListaPorPagar', () => {
  let component: ListaPorPagar;
  let fixture: ComponentFixture<ListaPorPagar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPorPagar],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaPorPagar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
