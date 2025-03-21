/** @fileoverview Provides string filters. */

import {
  FilterMatch,
} from './base'


/**
 * Base string filter.
 */
class StringFilter extends FilterMatch {
  /**
   * @param {string} filterName
   * @param {string} filterValue
   * @param {boolean=} lowerCase Whether to force lower case.
   * @throw {!Error} Filter name is required.
   * @throw {!Error} Filter value is required.
   */
  constructor(filterName, filterValue, forceLowerCase = true) {
    super();
    if (!filterName) throw new Error('Must specify filter type.');
    if (!filterValue) throw new Error('Must specify filter value.');

    this.filterName = filterName;
    this.filterValue = filterValue.trim();
    this.forceLowerCase = forceLowerCase;
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

    if (this.forceLowerCase) filterValue.toLowerCase();
    if (filterValue.includes(' ')) filterValue = `(${filterValue})`;

    return `${preString}${this.filterName}:${filterValue}`;
  }
}


class FromFilter extends StringFilter {
  constructor(filterValue) {
    super('from', filterValue, true);
  }
}

class ToFilter extends StringFilter {
  constructor(filterValue) {
    super('to', filterValue, true);
  }
}

class CcFilter extends StringFilter {
  constructor(filterValue) {
    super('cc', filterValue, true);
  }
}

class BccFilter extends StringFilter {
  constructor(filterValue) {
    super('bcc', filterValue, true);
  }
}

class SubjectFilter extends StringFilter {
  constructor(filterValue) {
    super('subject', filterValue, false);
  }
}

class LargerFilter extends StringFilter {
  constructor(filterValue) {
    super('larger', filterValue, true);
  }
}

class SmallerFilter extends StringFilter {
  constructor(filterValue) {
    super('smaller', filterValue, true);
  }
}

class FromDateFilter extends StringFilter {
  constructor(filterValue) {
    super('after', filterValue, true);
  }
}

class ToDateFilter extends StringFilter {
  constructor(filterValue) {
    super('before', filterValue, true);
  }
}

class OlderThanFilter extends StringFilter {
  constructor(filterValue) {
    super('older_than', filterValue, true);
  }
}

class NewerThanFilter extends StringFilter {
  constructor(filterValue) {
    super('newer_than', filterValue, true);
  }
}

class FilenameFilter extends StringFilter {
  constructor(filterValue) {
    super('filename', filterValue, true);
  }
}

class InLabelFilter extends StringFilter {
  constructor(filterValue) {
    super('in', filterValue, true);
  }
}


export {
  BccFilter,
  CcFilter,
  FilenameFilter,
  FromDateFilter,
  FromFilter,
  InLabelFilter,
  LargerFilter,
  NewerThanFilter,
  OlderThanFilter,
  SmallerFilter,
  SubjectFilter,
  ToDateFilter,
  ToFilter,
};
