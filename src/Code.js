/**
 * @fileoverview Manages your Gmail filters.
 *
 * Manage your own filters by creating 'filters.html' file containing your YAML
 * Gmail filter configuration. If you want to see what actions will be taken,
 * run `dryRunUpdateFilters` first. Once you are sure, run `runupdateFilters` to
 * commit and execute changes in your Gmail account.
 *
 * Manage your own labels by creating 'labels.html' file containing your YAML
 * Gmail label configuration. If you want to see what actions will be taken,
 * run `dryRunUpdateLabels` first. Once you are sure, run `runUpdateLabels` to
 * commit and execute changes in your Gmail account.
 */
function runUpdateFilters() {
  updateGmailFilters( /* dryRun = */ false);
}

function runUpdateLabels() {
  updateGmailLabels( /* dryRun = */ false);
}

function dryRunUpdateFilters() {
  updateGmailFilters( /* dryRun = */ true);
}

function dryRunUpdateLabels() {
  updateGmailLabels( /* dryRun = */ true);
}
