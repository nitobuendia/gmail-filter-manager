/** @fileoverview Defines Gmail actions data structures. */

import {
  OptionalOrRepeatedString,
  OptionalString,
} from '../helper/typing'

/**
 * @typedef {{
 *   addLabelIds: !OptionalOrRepeatedString,
 *   forward: !OptionalString,
 *   removeLabelIds: !OptionalOrRepeatedString,
 * }}
 */
let GmailActionOptions;


export {
  GmailActionOptions,
};
