/** @fileoverview Provides utilities to manage filters. */

const YAML = require('yamljs');

import {
  GmailFilter,
} from '../filter/gmail_filter'

import {
  Filter,
} from '../filter/local_filter'

/**
 * Loads local YAML filters into JS objects.
 * @param {string} filename Name of the file from which to load filters.
 * @return {!Array<!Filter>} Processed filters.
 */
const loadLocalFilters = (filename) => {
  let filters = HtmlService.createTemplateFromFile(filename).getRawContent();
  filters = YAML.parse(filters.trim());
  return filters.filters.map((localFilter) => new Filter(localFilter));
};

/**
 * Loads Gmail filters from current account settings.
 * @return !Array<!GmailFilter> List of Gmail filters.
 */
const loadGmailFilters = () => {
  const response = Gmail.Users.Settings.Filters.list('me');
  if (!response) return [];
  return response.filter.map((filter) => new GmailFilter(filter));
};


/**
 * Creates a list of filters on Gmail.
 * @param {!Array<!GmailFilter>} filtersToCreate
 * @param {boolean=} dryRun Whether to actually create filters in Gmail.
 */
const createFilters = (filtersToCreate, dryRun = false) => {
  for (const filter of filtersToCreate) {
    const filterName = Filter.getManagedFilterName(filter.criteria.query);
    console.log(`Creating filter ${filterName}.`);
    if (dryRun === true) continue;
    createFilter(filter);
  }
};

/**
 * Create an individual filter on Gmail.
 * @param {!GmailFilter} filterToCreate
 * @return {!GmailFilter} Newly created filter.
 */
const createFilter = (filterToCreate) => {
  const filterResource = filterToCreate.castAsGmailResource();
  // A pre-existing filter might be recrated. In this case, we do not want to
  // send id or may cause unexpected behaviour.
  if (filterResource.id) delete filterResource.id;
  const response = Gmail.Users.Settings.Filters.create(filterResource, 'me');
  return new GmailFilter(response);
};

/**
 * Deletes a list of filters from Gmail.
 * @param {!Array<!GmailFilter>} filtersToDelete
 * @param {boolean=} dryRun Whether to actually delete filters in Gmail.
 */
const deleteFilters = (filtersToDelete, dryRun = false) => {
  for (const filter of filtersToDelete) {
    const filterName = Filter.getManagedFilterName(filter.criteria.query);
    console.log(`Deleting filter ${filterName}.`);
    if (dryRun === true) continue;
    deleteFilter(filter);
  }
};

/**
 * Deletes an individual filter from Gmail.
 * @param {!GmailFilter} filterToDelete
 * @throw {!Error} No filter id for filter.
 */
const deleteFilter = (filterToDelete) => {
  const filterId = filterToDelete.id;
  if (!filterId) {
    const filterName = Filter.getManagedFilterName(filter.criteria.query);
    throw new Error(`Filter id for filter ${filterName} not detected.`);
  }
  Gmail.Users.Settings.Filters.remove('me', filterId);
};


/**
 * Updates a list of filters on Gmail.
 * @param {!Array<!GmailFilter>} filtersToUpdate
 * @param {boolean=} dryRun Whether to actually update filters in Gmail.
 */
const updateFilters = (filtersToUpdate, dryRun = false) => {
  for (const filter of filtersToUpdate) {
    const filterName = Filter.getManagedFilterName(filter.criteria.query);
    console.log(`Updating filter ${filterName}.`);
    if (dryRun === true) continue;
    updateFilter(filter);
  }
};

/**
 * Updates an individual filter on Gmail.
 * @param {!Array<!GmailFilter>} filterToUpdate
 */
const updateFilter = (filterToUpdate) => {
  // There's no patch for Filters.
  // As such, filter should be deleted and recreated.
  deleteFilter(filterToUpdate);
  createFilter(filterToUpdate);
};

/**
 * Logs filters that do not require actions.
 * @param {!Array<!GmailFilter>} unchangedFilters
 */
const logUnchangedFilters = (unchangedFilters) => {
  for (const filter of unchangedFilters) {
    const filterName = Filter.getManagedFilterName(filter.criteria.query);
    console.log(`Filter ${filterName} requires no changes.`);
  }
};


export {
  createFilters,
  deleteFilters,
  updateFilters,
  loadGmailFilters,
  loadLocalFilters,
  logUnchangedFilters,
};
