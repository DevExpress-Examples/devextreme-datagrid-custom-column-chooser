import { TestBed } from '@angular/core/testing';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { DxListModule } from 'devextreme-angular/ui/list';
import { ColumnChooserComponent } from './column.chooser.component';

describe('Column.ChooserComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DxPopupModule,
        DxListModule,
      ],
      declarations: [ColumnChooserComponent],
    })
      .compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ColumnChooserComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
