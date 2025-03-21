/** @fileoverview Tests compare helper library. */

import * as compare from '../../src/helper/compare';

describe('compare', () => {

  describe('hasArraySameUniqueElements', () => {

    it('returns true when you pass the same array twice', () => {
      const arrA = [1, '2', undefined, null, {}];

      const result = compare.hasArraySameUniqueElements(arrA, arrA);

      expect(result).toBe(true);
    });

    it('returns true when arrays contain the same elements in the same order',
      () => {
        const arrA = [1, '2', undefined];
        const arrB = [1, '2', undefined];

        const result = compare.hasArraySameUniqueElements(arrA, arrB);

        expect(result).toBe(true);
      });

    it('returns true when arrays contain equivalent objects', () => {
      const arrA = [{}, {
        'a': 0
      }, new Set('z')];
      const arrB = [{}, {
        'a': 0
      }, new Set('z')];

      const result = compare.hasArraySameUniqueElements(arrA, arrB);

      expect(result).toBe(true);
    });

    it(
      'returns true when arrays contain the same elements, ' +
      'but in different order', () => {
        const arrA = [1, 2, 3];
        const arrB = [3, 1, 2];

        const result = compare.hasArraySameUniqueElements(arrA, arrB);

        expect(result).toBe(true);
      });

    it(
      'returns true when arrays contain the same, ' +
      'but duplicated elements', () => {
        const arrA = [0, 0, 1];
        const arrB = [0, 1];

        const result = compare.hasArraySameUniqueElements(arrA, arrB);

        expect(result).toBe(true);
      });

    it('returns true when arrays are both empty', () => {
      const arrA = [];
      const arrB = [];

      const result = compare.hasArraySameUniqueElements(arrA, arrB);

      expect(result).toBe(true);
    });

    it('returns true when arrays are both not passed', () => {
      const result = compare.hasArraySameUniqueElements();

      expect(result).toBe(true);
    });

    it('returns true when one array is not passed and the other is empty',
      () => {
        const arrA = [];

        const result = compare.hasArraySameUniqueElements(arrA);

        expect(result).toBe(true);
      });


    it('returns false when arrays contain all different elements', () => {
      const arrA = ['a', 1, undefined];
      const arrB = ['x', 3, null];

      const result = compare.hasArraySameUniqueElements(arrA, arrB);

      expect(result).toBe(false);
    });

    it(
      'returns false when arrays contain similar elements, ' +
      'but different typing', () => {
        const arrA = ['0', 1, 2];
        const arrB = [0, '1', '2'];

        const result = compare.hasArraySameUniqueElements(arrA, arrB);

        expect(result).toBe(false);
      });

    it('returns false when 1st array contain a subset of the 2nd', () => {
      const arrA = [1, 2];
      const arrB = [1, 2, 3];

      const result = compare.hasArraySameUniqueElements(arrA, arrB);

      expect(result).toBe(false);
    });

    it('returns false when 2nd array contains a subset of the 1st', () => {
      const arrA = [1, 2, 3];
      const arrB = [1, 2];

      const result = compare.hasArraySameUniqueElements(arrA, arrB);

      expect(result).toBe(false);
    });

    it('returns false when one array is empty and the other is not', () => {
      const arrA = [];
      const arrB = [1, 2, 3];

      const result = compare.hasArraySameUniqueElements(arrA, arrB);

      expect(result).toBe(false);
    });
  });


  describe('isEmptyObject', () => {
    it('returns true when object is empty', () => {
      const obj = {};

      const result = compare.isEmptyObject(obj);

      expect(result).toBe(true);
    });

    it('returns false when object has undefined properties', () => {
      const obj = {
        'a': undefined,
      };

      const result = compare.isEmptyObject(obj);

      expect(result).toBe(false);
    });

    it('returns false when object has empty string keys', () => {
      const obj = {
        '': 'value'
      };

      const result = compare.isEmptyObject(obj);

      expect(result).toBe(false);
    });

    it('returns false when object has multiple properties', () => {
      const obj = {
        'a': 'value',
        'b': 0,
      };

      const result = compare.isEmptyObject(obj);

      expect(result).toBe(false);
    });
  });


  describe('isSetEqual', () => {

    it('returns true when Sets are themselves', () => {
      const setA = new Set([1, '2', undefined, null, {}]);

      const result = compare.isSetEqual(setA, setA);

      expect(result).toBe(true);
    });

    it('returns true when Sets contain the same elements and order', () => {
      const setA = new Set([1, '2', undefined]);
      const setB = new Set([1, '2', undefined]);

      const result = compare.isSetEqual(setA, setB);

      expect(result).toBe(true);
    });

    it('returns true when Sets contain equivalent objects', () => {
      const setA = new Set([{}, {
        'a': 0
      }, new Set('z')]);
      const setB = new Set([{}, {
        'a': 0
      }, new Set('z')]);

      const result = compare.isSetEqual(setA, setB);

      expect(result).toBe(true);
    });

    it(
      'returns true when Sets contain the same elements, ' +
      'but in a different order',
      () => {
        const setA = new Set([1, 2, 3]);
        const setB = new Set([3, 1, 2]);

        const result = compare.isSetEqual(setA, setB);

        expect(result).toBe(true);
      });

    it(
      'returns true when Sets contain the same, ' +
      'but duplicated elements at creation time', () => {
        const setA = new Set([0, 0, 1]);
        const setB = new Set([0, 1]);

        const result = compare.isSetEqual(setA, setB);

        expect(result).toBe(true);
      });

    it('returns true when Sets are both empty', () => {
      const setA = new Set([]);
      const setB = new Set([]);

      const result = compare.isSetEqual(setA, setB);

      expect(result).toBe(true);
    });

    it('returns false when Sets contain all different elements', () => {
      const setA = new Set(['a', 1, undefined]);
      const setB = new Set(['x', 3, null]);

      const result = compare.isSetEqual(setA, setB);

      expect(result).toBe(false);
    });

    it('returns false when Sets contain similar elements, but different typing',
      () => {
        const setA = new Set(['0', 1, 2]);
        const setB = new Set([0, '1', '2']);

        const result = compare.isSetEqual(setA, setB);

        expect(result).toBe(false);
      });

    it('returns false when 1st Set contains a subset of the 2nd', () => {
      const setA = new Set([1, 2]);
      const setB = new Set([1, 2, 3]);

      const result = compare.isSetEqual(setA, setB);

      expect(result).toBe(false);
    });

    it('returns false when 2nd Set contains a subset of the 1st', () => {
      const setA = new Set([1, 2, 3]);
      const setB = new Set([1, 2]);

      const result = compare.isSetEqual(setA, setB);

      expect(result).toBe(false);
    });
  });
});
