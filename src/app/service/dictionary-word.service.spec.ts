import { TestBed } from '@angular/core/testing';

import { DictionaryWordService } from './dictionary-word.service';

describe('DictionaryWordService', () => {
  let service: DictionaryWordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DictionaryWordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
