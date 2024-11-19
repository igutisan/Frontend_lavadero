import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPlanesComponent } from './lista-planes.component';

describe('ListaPlanesComponent', () => {
  let component: ListaPlanesComponent;
  let fixture: ComponentFixture<ListaPlanesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPlanesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
