import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCitasComponent } from './client-citas.component';

describe('ClientCitasComponent', () => {
  let component: ClientCitasComponent;
  let fixture: ComponentFixture<ClientCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientCitasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
