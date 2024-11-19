import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsPlanesComponent } from './clients-planes.component';

describe('ClientsPlanesComponent', () => {
  let component: ClientsPlanesComponent;
  let fixture: ComponentFixture<ClientsPlanesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsPlanesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsPlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
