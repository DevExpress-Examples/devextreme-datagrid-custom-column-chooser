import { TestBed } from '@angular/core/testing';
import { Service } from './app.service';

describe('AppService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [

      ],
      providers: [Service],
    }).compileComponents();
  });

  it('should be created', () => {
    const service = TestBed.inject(Service);
    expect(service).toBeTruthy();
  });
});
