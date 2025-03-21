/** @fileoverview Provides boolean filters. */

import {
  FilterMatch,
} from './base'

/**
 * Base boolean filter.
 */
class BooleanFilter extends FilterMatch {
  /**
   * @param {string} filterName
   * @param {string} filterValue
   * @param {boolean} booleanValue
   * @throw {!Error} Filter name is required.
   * @throw {!Error} Filter value is required.
   */
  constructor(filterName, filterValue, booleanValue) {
    super();
    if (!filterName) throw new Error('Must specify filter type.');
    if (!filterValue) throw new Error('Must specify filter value.');
    if (typeof booleanValue !== 'boolean') {
      throw new Error('Must specify a boolean filter value.');
    }

    this.filterName = filterName;
    this.filterValue = filterValue;
    this.booleanValue = booleanValue;
  }

  /**
   * @return {string} Filter rule string query.
   */
  toString() {
    const preString = `${this.booleanValue ? '' : '-'}`
    return `${preString}${this.filterName}:${this.filterValue}`;
  }
}


/**
 * Base Has filter.
 */
class HasFilter extends BooleanFilter {
  /**
   * @param {string} filterValue
   * @param {boolean} booleanValue
   */
  constructor(filterValue, booleanValue) {
    super('has', filterValue, booleanValue);
  }
}

class HasAttachmentFilter extends HasFilter {
  constructor(booleanValue) {
    super('attachment', booleanValue);
  }
}

class HasDriveFilter extends HasFilter {
  constructor(booleanValue) {
    super('drive', booleanValue);
  }
}

class HasDocumentFilter extends HasFilter {
  constructor(booleanValue) {
    super('document', booleanValue);
  }
}

class HasNoUserLabelsFilter extends HasFilter {
  constructor(booleanValue) {
    super('nouserlabels', booleanValue);
  }
}

class HasSpreadsheetFilter extends HasFilter {
  constructor(booleanValue) {
    super('spreadsheet', booleanValue);
  }
}

class HasPresentationFilter extends HasFilter {
  constructor(booleanValue) {
    super('presentation', booleanValue);
  }
}

class HasYouTubeFilter extends HasFilter {
  constructor(booleanValue) {
    super('youtube', booleanValue);
  }
}


/**
 * Base Is filter.
 */
class IsFilter extends BooleanFilter {
  /**
   * @param {string} filterValue
   * @param {boolean} booleanValue
   */
  constructor(filterValue, booleanValue) {
    super('is', filterValue, booleanValue);
  }
}

class IsChatFilter extends IsFilter {
  constructor(booleanValue) {
    super('chat', booleanValue);
  }
}

class IsImportantFilter extends IsFilter {
  constructor(booleanValue) {
    super('important', booleanValue);
  }
}
class IsStarredFilter extends IsFilter {
  constructor(booleanValue) {
    super('starred', booleanValue);
  }
}
class IsSnoozedFilter extends IsFilter {
  constructor(booleanValue) {
    super('snoozed', booleanValue);
  }
}
class IsUnreadFilter extends IsFilter {
  constructor(booleanValue) {
    super('unread', booleanValue);
  }
}
class IsReadFilter extends IsFilter {
  constructor(booleanValue) {
    super('read', booleanValue);
  }
}


export {
  HasAttachmentFilter,
  HasDriveFilter,
  HasDocumentFilter,
  HasNoUserLabelsFilter,
  HasSpreadsheetFilter,
  HasPresentationFilter,
  HasYouTubeFilter,
  IsChatFilter,
  IsImportantFilter,
  IsStarredFilter,
  IsSnoozedFilter,
  IsUnreadFilter,
  IsReadFilter,
};
