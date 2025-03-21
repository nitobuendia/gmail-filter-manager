/** @fileoverview Defines base filter match from which all inherit. */

import {
  OptionalBoolean,
  OptionalOrRepeatedString,
  OptionalString,
} from '../helper/typing'

/**
 * Gmail supported filter matchers.
 * See documentation at: http://support.google.com/mail/answer/7190
 * @typedef {{
 *   from: !OptionalOrRepeatedString,
 *   to: !OptionalOrRepeatedString,
 *   cc: !OptionalOrRepeatedString,
 *   bcc: !OptionalOrRepeatedString,
 *   subject: !OptionalOrRepeatedString,
 *   hasWords: !OptionalOrRepeatedString,
 *   larger: !OptionalOrRepeatedString,
 *   smaller: !OptionalOrRepeatedString,
 *   fromDate: !OptionalString,
 *   toDate: !OptionalString,
 *   olderThan: !OptionalString,
 *   newerThan: !OptionalString,
 *   hasAttachment: !OptionalBoolean,
 *   filename: !OptionalOrRepeatedString,
 *   hasDrive: !OptionalBoolean,
 *   hasDocument: !OptionalBoolean,
 *   hasNoUserLabels: !OptionalBoolean,
 *   hasSpreadsheet: !OptionalBoolean,
 *   hasPresentation: !OptionalBoolean,
 *   hasYouTube: !OptionalBoolean,
 *   isChat: !OptionalBoolean,
 *   isImportant: !OptionalBoolean,
 *   isStarred: !OptionalBoolean,
 *   isSnoozed: !OptionalBoolean,
 *   isUnread: !OptionalBoolean,
 *   isRead: !OptionalBoolean,
 *   inLabel: !OptionalOrRepeatedString,
 * }}
 */
let FilterMatchOptions;

/** @type {!OptionalString|!OptionalOrRepeatedString|!OptionalBoolean} */
let FilterMatchValue;

/** Base filter match for building other types. */
class FilterMatch {
  constructor() { }
}


export {
  FilterMatch,
  FilterMatchOptions,
  FilterMatchValue,
};
