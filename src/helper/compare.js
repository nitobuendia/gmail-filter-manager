/** @fileoverview Object and Array comparison helper. */

const deepEqual = require('deep-equal');

/**
 * Compares 2 arrays and returns true if both contains the same unique elements.
 * Equality is fulfilled if: Arrays contain the same elements, in the same order
 * or not, after removing duplicates.
 * @param {!Array<*>} arrayA
 * @param {!Array<*>} arrayB
 * @return {boolean} Whether defined equality is true.
 */
function hasArraySameUniqueElements(arrayA, arrayB) {
  const setA = new Set(arrayA || []);
  const setB = new Set(arrayB || []);
  return isSetEqual(setA, setB);
}

/**
 * Checks whether an object is empty.
 * @param {!Object} obj Object to check whether it's empty.
 * @return {boolean} Whether object is empty.
 */
function isEmptyObject(obj) {
  for (const key in obj) return false;
  return true;
}

/**
 * Compares 2 Sets and returns true if both contains the same elements.
 * Equality is fulfilled if: Sets contains the same elements in the same order
 * or not.
 * @param {!Set<*>} setA
 * @param {!Set<*>} setB
 * @return {boolean} Whether defined equality is true.
 */
function isSetEqual(setA, setB) {
  return deepEqual(setA, setB, {
    strict: true
  });
}


export {
  hasArraySameUniqueElements,
  isEmptyObject,
  isSetEqual,
};
