/** @fileoverview Processes local filters into actionable classes. */

import {
  ActionOptions,
  FilterAction,
} from '../action/filter_action'

import {
  AndOperator,
  OperatorOptions,
  OrOperator,
} from '../criteria/operator'

import {
  GmailFilter,
} from './gmail_filter'

/**
 * @typedef {{
 *   name: string,
 *   filter: !OperatorOptions,
 *   action: !ActionOptions|undefined,
 * }}
 */
let FilterOptions;


/** @const {string} Id matcher string. */
const ID_MATCHER_STRING = '{id}';

/** @const {string} Id builder for filter identification. */
const ID_MATCH = `-{"📧 GmailFilterId: ${ID_MATCHER_STRING}"}`;

/** @const {!RegExp} Regexp for id identification. */
const ID_MATCH_REGEXP = new RegExp(
  ID_MATCH.replace(ID_MATCHER_STRING, '(.*?)')
);

/** @const {!Map<string, !Filter>} Local list of filters mapped to its name. */
const LOCAL_FILTER_MAP = new Map();

/**
 * Local definition of a Gmail filter.
 */
class Filter {

  /**
   * Gets a register of all local named filters.
   * @return {!Map<string, !Filter>} Local list of filters mapped to its name.
   */
  static getFilterMap() {
    return LOCAL_FILTER_MAP;
  }

  /**
   * @param {!FilterOptions} filterOptions
   */
  constructor(filterOptions) {
    /** @const {string} */
    this.name = this._parseFilterName(filterOptions);
    /** @const {!AndOperator|!OrOperator} */
    this.filter = this._parseFilterOperator(filterOptions);
    /** @const {!FilterAction} */
    this.action = this._parseFilterAction(filterOptions);
  }


  /**
   * Checks whether a filter is managed.
   * @param {string} filterQueryString
   * @return {boolean} Whether this is an automated filter.
   */
  static isManagedFilter(filterQueryString) {
    if (!filterQueryString) return false;
    return ID_MATCH_REGEXP.test(filterQueryString);
  }

  /**
   * Returns label name from a managed query string.
   * @param {string} filterQueryString
   * @return {?string} Name of the automated filter.
   */
  static getManagedFilterName(filterQueryString) {
    if (!filterQueryString) return null;
    const matches = ID_MATCH_REGEXP.exec(filterQueryString);
    if (matches && matches.length > 0) return matches[1];
    return null;
  }


  /**
   * Parses filter actions from options.
   * @param {!FilterOptions|undefined} filterOptions
   * @return {!FilterAction} Filter actions.
   */
  _parseFilterAction(filterOptions) {
    if (!filterOptions) return new FilterAction({});
    if (!filterOptions.action) return new FilterAction({});
    return new FilterAction(filterOptions.action);
  }

  /**
   * Parses filter name from options.
   * @param {!FilterOptions} filterOptions
   * @throw {!Error} Name is a required field.
   * @throw {!Error} Filter name already exists. No duplicates allowed.
   * @return {string} Filter name.
   */
  _parseFilterName(filterOptions) {
    if (!filterOptions.name) throw new Error('Name is a required field.');
    if (Filter.getFilterMap().has(filterOptions.name)) {
      throw new Error(`Filter name ${filterOptions.name} already exists.`);
    }
    Filter.getFilterMap().set(filterOptions.name, this);
    return filterOptions.name;
  }

  /**
   * Parses filter operator and matchers from options.
   * @param {!FilterOptions} filterOperator
   * @throw {!Error} Filter matching rule is required.
   * @return {!AndOperator|!OrOperator} Parsed filter operator.
   */
  _parseFilterOperator(filterOptions) {
    if (filterOptions.filter.and) {
      return /** !AndOperator */ new AndOperator(filterOptions.filter.and);
    } else if (filterOptions.filter.or) {
      return /** !OrOperator */ new OrOperator(filterOptions.filter.or);
    } else {
      throw new Error('Must specify a filter matching rule.');
    }
  }

  /** @return Id of the filter. */
  getId() {
    return ID_MATCH.replace(ID_MATCHER_STRING, this.name);
  }

  /** @return {string} Filter rule string query. */
  toString() {
    return `${this.filter.toString()} ${this.getId()}`;
  }

  /** @return {!GmailFilter} Casts filter as a Gmail filter. */
  castAsGmailFilter() {
    return new GmailFilter({
      id: '',
      action: this.action.castAsGmailFilterAction(),
      criteria: {
        query: this.toString(),
      },
    });
  }
}


export {
  Filter,
};
