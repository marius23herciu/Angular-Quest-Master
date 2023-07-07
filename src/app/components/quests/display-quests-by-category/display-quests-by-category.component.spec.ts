import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayQuestsByCategoryComponent } from './display-quests-by-category.component';

describe('DisplayQuestsByCategoryComponent', () => {
  let component: DisplayQuestsByCategoryComponent;
  let fixture: ComponentFixture<DisplayQuestsByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayQuestsByCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayQuestsByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
