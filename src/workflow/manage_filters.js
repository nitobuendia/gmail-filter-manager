/** @fileoverview Updates Gmail filters from a YAML file. */

import * as filterCompare from '../service/filter_compare'
import * as filterManager from '../service/filter_manager'
import * as labelManager from '../service/label_manager'

/** @const {string} Name of the .html file that contains filters. */
const FILTER_FILENAME = 'filters';

/**
 * Reads filters file and updates Gmail.
 * If there are non-existing labels: it creates them.
 * If filters exist and have not changed: does nothing.
 * If filters exist and have changed: updates them.
 * If filters do not exist: creates them.
 * If previously created filters no longer exist: deletes them.
 *   This only applies to filters created by the tool.
 *   Other filters should not be affected.
 * @param {boolean=} dryRun Whether it is a dry run.
 *   Dry run does not modify filters, only logs messages of the actions that
 *   will be taken.
 */
function updateGmailFilters(dryRun = false) {
  console.log('Running Gmail Filter Manager.');
  const gmailLabelMap = labelManager.getGmailLabelMap();

  const localFilters = filterManager.loadLocalFilters(FILTER_FILENAME);
  mapAndCreateGmailLabelsFromLocalFilters(localFilters, gmailLabelMap, dryRun);

  const gmailFilters = filterManager.loadGmailFilters();

  const [
    createFilters,
    updateFilters,
    deleteFilters,
    unchangedFilters,
  ] = filterCompare.getChangedFilters(localFilters, gmailFilters);

  filterManager.createFilters(createFilters, dryRun);
  filterManager.updateFilters(updateFilters, dryRun);
  filterManager.deleteFilters(deleteFilters, dryRun);
  filterManager.logUnchangedFilters(unchangedFilters);
}

/**
 * Changes label names for label ids. Creates all non-existing labels.
 * @param {!Array<!Filter>} localFilters List of filters for which to get label
 *    ids.
 * @param {!Map<!GmailLabel>} gmailLabelMap Map of Gmail labels.
 * @param {boolean=} dryRun If Dry run is true, it does not create labels.
 */
const mapAndCreateGmailLabelsFromLocalFilters = (
  localFilters, gmailLabelMap, dryRun = false) => {
  const loggedLabels = new Set();

  for (const localFilter of localFilters) {
    const action = localFilter.action;
    if (action.hasCastedLabel()) continue;

    if (!gmailLabelMap.has(action.label)) {
      let newGmailLabel = new GmailLabel({
        name: action.label,
      });
      newGmailLabel = labelManager.createLabel(newGmailLabel, dryRun);
      gmailLabelMap.set(newGmailLabel.name, newGmailLabel);
      console.log(`Creating label: ${newGmailLabel.name}.`);
      loggedLabels.add(gmailLabelMap);
    }

    const gmailLabel = gmailLabelMap.get(action.label);
    if (!loggedLabels.has(gmailLabel)) {
      console.log(`Existing label: ${gmailLabel.name}.`);
      loggedLabels.add(gmailLabelMap);
    }
    action.label = gmailLabel;
  }
};


export {
  updateGmailFilters,
};
