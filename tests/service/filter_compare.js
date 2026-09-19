/** @fileoverview Tests filter comparison service. */

import { Filter } from '../../src/filter/local_filter';
import { GmailFilter } from '../../src/filter/gmail_filter';
import { getChangedFilters } from '../../src/service/filter_compare';

describe('filter_compare', () => {
  beforeEach(() => {
    Filter.getFilterMap().clear();
  });

  describe('getChangedFilters', () => {
    it('returns empty sets when given empty lists', () => {
      const [createFilters, updateFilters, deleteFilters, unchangedFilters] =
        getChangedFilters([], []);

      expect(createFilters.size).toEqual(0);
      expect(updateFilters.size).toEqual(0);
      expect(deleteFilters.size).toEqual(0);
      expect(unchangedFilters.size).toEqual(0);
    });

    it('ignores unmanaged Gmail filters when finding changes', () => {
      const unmanagedGmailFilter = new GmailFilter({
        id: 'unmanaged-1',
        criteria: { query: 'from:someone@example.com' },
        action: { addLabelIds: ['STARRED'] },
      });

      const [createFilters, updateFilters, deleteFilters, unchangedFilters] =
        getChangedFilters([], [unmanagedGmailFilter]);

      expect(createFilters.size).toEqual(0);
      expect(updateFilters.size).toEqual(0);
      expect(deleteFilters.size).toEqual(0);
      expect(unchangedFilters.size).toEqual(0);
    });

    it('skips local filters that have no action', () => {
      const filterWithoutAction = new Filter({
        name: 'No Action',
        filter: { and: { from: 'spam@spam.com' } },
        action: {},
      });

      const [createFilters, updateFilters, deleteFilters, unchangedFilters] =
        getChangedFilters([filterWithoutAction], []);

      expect(createFilters.size).toEqual(0);
      expect(updateFilters.size).toEqual(0);
      expect(deleteFilters.size).toEqual(0);
      expect(unchangedFilters.size).toEqual(0);
    });

    it('gets filters to create when it is not in Gmail', () => {
      const localFilter = new Filter({
        name: 'Archive Newsletters',
        filter: { and: { from: 'news@example.com' } },
        action: { archive: true },
      });

      const [createFilters, updateFilters, deleteFilters, unchangedFilters] =
        getChangedFilters([localFilter], []);

      expect(createFilters.size).toEqual(1);
      expect(updateFilters.size).toEqual(0);
      expect(deleteFilters.size).toEqual(0);
      expect(unchangedFilters.size).toEqual(0);
      const firstCreatedFilter = Array.from(createFilters)[0];
      expect(firstCreatedFilter.criteria.query).toEqual(
        '{from:news@example.com} -{"📧 GmailFilterId: Archive Newsletters"}');
    });

    it('gets unchanged filters when local and Gmail filters match', () => {
      const localFilter = new Filter({
        name: 'Star VIP',
        filter: { and: { from: 'vip@example.com' } },
        action: { markStar: true },
      });
      const gmailFilter = new GmailFilter({
        id: 'vip-filter',
        criteria: {
          query: '{from:vip@example.com} -{"📧 GmailFilterId: Star VIP"}',
        },
        action: { addLabelIds: ['STARRED'] },
      });

      const [createFilters, updateFilters, deleteFilters, unchangedFilters] =
        getChangedFilters([localFilter], [gmailFilter]);

      expect(createFilters.size).toEqual(0);
      expect(updateFilters.size).toEqual(0);
      expect(deleteFilters.size).toEqual(0);
      expect(unchangedFilters.size).toEqual(1);
      const firstUnchangedFilter = Array.from(unchangedFilters)[0];
      expect(firstUnchangedFilter.id).toEqual('vip-filter');
      expect(firstUnchangedFilter.criteria.query)
        .toEqual('{from:vip@example.com} -{"📧 GmailFilterId: Star VIP"}');
    });

    it('gets filters to update when local and Gmail filters differ', () => {
      const localFilter = new Filter({
        name: 'Project Notifications',
        filter: { and: { subject: 'Project Notifications' } },
        action: { archive: true, markRead: true },
      });
      const gmailFilter = new GmailFilter({
        id: 'project-notifications',
        criteria: {
          query: '{subject:"Project Notifications"} -{"📧 GmailFilterId: Project Notifications"}'
        },
        // Gmail filter is missing markRead (remove UNREAD).
        action: { removeLabelIds: ['INBOX'] },
      });


      const [createFilters, updateFilters, deleteFilters, unchangedFilters] =
        getChangedFilters([localFilter], [gmailFilter]);

      expect(createFilters.size).toEqual(0);
      expect(updateFilters.size).toEqual(1);
      expect(deleteFilters.size).toEqual(0);
      expect(unchangedFilters.size).toEqual(0);
      const firstUpdatedFilter = Array.from(updateFilters)[0];
      expect(firstUpdatedFilter.id).toEqual('project-notifications');
      expect(firstUpdatedFilter.action.removeLabelIds).toContain('INBOX');
      expect(firstUpdatedFilter.action.removeLabelIds).toContain('UNREAD');
    });

    it('gets managed filters to delete when in Gmail but not locally', () => {
      const managedOldFilter = new GmailFilter({
        id: 'old-filter',
        criteria: {
          query: '{from:old@example.com} -{"📧 GmailFilterId: Old Filter"}',
        },
        action: { removeLabelIds: ['INBOX'] },
      });

      const [createFilters, updateFilters, deleteFilters, unchangedFilters] =
        getChangedFilters([], [managedOldFilter]);

      expect(createFilters.size).toEqual(0);
      expect(updateFilters.size).toEqual(0);
      expect(deleteFilters.size).toEqual(1);
      expect(unchangedFilters.size).toEqual(0);
      const firstDeletedFilter = Array.from(deleteFilters)[0];
      expect(firstDeletedFilter.id).toEqual('old-filter');
    });

    it('handles mixed scenario with create, update, delete, and unchanged', () => {
      const localCreate = new Filter({
        name: 'new-filter',
        filter: { and: { to: 'new@example.com' } },
        action: { markStar: true },
      });
      const localUpdate = new Filter({
        name: 'modified-filter',
        filter: { and: { to: 'mod@example.com' } },
        action: { archive: true, markRead: true },
      });
      const localUnchanged = new Filter({
        name: 'same-filter',
        filter: { and: { to: 'same@example.com' } },
        action: { archive: true },
      });
      const gmailMod = new GmailFilter({
        id: 'g-mod',
        criteria: { query: localUpdate.toString() },
        action: { removeLabelIds: ['INBOX'] }, // Missing UNREAD.
      });
      const gmailSame = new GmailFilter({
        id: 'g-same',
        criteria: { query: localUnchanged.toString() },
        action: { removeLabelIds: ['INBOX'] },
      });
      const gmailDelete = new GmailFilter({
        id: 'g-del',
        criteria: { query: '{to:del@example.com} -{"📧 GmailFilterId: DelFilter"}' },
        action: { removeLabelIds: ['INBOX'] },
      });
      const gmailUnmanaged = new GmailFilter({
        id: 'g-unmanaged',
        criteria: { query: 'to:other@example.com' },
        action: { addLabelIds: ['STARRED'] },
      });

      const [createFilters, updateFilters, deleteFilters, unchangedFilters] =
        getChangedFilters(
          [localCreate, localUpdate, localUnchanged],
          [gmailMod, gmailSame, gmailDelete, gmailUnmanaged]
        );

      expect(createFilters.size).toEqual(1);
      expect(updateFilters.size).toEqual(1);
      expect(deleteFilters.size).toEqual(1);
      expect(unchangedFilters.size).toEqual(1);
      const firstCreatedFilter = Array.from(createFilters)[0];
      expect(firstCreatedFilter.criteria.query).toEqual(
        '{to:new@example.com} -{"📧 GmailFilterId: new-filter"}');
      const firstUpdatedFilter = Array.from(updateFilters)[0];
      expect(firstUpdatedFilter.id).toEqual('g-mod');
      const firstDeletedFilter = Array.from(deleteFilters)[0];
      expect(firstDeletedFilter.id).toEqual('g-del');
      const firstUnchangedFilter = Array.from(unchangedFilters)[0];
      expect(firstUnchangedFilter.id).toEqual('g-same');
    });
  });
});
