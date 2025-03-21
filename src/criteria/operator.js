/** @fileoverview Provides Filter operators. */

import {
  FilterMatch,
  FilterMatchOptions,
} from './base'

import {
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
} from './boolean'

import {
  CustomFilterMatchOptions,
  NameFilter,
  HasWordsFilter,
} from './special'

import {
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
} from './string'

/**
 * @typedef {{
 *   or: !OptionalOrRepeatedOrOperator,
 *   ...FilterMatchOptions,
 *   ...CustomFilterMatchOptions,
 * }}
 */
let AndOperatorOptions;

/** @type {!AndOperatorOptions|!Array<!AndOperatorOptions>|undefined} */
let OptionalOrRepeatedAndOperatorOptions;

/**
 * @typedef {{
 *   and: !OptionalOrRepeatedAndOperator
 *   ...FilterMatchOptions,
 *   ...CustomFilterMatchOptions,
 * }}
 */
let OrOperatorOptions;

/** @type {!OrOperatorOptions|!Array<!OrOperatorOptions>|undefined} */
let OptionalOrRepeatedOrOperatorOptions;

/** @type {!AndOperatorOptions|!OrOperatorOptions} */
let OperatorOptions;


/**
 * Base operators for filters. Contains main logic.
 */
class Operator extends FilterMatch {
  /**
   * @param {!OperatorOptions} operatorOptions
   * @throw {!Error} Must specify at least one filter/operand.
   */
  constructor(operatorOptions) {
    super();
    this.operator = '';
    this.operands = this._processOperands(operatorOptions);

    if (!this.operands || !this.operands.length || this.operands.length === 0) {
      throw new Error('Must specify at least one operand filter.');
    }
  }

  /**
   * @param {!OperatorOptions} operatorOptions
   * @return {!Array<!FilterMatch>} List of operand filters.
   */
  _processOperands(operatorOptions) {
    const operands = [];
    const filterList = Object.entries(operatorOptions);
    for (let [filterType, filterValue] of filterList) {
      if (!Array.isArray(filterValue)) filterValue = [filterValue];
      for (const singleFilterValue of filterValue) {
        const filter = this._processFilterType(filterType, singleFilterValue);
        if (!filter) continue;
        operands.push(filter)
      }
    }
    return operands;
  }

  /**
   * Identifies and selects one filter (or operator) based on type.
   * @param {string} filterType Type of filter matcher rule.
   * @param {!FilterMatchValue} filterValue Value of the filter.
   */
  _processFilterType(filterType, filterValue) {
    if (!filterValue) return;
    switch (filterType) {
      case 'and':
        return new AndOperator(filterValue);
      case 'or':
        return new OrOperator(filterValue);
      case 'name':
        return new NameFilter(filterValue);
      case 'from':
        return new FromFilter(filterValue);
      case 'to':
        return new ToFilter(filterValue);
      case 'cc':
        return new CcFilter(filterValue);
      case 'bcc':
        return new BccFilter(filterValue);
      case 'subject':
        return new SubjectFilter(filterValue);
      case 'hasWords':
        return new HasWordsFilter(filterValue);
      case 'larger':
        return new LargerFilter(filterValue);
      case 'smaller':
        return new SmallerFilter(filterValue);
      case 'fromDate':
        return new FromDateFilter(filterValue);
      case 'toDate':
        return new ToDateFilter(filterValue);
      case 'olderThan':
        return new OlderThanFilter(filterValue);
      case 'newerThan':
        return new NewerThanFilter(filterValue);
      case 'hasAttachment':
        return new HasAttachmentFilter(filterValue);
      case 'filename':
        return new FilenameFilter(filterValue);
      case 'hasDrive':
        return new HasDriveFilter(filterValue);
      case 'hasDocument':
        return new HasDocumentFilter(filterValue);
      case 'hasNoUserLabels':
        return new HasNoUserLabelsFilter(filterValue);
      case 'hasSpreadsheet':
        return new HasSpreadsheetFilter(filterValue);
      case 'hasPresentation':
        return new HasPresentationFilter(filterValue);
      case 'hasYouTube':
        return new HasYouTubeFilter(filterValue);
      case 'isChat':
        return new IsChatFilter(filterValue);
      case 'isImportant':
        return new IsImportantFilter(filterValue);
      case 'isStarred':
        return new IsStarredFilter(filterValue);
      case 'isSnoozed':
        return new IsSnoozedFilter(filterValue);
      case 'isUnread':
        return new IsUnreadFilter(filterValue);
      case 'isRead':
        return new IsReadFilter(filterValue);
      case 'inLabel':
        return new InLabelFilter(filterValue);
    }
  }

  /**
   * @throw {!Error} Must specify type of operator.
   * @return {string} Filter rule string query.
   */
  toString() {
    if (!this.operator) throw new Error('Operator must be specified.');
    const operandStringList =
      this.operands.map((operand) => operand.toString());
    const operandString = operandStringList.join(` ${this.operator} `);
    return `{${operandString}}`;
  }
}

/**
 * And Operator for filters.
 */
class AndOperator extends Operator {
  /**
   * @throw {!Error} And must not contain another And.
   * @param {!AndOperatorOptions} andOperatorOptions
   */
  constructor(andOperatorOptions) {
    if (andOperatorOptions.and) {
      throw new Error('AND operator must not contain another AND operator.');
    }
    super(andOperatorOptions);
    this.operator = 'AND';
  }
}

/**
 * Or Operator for filters.
 */
class OrOperator extends Operator {
  /**
   * @throw {!Error} And must not contain another And.
   * @param {!OrOperatorOptions} orOperatorOptions
   */
  constructor(orOperatorOptions) {
    if (orOperatorOptions.or) {
      throw new Error('OR operator must not contain another OR operator.');
    }
    super(orOperatorOptions);
    this.operator = 'OR';
  }
}

export {
  AndOperator,
  OperatorOptions,
  OrOperator,
};
