import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayQuestsByOtherComponent } from './display-quests-by-other.component';

describe('DisplayQuestsByOtherComponent', () => {
  let component: DisplayQuestsByOtherComponent;
  let fixture: ComponentFixture<DisplayQuestsByOtherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayQuestsByOtherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayQuestsByOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
