/** @fileoverview Updates Gmail labels from a YAML file. */

import * as labelCompare from '../service/label_compare'
import * as labelManager from '../service/label_manager'

/** @const {string} Name of the .html file that contains labels. */
const LABEL_FILENAME = 'labels';

/**
 * Reads labels file and updates Gmail.
 * If labels exist and have not changed: does nothing.
 * If labels exist and have changed: updates them.
 * If labels do not exist: creates them.
 * Deletion is not handled by this application.
 * @param {boolean=} dryRun Whether it is a dry run.
 *   Dry run does not modify labels, only logs messages of the actions that
 *   would take place.
 */
function updateGmailLabels(dryRun = false) {
  console.log('Running Gmail Label Manager.');

  const gmailLabels = labelManager.loadGmailLabels();
  const localLabels = labelManager.loadLocalLabels(LABEL_FILENAME);
  const [
    createLabels,
    updateLabels,
    unchangedLabels,
  ] = labelCompare.getChangedLabels(localLabels, gmailLabels);

  labelManager.createLabels(createLabels, dryRun);
  labelManager.updateLabels(updateLabels, dryRun);
  labelManager.logUnchangedLabels(unchangedLabels);
}

export {
  updateGmailLabels,
};
