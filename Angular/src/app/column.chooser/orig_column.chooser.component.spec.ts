import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Column.ChooserComponent } from './column.chooser.component';

describe('Column.ChooserComponent', () => {
  let component: Column.ChooserComponent;
  let fixture: ComponentFixture<Column.ChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Column.ChooserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Column.ChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
