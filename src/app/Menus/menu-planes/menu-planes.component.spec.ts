import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPlanesComponent } from './menu-planes.component';

describe('MenuPlanesComponent', () => {
  let component: MenuPlanesComponent;
  let fixture: ComponentFixture<MenuPlanesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuPlanesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuPlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
