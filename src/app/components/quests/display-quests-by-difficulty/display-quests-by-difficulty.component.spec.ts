import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayQuestsByDifficultyComponent } from './display-quests-by-difficulty.component';

describe('DisplayQuestsByDifficultyComponent', () => {
  let component: DisplayQuestsByDifficultyComponent;
  let fixture: ComponentFixture<DisplayQuestsByDifficultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayQuestsByDifficultyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayQuestsByDifficultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
