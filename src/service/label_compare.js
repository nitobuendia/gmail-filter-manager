/** @fileoverview Provides utilities to compare local vs gmail labels. */

/**
 * Checks which labels should be created and updated.
 * Note: This app does not delete labels because: (1) recreating labels is
 * costly or not possible as it may contain manually labelled emails; and (2)
 * it is not possible to know if a Gmail label is managed by this system.
 * @param {!Array<!Label>} localLabels
 * @param {!Array<!GmailLabel>} gmailLabels
 * @return {!Array<!Set<!GmailLabel>>} Tuple containing:
 *   - Set of Gmail labels to be created.
 *   - Set of Gmail labels to be updated.
 *   - Set of Gmail labels that do not require actions.
 */
const getChangedLabels = (localLabels, gmailLabels) => {
  const gmailLabelsMap = new Map();
  for (const gmailLabel of gmailLabels) {
    gmailLabelsMap.set(gmailLabel.name, gmailLabel);
  }

  const createLabels = new Set();
  const unchangedLabels = new Set();
  const updateLabels = new Set();
  for (const localLabel of localLabels) {
    const localGmailLabel = localLabel.castAsGmailLabel();
    const labelName = localLabel.name;

    // If Gmail does not contain this label, it should be created.
    if (!gmailLabelsMap.has(labelName)) {
      createLabels.add(localGmailLabel);
      continue;
    }

    const gmailLabel = gmailLabelsMap.get(labelName);
    localGmailLabel.id = gmailLabel.id;
    gmailLabelsMap.delete(labelName);

    // If a value is not defined, we assume that the user does not want to
    // change the current value.
    localGmailLabel.importMissingValuesFromLabel(gmailLabel);

    if (localGmailLabel.equals(gmailLabel)) {
      // If local and Gmail labels exist and are equal, do nothing.
      unchangedLabels.add(localGmailLabel);
    } else {
      // If local and Gmail labels exist, but are different, update Gmail.
      updateLabels.add(localGmailLabel);
    }
  }

  // Any filters left on the GmailLabelsMap do not exist locally, but should
  // not be removed as it is not possible ot determine whether they are managed
  // by this application.

  return [createLabels, updateLabels, unchangedLabels];
};


export {
  getChangedLabels,
};
