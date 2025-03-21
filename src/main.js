/** @fileoverview Updates Gmail filters and labels from a YAML file. */

import {
  updateGmailFilters
} from './workflow/manage_filters';

import {
  updateGmailLabels
} from './workflow/manage_labels';

global.updateGmailFilters = updateGmailFilters;
global.updateGmailLabels = updateGmailLabels;
