/** @fileoverview Test special criteria. */

import * as special from '../../src/criteria/special';

describe('special', () => {
  describe('HasWordsFilter', () => {
    describe('constructor', () => {
      it('sets without error', () => {
        const hasWordsFilter = new special.HasWordsFilter('potato');

        expect(hasWordsFilter).not.toBe(null);
      });

      [undefined, null, ''].forEach((filterValue) => {
        it(`throws error if value is ${filterValue}`, () => {
          expect(() => {
            new special.HasWordsFilter(filterValue);
          }).toThrow(Error('Must specify filter value.'));
        });
      });
    });

    describe('toString', () => {
      [
        ['potato', 'potato'],
        ['other value', '(other value)'],
        ['numbers 123', '(numbers 123)'],
        ['!$special', '!$special'],
        ['  with trim    ', '(with trim)'],
        ['-potato', '-potato'],
        ['-other value', '-(other value)'],
        ['-numbers 123', '-(numbers 123)'],
        ['-!$special', '-!$special'],
        ['  -with trim    ', '-(with trim)'],
      ].forEach(([word, expectedWord]) => {
        it(`has words ${word} produces expected output string`, () => {
          const hasWordsFilter = new special.HasWordsFilter(word);

          const filterString = hasWordsFilter.toString();

          expect(filterString).toEqual(expectedWord);
        });
      });
    });
  });

  describe('NameFilter', () => {
    describe('constructor', () => {
      it('sets without error', () => {
        const nameFilter = new special.NameFilter('potato');

        expect(nameFilter).not.toBe(null);
      });

      [undefined, null, ''].forEach((filterValue) => {
        it(`throws error if value is ${filterValue}`, () => {
          expect(() => {
            new special.NameFilter(filterValue);
          }).toThrow(Error('Must specify filter value.'));
        });
      });
    });

    describe('toString', () => {
      const FakeIndividualFilter = {
        filter: {
          toString: () => '(test value)',
        },
      };
      const FakeFilterMap = new Map([
        ['fake-filter', FakeIndividualFilter],
      ]);
      const FakeFilter = {
        getFilterMap: () => FakeFilterMap,
      };

      ['fake-filter', '  fake-filter    '].forEach((testFilterName) => {
        it(`name filter ${testFilterName} delegates toString`, () => {
          const nameFilter = new special.NameFilter(testFilterName, FakeFilter);

          const filterString = nameFilter.toString();

          expect(filterString).toEqual('(test value)');
        });
      });

      ['-fake-filter', '  -fake-filter    '].forEach((testFilterName) => {
        it(`name filter ${testFilterName} is negative and delegated`, () => {
          const nameFilter = new special.NameFilter(testFilterName, FakeFilter);

          const filterString = nameFilter.toString();

          expect(filterString).toEqual('-(test value)');
        });
      });

      it('throws error if filter name is not found', () => {
        const nameFilter = new special.NameFilter('non-existing', FakeFilter);

        expect(() => {
          nameFilter.toString();
        }).toThrow(Error('Filter name non-existing not found.'));
      });

      [undefined, null, ''].forEach((filterValue) => {
        it(`throws error if value is ${filterValue}`, () => {
          expect(() => {
            new special.NameFilter(filterValue);
          }).toThrow(Error('Must specify filter value.'));
        });
      });
    });
  });
});
