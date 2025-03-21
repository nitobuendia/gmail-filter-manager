/** @fileoverview Provides special filters which do not follow common rules. */

import {
  FilterMatch,
} from './base'

import {
  Filter,
} from '../filter/local_filter'

/**
 * Custom supported filter matchers.
 * @typedef {{
 *   name: !OptionalString,
 * }}
 */
let CustomFilterMatchOptions;


class HasWordsFilter extends FilterMatch {
  /**
   * @param {string} filterValue
   * @throw {!Error} Filter value is required.
   */
  constructor(filterValue) {
    super();
    if (!filterValue) throw new Error('Must specify filter value.');
    this.filterValue = filterValue.trim();
  }

  /**
   * @return {string} Filter rule string query.
   */
  toString() {
    let filterValue = this.filterValue;

    let preString = '';
    if (filterValue[0] === '-') {
      preString += '-';
      filterValue = filterValue.substr(1);
    }

    if (filterValue.includes(' ')) filterValue = `(${filterValue})`;
    return `${preString}${filterValue}`;
  }
}

class NameFilter extends FilterMatch {
  /**
   * WARNING: This filter can cause infinite recursion and crash.
   * @param {string} filterValue
   * @throw {!Error} Filter value is required.
   */
  constructor(filterValue, filterClass = Filter) {
    super();
    if (!filterValue) throw new Error('Must specify filter value.');
    this.filterValue = filterValue.trim();
    this._filterClass = filterClass;
  }

  /**
   * @throw {!Error} Filter name rule not found.
   * @return {string} Filter rule string query.
   */
  toString() {
    let filterValue = this.filterValue;

    let preString = '';
    if (filterValue[0] === '-') {
      preString += '-';
      filterValue = filterValue.substr(1);
    }

    if (!this._filterClass.getFilterMap().has(filterValue)) {
      throw new Error(`Filter name ${filterValue} not found.`);
    }

    const filter = this._filterClass.getFilterMap().get(filterValue);
    return preString + filter.filter.toString();
  }
}


export {
  CustomFilterMatchOptions,
  HasWordsFilter,
  NameFilter,
};
