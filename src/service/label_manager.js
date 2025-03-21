/** @fileoverview Provides utilities to manage labels. */

const YAML = require('yamljs');

import {
  Label,
} from '../label/local_label'

import {
  GmailLabel,
  LabelType,
  LabelListVisibility,
  MessageListVisibility,
} from '../label/gmail_label'


const DEFAULT_LABEL = Object.freeze({
  'messageListVisibility': MessageListVisibility.SHOW,
  'labelListVisibility': LabelListVisibility.SHOW,
});

const DRY_RUN_LABEL = Object.freeze({
  'id': 'fake-gmail-id',
  'name': 'Fake Gmail Label',
  'messageListVisibility': MessageListVisibility.SHOW,
  'labelListVisibility': LabelListVisibility.SHOW,
  'type': LabelType.USER,
  'messagesTotal': 0,
  'messagesUnread': 0,
  'threadsTotal': 0,
  'threadsUnread': 0,
  'color': Object.freeze({
    'textColor': '#ffffff',
    'backgroundColor': '#00000',
  }),
});

/**
 * Loads local YAML labels into JS objects.
 * @param {string} filename Name of the file from which to load labels.
 * @return {!Array<!Label>} Processed labels.
 */
const loadLocalLabels = (filename) => {
  let labels = HtmlService.createTemplateFromFile(filename).getRawContent();
  labels = YAML.parse(labels.trim());
  return labels.labels.map((localLabel) => new Label(localLabel));
};

/**
 * Gets a map of Gmail Labels from name (key) to Label (value).
 */
const getGmailLabelMap = () => {
  const gmailLabels = loadGmailLabels();
  const gmailLabelMap = new Map();
  for (const gmailLabel of gmailLabels) {
    gmailLabelMap.set(gmailLabel.name, gmailLabel);
  }
  return gmailLabelMap;
};

/**
 * Loads Gmail labels from account.
 * @return !Array<!GmailLabel> List of Gmail labels.
 */
const loadGmailLabels = () => {
  const response = Gmail.Users.Labels.list('me');
  if (!response) return [];
  const userLabels = response.labels.filter((label) => {
    return label.type === LabelType.USER;
  });
  return userLabels.map((label) => new GmailLabel(label));
};

/**
 * Creates a list of labels on Gmail.
 * @param {!Array<!GmailLabel>} labelsToCreate
 * @param {boolean=} dryRun Whether to actually create labels in Gmail.
 */
const createLabels = (labelsToCreate, dryRun = false) => {
  for (const label of labelsToCreate) {
    console.log(`Creating label ${label.name}.`);
    if (dryRun === true) continue;
    createLabel(label, dryRun);
  }
};

/**
 * Create an individual label on Gmail.
 * @param {!GmailLabel} labelToCreate
 * @return {!GmailLabel} Newly created label.
 */
const createLabel = (labelToCreate, dryRun = false) => {
  if (dryRun) return createFakeLabel();
  // Add missing and required values.
  const defaultLabel = new GmailLabel(DEFAULT_LABEL);
  labelToCreate.importMissingValuesFromLabel(defaultLabel);
  const labelResource = labelToCreate.castAsGmailResource();
  // A pre-existing label might be recrated. In this case, we do not want to
  // send id or may cause unexpected behaviour.
  if (labelResource.id) delete labelResource.id;
  const response = Gmail.Users.Labels.create(labelResource, 'me');
  return new GmailLabel(response);
};

/**
 * Fakes creation a fake label for Dry Run.
 * @return {!GmailLabel} Fake new label with default settings.
 * */
const createFakeLabel = () => {
  if (dryRun === true) {
    const fakeLabel = {
      ...DRY_RUN_LABEL,
      color: {
        ...DRY_RUN_LABEL.color
      },
      name: labelName,
      id: `fake-id-${labelName}`,
    };
    return new GmailLabel(fakeLabel);
  }
};

/**
 * Updates a list of labels on Gmail.
 * @param {!Array<!GmailLabel>} labelsToUpdate
 * @param {boolean=} dryRun Whether to actually update labels in Gmail.
 */
const updateLabels = (labelsToUpdate, dryRun = false) => {
  for (const label of labelsToUpdate) {
    console.log(`Updating label ${label.name}.`);
    if (dryRun === true) continue;
    updateLabel(label);
  }
};

/**
 * Updates an individual label on Gmail.
 * @param {!Array<!GmailLabel>} labelToUpdate
 * @return {!GmailLabel} Newly updated label.
 */
const updateLabel = (labelToUpdate) => {
  const labelResource = labelToUpdate.castAsGmailResource();
  const response = Gmail.Users.Labels.patch(
    labelResource, 'me', labelResource.id);
  return new GmailLabel(response);
};

/**
 * Logs labels that do not require actions.
 * @param {!Array<!GmailLabel>} unchangedLabels
 */
const logUnchangedLabels = (unchangedLabels) => {
  for (const label of unchangedLabels) {
    console.log(`Label ${label.name} requires no changes.`);
  }
};


export {
  loadLocalLabels,
  getGmailLabelMap,
  loadGmailLabels,
  createLabel,
  createLabels,
  updateLabels,
  logUnchangedLabels,
};
