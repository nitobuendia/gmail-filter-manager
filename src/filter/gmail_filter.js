/** @fileoverview Provides a representation of Gmail filters. */

import {
  GmailActionOptions,
} from '../action/gmail_action'

import {
  GmailCriteriaOptions,
} from '../criteria/gmail_criteria'

import * as compare from '../helper/compare'

import {
  OptionalString,
} from '../helper/typing'

const ACTION_KEYS = Object.freeze([
  'forward', 'addLabelIds', 'removeLabelIds',
]);

const CRITERIA_KEYS = Object.freeze([
  'excludeChats',
  'from',
  'hasAttachment',
  'negatedQuery',
  'query',
  'size',
  'sizeComparison',
  'subject',
  'to',
]);


/**
 * @typedef {{
 *   action: !GmailActionOptions,
 *   criteria: !GmailCriteriaOptions,
 *   id: !OptionalString,
 * }}
 */
let GmailFilterOptions;


class GmailFilter {
  /** @param {!GmailFilterOptions} gmailFilterOptions */
  constructor(gmailFilterOptions) {
    this.action = gmailFilterOptions.action;
    this.criteria = gmailFilterOptions.criteria;
    this.id = gmailFilterOptions.id;
  }

  /**
   * Compares two Gmail filters and return whether they are equal.
   * @param {!GmailFilter} otherFilter Filter against which to compare this.
   * @return {boolean} Whether filters are equal.
   */
  equals(otherFilter) {
    return this.hasSameCriteria(otherFilter) && this.hasSameAction(otherFilter);
  }

  /**
   * Compares two Gmail filter action and return whether they are equal.
   * @param {!GmailFilter} otherFilter Filter against which to compare this.
   * @return {boolean} Whether filter actions are equal.
   */
  hasSameAction(otherFilter) {
    if (!this.action && !otherFilter.action) return true;
    if (!this.action || !otherFilter.action) return false;

    for (const actionKey of ACTION_KEYS) {
      const thisValue = this.action[actionKey];
      const otherValue = otherFilter.action[actionKey];

      const isThisArray = Array.isArray(thisValue);
      const isOtherArray = Array.isArray(otherValue);

      if (isThisArray || isOtherArray) {
        if (!isThisArray) thisValue = [thisValue];
        if (!isOtherArray) otherValue = [otherValue];
        if (!compare.hasArraySameUniqueElements(thisValue, otherValue)) {
          return false;
        }
      } else {
        if (thisValue !== otherValue) return false;
      }
    }

    return true;
  }

  /**
   * Compares two Gmail filter criteria and return whether they are equal.
   * @param {!GmailFilter} otherFilter Filter against which to compare this.
   * @return {boolean} Whether filter criteria are equal.
   */
  hasSameCriteria(otherFilter) {
    if (!this.criteria && !otherFilter.criteria) return true;
    if (!this.criteria || !otherFilter.criteria) return false;

    for (const criteriaKey of CRITERIA_KEYS) {
      if (this.criteria[criteriaKey] !== otherFilter.criteria[criteriaKey]) {
        return false;
      }
    }

    return true;
  }

  /**
   * Casts GmailFilter as a Gmail Filter Resource.
   * @throw {!Error} No filter action found.
   * @throw {!Error} No filter criteria found.
   * @throw {!Error} Filter action is empty.
   * @throw {!Error} Criteria action is empty.
   * @return {!GmailFilterOptions} Gmail Filter Resource object.
   */
  castAsGmailResource() {
    const filterResource = {};
    if (this.id) filterResource.id = this.id;

    if (!this.action) {
      throw new Error(
        'Filter Action does not exist. Unable to cast as Gmail Resource.');
    }

    if (!this.criteria) {
      throw new Error(
        'Filter Criteria does not exist. Unable to cast as Gmail Resource.');
    }

    const actionResource = {};
    for (const actionKey of ACTION_KEYS) {
      const actionValue = this.action[actionKey];
      if (!actionValue) continue;
      if (Array.isArray(actionValue) && actionValue.length === 0) continue;
      actionResource[actionKey] = actionValue;
    }
    if (compare.isEmptyObject(actionResource)) {
      throw new Error(
        'Filter Action is empty. Unable to cast as Gmail Resource.')
    }
    filterResource.action = actionResource;

    const criteriaResource = {};
    for (const criteriaKey of CRITERIA_KEYS) {
      if (!this.criteria[criteriaKey]) continue;
      criteriaResource[criteriaKey] = this.criteria[criteriaKey];
    }
    if (compare.isEmptyObject(criteriaResource)) {
      throw new Error(
        'Filter Criteria is empty. Unable to cast as Gmail Resource.');
    }
    filterResource.criteria = criteriaResource;

    return filterResource;
  }

}


export {
  GmailFilter,
};
