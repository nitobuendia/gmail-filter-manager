/** @fileoverview Tests string criteria. */

import * as string from '../../src/criteria/string';

describe('string', () => {
  describe('FromFilter', () => {
    describe('constructor', () => {
      it('sets without error', () => {
        const fromFilter = new string.FromFilter('value');

        expect(fromFilter).not.toBe(null);
      });

      [undefined, null, ''].forEach((filterValue) => {
        it(`throws error if value is ${filterValue}`, () => {
          expect(() => {
            new string.FromFilter(filterValue);
          }).toThrow(Error('Must specify filter value.'));
        });
      });
    });

    describe('toString', () => {
      [
        ['test@gmail.com', 'from:test@gmail.com'],
        ['-test@gmail.com', '-from:test@gmail.com'],
      ].forEach(([filterValue, expectedString]) => {
        it(`value ${filterValue} produces expected string`, () => {
          const fromFilter = new string.FromFilter(filterValue);

          const filterString = fromFilter.toString();

          expect(filterString).toEqual(expectedString);
        });
      });
    });
  });

  describe('ToFilter', () => {
    describe('constructor', () => {
      it('sets without error', () => {
        const toFilter = new string.ToFilter('value');

        expect(toFilter).not.toBe(null);
      });

      [undefined, null, ''].forEach((filterValue) => {
        it(`throws error if value is ${filterValue}`, () => {
          expect(() => {
            new string.ToFilter(filterValue);
          }).toThrow(Error('Must specify filter value.'));
        });
      });
    });

    describe('toString', () => {
      [
        ['test@gmail.com', 'to:test@gmail.com'],
        ['-test@gmail.com', '-to:test@gmail.com'],
      ].forEach(([filterValue, expectedString]) => {
        it(`value ${filterValue} produces expected string`, () => {
          const toFilter = new string.ToFilter(filterValue);

          const filterString = toFilter.toString();

          expect(filterString).toEqual(expectedString);
        });
      });
    });
  });

  describe('CcFilter', () => {
    describe('constructor', () => {
      it('sets without error', () => {
        const ccFilter = new string.CcFilter('value');

        expect(ccFilter).not.toBe(null);
      });

      [undefined, null, ''].forEach((filterValue) => {
        it(`throws error if value is ${filterValue}`, () => {
          expect(() => {
            new string.CcFilter(filterValue);
          }).toThrow(Error('Must specify filter value.'));
        });
      });
    });

    describe('toString', () => {
      [
        ['test@gmail.com', 'cc:test@gmail.com'],
        ['-test@gmail.com', '-cc:test@gmail.com'],
      ].forEach(([filterValue, expectedString]) => {
        it(`value ${filterValue} produces expected string`, () => {
          const ccFilter = new string.CcFilter(filterValue);

          const filterString = ccFilter.toString();

          expect(filterString).toEqual(expectedString);
        });
      });
    });
  });

  describe('BccFilter', () => {
    describe('constructor', () => {
      it('sets without error', () => {
        const bccFilter = new string.BccFilter('value');

        expect(bccFilter).not.toBe(null);
      });

      [undefined, null, ''].forEach((filterValue) => {
        it(`throws error if value is ${filterValue}`, () => {
          expect(() => {
            new string.BccFilter(filterValue);
          }).toThrow(Error('Must specify filter value.'));
        });
      });
    });

    describe('toString', () => {
      [
        ['test@gmail.com', 'bcc:test@gmail.com'],
        ['-test@gmail.com', '-bcc:test@gmail.com'],
      ].forEach(([filterValue, expectedString]) => {
        it(`value ${filterValue} produces expected string`, () => {
          const bccFilter = new string.BccFilter(filterValue);

          const filterString = bccFilter.toString();

          expect(filterString).toEqual(expectedString);
        });
      });
    });
  });

  describe('SubjectFilter', () => {
    describe('constructor', () => {
      it('sets without error', () => {
        const subjectFilter = new string.SubjectFilter('value');

        expect(subjectFilter).not.toBe(null);
      });

      [undefined, null, ''].forEach((filterValue) => {
        it(`throws error if value is ${filterValue}`, () => {
          expect(() => {
            new string.SubjectFilter(filterValue);
          }).toThrow(Error('Must specify filter value.'));
        });
      });
    });

    describe('toString', () => {
      [
        ['TestTopic', 'subject:TestTopic'],
        ['-TestTopic', '-subject:TestTopic'],
        ['Test Topic', 'subject:(Test Topic)'],
        ['-Test Topic', '-subject:(Test Topic)'],
        ['"Test Topic"', 'subject:("Test Topic")'],
        ['-"Test Topic"', '-subject:("Test Topic")'],
      ].forEach(([filterValue, expectedString]) => {
        it(`value ${filterValue} produces expected string`, () => {
          const subjectFilter = new string.SubjectFilter(filterValue);

          const filterString = subjectFilter.toString();

          expect(filterString).toEqual(expectedString);
        });
      });
    });
  });

  describe('LargerFilter', () => {
    describe('constructor', () => {
      it('sets without error', () => {
        const largerFilter = new string.LargerFilter('value');

        expect(largerFilter).not.toBe(null);
      });

      [undefined, null, ''].forEach((filterValue) => {
        it(`throws error if value is ${filterValue}`, () => {
          expect(() => {
            new string.LargerFilter(filterValue);
          }).toThrow(Error('Must specify filter value.'));
        });
      });
    });

    describe('toString', () => {
      [
        ['10MB', 'larger:10MB'],
        ['10485760', 'larger:10485760'],
        ['-10MB', '-larger:10MB'],
        ['-10485760', '-larger:10485760'],
      ].forEach(([filterValue, expectedString]) => {
        it(`value ${filterValue} produces expected string`, () => {
          const largerFilter = new string.LargerFilter(filterValue);

          const filterString = largerFilter.toString();

          expect(filterString).toEqual(expectedString);
        });
      });
    });
  });

  describe('SmallerFilter', () => {
    describe('constructor', () => {
      it('sets without error', () => {
        const smallerFilter = new string.SmallerFilter('value');

        expect(smallerFilter).not.toBe(null);
      });

      [undefined, null, ''].forEach((filterValue) => {
        it(`throws error if value is ${filterValue}`, () => {
          expect(() => {
            new string.SmallerFilter(filterValue);
          }).toThrow(Error('Must specify filter value.'));
        });
      });
    });

    describe('toString', () => {
      [
        ['10MB', 'smaller:10MB'],
        ['10485760', 'smaller:10485760'],
        ['-10MB', '-smaller:10MB'],
        ['-10485760', '-smaller:10485760'],
      ].forEach(([filterValue, expectedString]) => {
        it(`value ${filterValue} produces expected string`, () => {
          const smallerFilter = new string.SmallerFilter(filterValue);

          const filterString = smallerFilter.toString();

          expect(filterString).toEqual(expectedString);
        });
      });
    });
  });

  describe('FromDateFilter', () => {
    describe('constructor', () => {
      it('sets without error', () => {
        const fromDateFilter = new string.FromDateFilter('value');

        expect(fromDateFilter).not.toBe(null);
      });

      [undefined, null, ''].forEach((filterValue) => {
        it(`throws error if value is ${filterValue}`, () => {
          expect(() => {
            new string.FromDateFilter(filterValue);
          }).toThrow(Error('Must specify filter value.'));
        });
      });
    });

    describe('toString', () => {
      [
        ['1990-07-14', 'after:1990-07-14'],
        ['14/07/1990', 'after:14/07/1990'],
        ['-1990-07-14', '-after:1990-07-14'],
        ['-14/07/1990', '-after:14/07/1990'],
      ].forEach(([filterValue, expectedString]) => {
        it(`value ${filterValue} produces expected string`, () => {
          const fromDateFilter = new string.FromDateFilter(filterValue);

          const filterString = fromDateFilter.toString();

          expect(filterString).toEqual(expectedString);
        });
      });
    });
  });

  describe('ToDateFilter', () => {
    describe('constructor', () => {
      it('sets without error', () => {
        const toDateFilter = new string.ToDateFilter('value');

        expect(toDateFilter).not.toBe(null);
      });

      [undefined, null, ''].forEach((filterValue) => {
        it(`throws error if value is ${filterValue}`, () => {
          expect(() => {
            new string.ToDateFilter(filterValue);
          }).toThrow(Error('Must specify filter value.'));
        });
      });
    });

    describe('toString', () => {
      [
        ['1990-07-14', 'before:1990-07-14'],
        ['14/07/1990', 'before:14/07/1990'],
        ['-1990-07-14', '-before:1990-07-14'],
        ['-14/07/1990', '-before:14/07/1990'],
      ].forEach(([filterValue, expectedString]) => {
        it(`value ${filterValue} produces expected string`, () => {
          const toDateFilter = new string.ToDateFilter(filterValue);

          const filterString = toDateFilter.toString();

          expect(filterString).toEqual(expectedString);
        });
      });
    });
  });

  describe('OlderThanFilter', () => {
    describe('constructor', () => {
      it('sets without error', () => {
        const olderThanFilter = new string.OlderThanFilter('value');

        expect(olderThanFilter).not.toBe(null);
      });

      [undefined, null, ''].forEach((filterValue) => {
        it(`throws error if value is ${filterValue}`, () => {
          expect(() => {
            new string.OlderThanFilter(filterValue);
          }).toThrow(Error('Must specify filter value.'));
        });
      });
    });

    describe('toString', () => {
      [
        ['1990-07-14', 'older_than:1990-07-14'],
        ['14/07/1990', 'older_than:14/07/1990'],
        ['-1990-07-14', '-older_than:1990-07-14'],
        ['-14/07/1990', '-older_than:14/07/1990'],
      ].forEach(([filterValue, expectedString]) => {
        it(`value ${filterValue} produces expected string`, () => {
          const olderThanFilter = new string.OlderThanFilter(filterValue);

          const filterString = olderThanFilter.toString();

          expect(filterString).toEqual(expectedString);
        });
      });
    });
  });

  describe('NewerThanFilter', () => {
    describe('constructor', () => {
      it('sets without error', () => {
        const newerThanFilter = new string.NewerThanFilter('value');

        expect(newerThanFilter).not.toBe(null);
      });

      [undefined, null, ''].forEach((filterValue) => {
        it(`throws error if value is ${filterValue}`, () => {
          expect(() => {
            new string.NewerThanFilter(filterValue);
          }).toThrow(Error('Must specify filter value.'));
        });
      });
    });

    describe('toString', () => {
      [
        ['1990-07-14', 'newer_than:1990-07-14'],
        ['14/07/1990', 'newer_than:14/07/1990'],
        ['-1990-07-14', '-newer_than:1990-07-14'],
        ['-14/07/1990', '-newer_than:14/07/1990'],
      ].forEach(([filterValue, expectedString]) => {
        it(`value ${filterValue} produces expected string`, () => {
          const newerThanFilter = new string.NewerThanFilter(filterValue);

          const filterString = newerThanFilter.toString();

          expect(filterString).toEqual(expectedString);
        });
      });
    });
  });

  describe('FilenameFilter', () => {
    describe('constructor', () => {
      it('sets without error', () => {
        const filenameFilter = new string.FilenameFilter('value');

        expect(filenameFilter).not.toBe(null);
      });

      [undefined, null, ''].forEach((filterValue) => {
        it(`throws error if value is ${filterValue}`, () => {
          expect(() => {
            new string.FilenameFilter(filterValue);
          }).toThrow(Error('Must specify filter value.'));
        });
      });
    });

    describe('toString', () => {
      [
        ['file.pdf', 'filename:file.pdf'],
        ['other_filename.txt', 'filename:other_filename.txt'],
        ['-file.pdf', '-filename:file.pdf'],
        ['-other_filename.txt', '-filename:other_filename.txt'],
      ].forEach(([filterValue, expectedString]) => {
        it(`value ${filterValue} produces expected string`, () => {
          const filenameFilter = new string.FilenameFilter(filterValue);

          const filterString = filenameFilter.toString();

          expect(filterString).toEqual(expectedString);
        });
      });
    });
  });

  describe('InLabelFilter', () => {
    describe('constructor', () => {
      it('sets without error', () => {
        const inLabelFilter = new string.InLabelFilter('value');

        expect(inLabelFilter).not.toBe(null);
      });

      [undefined, null, ''].forEach((filterValue) => {
        it(`throws error if value is ${filterValue}`, () => {
          expect(() => {
            new string.InLabelFilter(filterValue);
          }).toThrow(Error('Must specify filter value.'));
        });
      });
    });

    describe('toString', () => {
      [
        ['Label', 'in:Label'],
        ['Other Label', 'in:(Other Label)'],
        ['CATEGORY_PROMOTIONS', 'in:CATEGORY_PROMOTIONS'],
        ['-Label', '-in:Label'],
        ['-Other Label', '-in:(Other Label)'],
        ['-CATEGORY_PROMOTIONS', '-in:CATEGORY_PROMOTIONS'],
      ].forEach(([filterValue, expectedString]) => {
        it(`value ${filterValue} produces expected string`, () => {
          const inLabelFilter = new string.InLabelFilter(filterValue);

          const filterString = inLabelFilter.toString();

          expect(filterString).toEqual(expectedString);
        });
      });
    });
  });
});
