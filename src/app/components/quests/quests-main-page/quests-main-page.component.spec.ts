import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestsMainPageComponent } from './quests-main-page.component';

describe('QuestsMainPageComponent', () => {
  let component: QuestsMainPageComponent;
  let fixture: ComponentFixture<QuestsMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestsMainPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestsMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
