/** @fileoverview Provides a representation of Gmail filters. */

import {
  OptionalNumber,
} from '../helper/typing'

const LABEL_SUPPORTED_COLORS = new Set([
  '#000000', '#434343', '#666666', '#999999', '#cccccc', '#efefef', '#f3f3f3',
  '#ffffff', '#fb4c2f', '#ffad47', '#fad165', '#16a766', '#43d692', '#4a86e8',
  '#a479e2', '#f691b3', '#f6c5be', '#ffe6c7', '#fef1d1', '#b9e4d0', '#c6f3de',
  '#c9daf8', '#e4d7f5', '#fcdee8', '#efa093', '#ffd6a2', '#fce8b3', '#89d3b2',
  '#a0eac9', '#a4c2f4', '#d0bcf1', '#fbc8d9', '#e66550', '#ffbc6b', '#fcda83',
  '#44b984', '#68dfa9', '#6d9eeb', '#b694e8', '#f7a7c0', '#cc3a21', '#eaa041',
  '#f2c960', '#149e60', '#3dc789', '#3c78d8', '#8e63ce', '#e07798', '#ac2b16',
  '#cf8933', '#d5ae49', '#0b804b', '#2a9c68', '#285bac', '#653e9b', '#b65775',
  '#822111', '#a46a21', '#aa8831', '#076239', '#1a764d', '#1c4587', '#41236d',
  '#83334c', '#464646', '#e7e7e7', '#0d3472', '#b6cff5', '#0d3b44', '#98d7e4',
  '#3d188e', '#e3d7ff', '#711a36', '#fbd3e0', '#8a1c0a', '#f2b2a8', '#7a2e0b',
  '#ffc8af', '#7a4706', '#ffdeb5', '#594c05', '#fbe983', '#684e07', '#fdedc1',
  '#0b4f30', '#b3efd3', '#04502e', '#a2dcc1', '#c2c2c2', '#4986e7', '#2da2bb',
  '#b99aff', '#994a64', '#f691b2', '#ff7537', '#ffad46', '#662e37', '#ebdbde',
  '#cca6ac', '#094228', '#42d692', '#16a765',
]);

/**
 * @typedef {{
 *   id: string,
 *   name: string,
 *   messageListVisibility: string,
 *   labelListVisibility: string,
 *   type: string,
 *   messagesTotal: !OptionalNumber,
 *   messagesUnread: !OptionalNumber,
 *   threadsTotal: !OptionalNumber,
 *   threadsUnread: !OptionalNumber
 *   color: undefined|{
 *     textColor: string,
 *     backgroundColor: string,
 *   }
 * }}
 */
let GmailLabelResource;

/**
 * Category labels.
 * @enum {string}
 */
const CategoryLabel = {
  PRIMARY: 'CATEGORY_PERSONAL',
  SOCIAL: 'CATEGORY_SOCIAL',
  UPDATES: 'CATEGORY_UPDATES',
  FORUMS: 'CATEGORY_FORUMS',
  PROMOTIONS: 'CATEGORY_PROMOTIONS',
};

/**
 * System labels.
 * @enum {string}
 */
const SystemLabel = {
  IMPORTANT: 'IMPORTANT',
  INBOX: 'INBOX',
  SPAM: 'SPAM',
  STARRED: 'STARRED',
  TRASH: 'TRASH',
  UNREAD: 'UNREAD',
};

/**
 * Type of Label.
 * @enum {string}
 */
const LabelType = {
  USER: 'user',
  SYSTEM: 'system',
};

/**
 * Label visibility.
 * @enum {string}
 */
const LabelListVisibility = {
  HIDE: 'labelHide',
  SHOW: 'labelShow',
  SHOW_IF_UNREAD: 'labelShowIfUnread',
};

/** @enum {string} Label message visibility. */
const MessageListVisibility = {
  HIDE: 'hide',
  SHOW: 'show',
};


class GmailLabel {
  /** @param {!GmailLabelResource} gmailLabel */
  constructor(gmailLabel) {
    // Identifiers.
    this.id = gmailLabel.id;
    this.name = gmailLabel.name;
    // Secondary data.
    this.type = gmailLabel.type;
    this.messageListVisibility = gmailLabel.messageListVisibility;
    this.labelListVisibility = gmailLabel.labelListVisibility;
    this.color = gmailLabel.color;
  }

  /**
   * Compares two Gmail labels and return whether they are the same.
   * A Label is considered the same when it has the same name and id.
   * Undefined or falsy values are not considered equalities.
   * @param {!GmailLabel} otherLabel Label against which to compare this.
   * @return {boolean} Whether labels are the same.
   */
  is(otherLabel) {
    // TODO: this requires two functions, one basic for name and id
    // and one advanced to compare whether there are major logic changes.
    return (
      !!this.id &&
      !!otherLabel.id &&
      this.id === otherLabel.id &&
      !!this.name &&
      !!otherLabel.name &&
      this.name === otherLabel.name
    );
  }

  /**
   * Compares two Gmail labels and return whether they are equal.
   * A Label is considered equal when all critical attributes are equal.
   * @param {!GmailLabel} otherLabel Label against which to compare this.
   * @return {boolean} Whether labels are equal.
   */
  equals(otherLabel) {
    return this.is(otherLabel) &&
      this.type === otherLabel.type &&
      this.messageListVisibility === otherLabel.messageListVisibility &&
      this.labelListVisibility === otherLabel.labelListVisibility &&
      (
        this.color === otherLabel.color ||
        (
          this.color &&
          otherLabel.color &&
          this.color.textColor === otherLabel.color.textColor &&
          this.color.backgroundColor === otherLabel.color.backgroundColor
        )
      );
  }

  /**
   * Compares two Gmail labels and imports missing values.
   * Imports to this GmailLabel from the passed GmailLabel.
   * @param {!GmailLabel} otherLabel Label from which to import missing values.
   */
  importMissingValuesFromLabel(otherLabel) {
    if (!this.messageListVisibility) {
      this.messageListVisibility = otherLabel.messageListVisibility;
    }

    if (!this.labelListVisibility) {
      this.labelListVisibility = otherLabel.labelListVisibility;
    }

    if (otherLabel.color) {
      if (!this.color) {
        // Clone to avoid color properties being linked across labels.
        this.color = {
          ...otherLabel.color,
        };
      } else {
        if (!this.color.textColor && otherLabel.color.textColor) {
          this.color.textColor = otherLabel.color.textColor;
        }

        if (!this.color.backgroundColor && otherLabel.color.backgroundColor) {
          this.color.backgroundColor = otherLabel.color.backgroundColor;
        }
      }
    }
  }

  /**
   * Casts GmailLabel as a Gmail Filter Resource.
   * @throw {!Error} No name found.
   * @throw {!Error} No labelVisibility found.
   * @throw {!Error} No name found.
   * @throw {!Error} Background color present, text color missing.
   * @throw {!Error} Text color present, background color missing.
   * @return {!GmailLabelResource} Gmail Label Resource object.
   */
  castAsGmailResource() {
    if (!this.name) {
      throw new Error(
        'Name is a required label field. Unable to cast as Gmail Resource.');
    }

    if (!this.labelListVisibility) {
      throw new Error(
        'Label visibility is a required label field. ' +
        'Unable to cast as Gmail Resource.');
    }

    if (!this.messageListVisibility) {
      throw new Error(
        'Message visibility is a required label field. ' +
        'Unable to cast as Gmail Resource.');
    }

    if (this.color && !this.color.textColor && this.color.backgroundColor) {
      throw new Error(
        'Background color present, but missing text color. ' +
        'When adding color, both background and text color must be defined.');
    }

    if (this.color && this.color.textColor && !this.color.backgroundColor) {
      throw new Error(
        'Text color present, but missing background color. ' +
        'When adding color, both background and text color must be defined.');
    }

    const gmailResource = {
      name: this.name,
      labelListVisibility: this.labelListVisibility,
      messageListVisibility: this.messageListVisibility,
    };

    if (this.id) gmailResource.id = this.id

    if (this.color) gmailResource.color = { ...this.color };

    return gmailResource;
  }
}


export {
  LABEL_SUPPORTED_COLORS,
  CategoryLabel,
  GmailLabel,
  LabelType,
  LabelListVisibility,
  MessageListVisibility,
  SystemLabel,
};
