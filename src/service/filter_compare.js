/** @fileoverview Provides utilities to compare local vs gmail filters. */

import {
  GmailFilter,
} from '../filter/gmail_filter'

import {
  Filter,
} from '../filter/local_filter'

/**
 * Checks which filters should be created, updated and deleted.
 * @param {!Array<!Filter>} localFilters
 * @param {!Array<!GmailFilter>} gmailFilters
 * @return {!Array<!Set<!GmailFilter>>} Tuple containing:
 *   - Set of Gmail filters to be created.
 *   - Set of Gmail filters to be updated.
 *   - Set of Gmail filters to be deleted.
 *   - Set of Gmail filters that do not require actions.
 */
const getChangedFilters = (localFilters, gmailFilters) => {
  const gmailFiltersMap = new Map();
  for (const gmailFilter of gmailFilters) {
    if (!Filter.isManagedFilter(gmailFilter.criteria.query)) continue;
    const filterName =
      Filter.getManagedFilterName(gmailFilter.criteria.query);
    gmailFiltersMap.set(filterName, gmailFilter);
  }

  const createFilters = new Set();
  const unchangedFilters = new Set();
  const updateFilters = new Set();
  for (const localFilter of localFilters) {
    if (!localFilter.action || !localFilter.action.hasAction()) continue;

    const filterName = localFilter.name;
    const localGmailFilter = localFilter.castAsGmailFilter();

    // If Gmail does not contain this filter, it should be created.
    if (!gmailFiltersMap.has(filterName)) {
      createFilters.add(localGmailFilter);
      continue;
    }

    const gmailFilter = gmailFiltersMap.get(filterName);
    localGmailFilter.id = gmailFilter.id;
    gmailFiltersMap.delete(filterName);

    if (localGmailFilter.equals(gmailFilter)) {
      // If local and Gmail filters exist and are equal, do nothing.
      unchangedFilters.add(localGmailFilter);
    } else {
      // If local and Gmail filters exist, but are different, update Gmail.
      updateFilters.add(localGmailFilter);
    }
  }

  // Any filters left on the GmailFilterMap do not exist locally, and should be
  // removed.
  const deleteFilters = new Set(gmailFiltersMap.values());

  return [createFilters, updateFilters, deleteFilters, unchangedFilters];
};


export {
  getChangedFilters,
};
