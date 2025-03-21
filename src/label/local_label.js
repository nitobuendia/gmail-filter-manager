/** @fileoverview Processes local labels into actionable classes. */

import {
  OptionalString,
} from '../helper/typing'

import {
  LABEL_SUPPORTED_COLORS,
  GmailLabel,
  LabelListVisibility,
  MessageListVisibility,
  LabelType,
} from '../label/gmail_label'


/** @enum {string} Label list visibility. */
const LabelVisibility = {
  HIDE: 'hide',
  SHOW: 'show',
  SHOW_IF_UNREAD: 'showifunread',
};

/**
 * Map of label list visibility to gmail naming.
 * @const {!Map<!LabelVisibility, string>}
 */
const LabelVisibilityGmailMap = new Map([
  [LabelVisibility.HIDE, LabelListVisibility.HIDE],
  [LabelVisibility.SHOW, LabelListVisibility.SHOW],
  [LabelVisibility.SHOW_IF_UNREAD, LabelListVisibility.SHOW_IF_UNREAD],
]);

/**
 * @typedef {{
 *   name: string,
 *   labelVisibility: !OptionalString,
 *   messageVisibility: !OptionalString,
 *   backgroundColor: !OptionalString,
 *   textColor: !OptionalString,
 * }}
 */
let LabelOptions;

/**
 * Local definition of a Gmail label.
 */
class Label {

  /**
   * @param {!LabelOptions} labelOptions
   * @throw {!Error} Name is a required field.
   */
  constructor(labelOptions) {
    /** @const {string} */
    if (!labelOptions.name) {
      throw new Error('Name is required for labels.');
    }
    this.name = labelOptions.name;

    /** @const {!LabelListVisibility|undefined} */
    this.labelVisibility =
      this._parseLabelVisibility(labelOptions.labelVisibility);
    /** @const {!MessageListVisibility|undefined} */
    this.messageVisibility =
      this._parseMessageVisibility(labelOptions.messageVisibility);

    /** @const {!OptionalString} */
    this.backgroundColor =
      this._parseAndAssertGmailColor(labelOptions.backgroundColor);
    /** @const {!OptionalString} */
    this.textColor = this._parseAndAssertGmailColor(labelOptions.textColor);
  }

  /**
   * Parses and assert Gmail label color.
   * @param {string|undefined} color
   * @throw {!Error} Color must be hex.
   * @throw {!Error} Color must be in Gmail supported list.
   * @return {string|undefined} Gmail color.
   */
  _parseAndAssertGmailColor(color) {
    if (!color) return; // Color is not required.

    if (color[0] !== '#' || color.length !== 7) {
      throw new Error(`Color must be in hex. Color provided was: ${color}.`);
    }

    color = color.toLowerCase();
    if (!LABEL_SUPPORTED_COLORS.has(color)) {
      throw new Error(`${color} is not one of the supported gmail colors.`);
    }

    return color;
  }

  /**
   * Parses label list visibility.
   * @param {!OptionalString} labelVisibility
   * @return {!LabelVisibility} Label visibility enum.
   */
  _parseLabelVisibility(labelVisibility) {
    if (!labelVisibility) return;
    labelVisibility = labelVisibility.toLowerCase();
    switch (labelVisibility) {
      case LabelVisibility.HIDE:
        return LabelVisibility.HIDE;
      case LabelVisibility.SHOW:
        return LabelVisibility.SHOW;
      case LabelVisibility.SHOW_IF_UNREAD:
        return LabelVisibility.SHOW_IF_UNREAD;
    }
  }

  /**
   * Parses message list visibility.
   * @param {!OptionalString} messageVisibility
   * @return {!MessageVisibility} Message visibility enum.
   */
  _parseMessageVisibility(messageVisibility) {
    if (!messageVisibility) return;
    messageVisibility = messageVisibility.toLowerCase();
    switch (messageVisibility) {
      case MessageListVisibility.HIDE:
        return MessageListVisibility.HIDE;
      case MessageListVisibility.SHOW:
        return MessageListVisibility.SHOW;
    }
  }

  /**
   * Casts local label into Gmail label object resource.
   */
  castAsGmailLabel() {
    const gmailLabelOptions = {
      name: this.name,
      type: LabelType.USER,
    };

    if (this.labelVisibility) {
      gmailLabelOptions.labelListVisibility =
        LabelVisibilityGmailMap.get(this.labelVisibility);
    }

    if (this.messageVisibility) {
      gmailLabelOptions.messageListVisibility = this.messageVisibility;
    }

    if (this.textColor || this.backgroundColor) {
      gmailLabelOptions.color = {};
      if (this.textColor) {
        gmailLabelOptions.color.textColor = this.textColor;
      }
      if (this.backgroundColor) {
        gmailLabelOptions.color.backgroundColor = this.backgroundColor;
      }
    }

    return new GmailLabel(gmailLabelOptions);
  }
}


export {
  Label,
};
