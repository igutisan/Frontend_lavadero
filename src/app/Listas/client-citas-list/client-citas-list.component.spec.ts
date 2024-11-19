import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCitasListComponent } from './client-citas-list.component';

describe('ClientCitasListComponent', () => {
  let component: ClientCitasListComponent;
  let fixture: ComponentFixture<ClientCitasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientCitasListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientCitasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
