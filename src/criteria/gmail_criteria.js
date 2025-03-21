/** @fileoverview Defines Gmail criteria data structures. */

import {
  OptionalBoolean,
  OptionalNumber,
  OptionalString,
} from '../helper/typing'

/**
 * @typedef {{
 *   excludeChats: !OptionalBoolean,
 *   from: !OptionalString,
 *   hasAttachment: !OptionalBoolean,
 *   negatedQuery: !OptionalString,
 *   query: !OptionalString,
 *   size: !OptionalNumber,
 *   sizeComparison: !OptionalString,
 *   subject: !OptionalString,
 *   to: !OptionalString,
 *}}
 */
let GmailCriteriaOptions;


export {
  GmailCriteriaOptions,
};
