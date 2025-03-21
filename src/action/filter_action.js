/** @fileoverview Provides a representation of Gmail filter actions. */

import {
  OptionalBoolean,
  OptionalString,
} from '../helper/typing'

import {
  GmailActionOptions,
} from './gmail_action'

import {
  CategoryLabel,
  SystemLabel,
} from '../label/gmail_label'

/**
 * Not implemented: send template.
 * @typedef {{
 *   archive: !OptionalBoolean,
 *   markRead: !OptionalBoolean,
 *   markStar: !OptionalBoolean,
 *   label: !OptionalString,
 *   forward: !OptionalString,
 *   delete: !OptionalBoolean,
 *   neverMarkSpam: !OptionalBoolean,
 *   markImportant: !OptionalBoolean,
 *   neverMarkImportant: !OptionalBoolean,
 *   category: !OptionalCategory,
 * }}
 */
let ActionOptions;


class FilterAction {
  /**
   * @param {!ActionOptions} actionOptions Filter action object.
   */
  constructor(actionOptions) {
    this.archive = actionOptions.archive;
    this.markRead = actionOptions.markRead;
    this.markStar = actionOptions.markStar;
    this.label = actionOptions.label;
    this.forward = actionOptions.forward;
    this.delete = actionOptions.delete;
    this.neverMarkSpam = actionOptions.neverMarkSpam;
    this.markImportant = actionOptions.markImportant;
    this.neverMarkImportant = actionOptions.neverMarkImportant;
    this.category = actionOptions.category;
  }

  /** @return {boolean} Whether it has at least one filter action */
  hasAction() {
    return (
      this.archive !== undefined ||
      this.markRead !== undefined ||
      this.markStar !== undefined ||
      (this.label !== undefined && this.label !== '') ||
      (this.forward !== undefined && this.forward !== '') ||
      this.delete !== undefined ||
      this.neverMarkSpam !== undefined ||
      this.markImportant !== undefined ||
      this.neverMarkImportant !== undefined ||
      (this.category !== undefined && this.category !== '')
    );
  }

  /** @return {boolean} Whether label is set. */
  hasLabel() {
    return this.label ? true : false;
  }

  /** @return {boolean} Whether label has been casted to GmailLabel. */
  hasCastedLabel() {
    if (!this.hasLabel()) return true;
    return typeof this.label !== 'string';
  }

  /**
   * @throw {!Error} Labels must be converted from names to ids first.
   * @throw {!Error} Invalid category name.
   * @return {?GmailActionOptions} Casts filter as a Gmail filter.
   */
  castAsGmailFilterAction() {
    if (!this.hasAction()) return null;
    if (this.hasLabel() && !this.hasCastedLabel()) {
      throw new Error('Label must be casted to Gmail label.')
    }

    const addLabelIds = new Set();
    const removeLabelIds = new Set();

    if (this.archive) removeLabelIds.add(SystemLabel.INBOX);
    if (this.markRead) removeLabelIds.add(SystemLabel.UNREAD);
    if (this.markStar) addLabelIds.add(SystemLabel.STARRED);
    if (this.label) addLabelIds.add(this.label.id);
    if (this.delete) addLabelIds.add(SystemLabel.TRASH);
    if (this.neverMarkSpam) removeLabelIds.add(SystemLabel.SPAM);
    if (this.markImportant) addLabelIds.add(SystemLabel.IMPORTANT);
    if (this.neverMarkImportant) removeLabelIds.add(SystemLabel.IMPORTANT);
    if (this.category) {
      const categoryKey = this.category.toUpperCase();
      if (!CategoryLabel[categoryKey]) {
        throw new Error(
          `Category ${this.category} not supported. ` +
          `Must be one of ${Object.keys(CategoryLabel).join(', ')}.`);
      }
      addLabelIds.add(CategoryLabel[categoryKey]);
    }

    const forward = this.forward;

    const gmailAction = {};
    if (forward) {
      gmailAction.forward = forward;
    }
    if (addLabelIds.size > 0) {
      gmailAction.addLabelIds = Array.from(addLabelIds);
    }
    if (removeLabelIds.size > 0) {
      gmailAction.removeLabelIds = Array.from(removeLabelIds);
    }

    return gmailAction;
  }
}


export {
  ActionOptions,
  FilterAction,
};
