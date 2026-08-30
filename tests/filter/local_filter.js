/** @fileoverview Tests local filter. */

import {
  toThrowErrorWithMatchingMessage,
  toThrowErrorWithMatchingMessages,
} from '../jasmine/custom_matchers';
import * as filterAction from './../../src/action/filter_action';
import * as localFilter from '../../src/filter/local_filter';
import * as operator from '../../src/criteria/operator';
import { GmailFilter } from '../../src/filter/gmail_filter';

describe('Filter', () => {

  beforeEach(() => {
    jasmine.addMatchers({
      ...toThrowErrorWithMatchingMessage,
      ...toThrowErrorWithMatchingMessages,
    });
    localFilter.Filter.getFilterMap().clear();
  });

  describe('constructor', () => {
    it('creates an instance without errors', () => {
      const filter = new localFilter.Filter({
        'name': 'Filter Name',
        'filter': { 'and': { 'to': 'nitobuendia' } },
        'action': { 'archive': true },
      });

      expect(filter).toBeInstanceOf(localFilter.Filter);
    });

    it('creates an instance without action when action is omitted', () => {
      const filter = new localFilter.Filter({
        'name': 'No Action Filter',
        'filter': { 'or': { 'from': 'test@example.com' } },
      });

      expect(filter).toBeInstanceOf(localFilter.Filter);
      expect(filter.action).toBeInstanceOf(filterAction.FilterAction);
      expect(filter.action.hasAction()).toBe(false);
    });

    it('sets passed attributes for and operator', () => {
      const filter = new localFilter.Filter({
        'name': 'And Filter Name',
        'filter': { 'and': { 'to': 'nitobuendia' } },
        'action': { 'archive': true },
      });

      expect(filter.name).toEqual('And Filter Name');
      expect(filter.filter).toBeInstanceOf(operator.AndOperator);
      expect(filter.filter.operands.length).toEqual(1);
      expect(filter.filter.operands[0].toString()).toEqual('to:nitobuendia');
      expect(filter.action).toBeInstanceOf(filterAction.FilterAction);
      expect(filter.action.archive).toBe(true);
    });

    it('sets passed attributes for or operator', () => {
      const filter = new localFilter.Filter({
        'name': 'Or Filter Name',
        'filter': { 'or': { 'from': 'user@example.com' } },
        'action': { 'markRead': true },
      });

      expect(filter.name).toEqual('Or Filter Name');
      expect(filter.filter).toBeInstanceOf(operator.OrOperator);
      expect(filter.filter.operands.length).toEqual(1);
      expect(filter.filter.operands[0].toString()).toEqual('from:user@example.com');
      expect(filter.action).toBeInstanceOf(filterAction.FilterAction);
      expect(filter.action.markRead).toBe(true);
    });

    it('adds filter to filter map', () => {
      const filter = new localFilter.Filter({
        'name': 'Filter Name',
        'filter': { 'and': { 'to': 'nitobuendia' } },
        'action': { 'archive': true },
      });

      const getFilter = localFilter.Filter.getFilterMap().get('Filter Name');

      expect(getFilter).toBe(filter);
    });

    it('throws error if name is not provided', () => {
      const testFunction = () => {
        new localFilter.Filter({
          'filter': { 'and': { 'to': 'nitobuendia' } },
          'action': { 'archive': true },
        });
      };

      expect(testFunction).toThrowErrorWithMatchingMessages(
        ['Name', 'required']);
    });

    it('throws error if filter name already exists', () => {
      const testFunction = () => {
        new localFilter.Filter({
          'name': 'Text',
          'filter': { 'and': { 'to': 'nitobuendia' } },
          'action': { 'archive': true },
        });
        new localFilter.Filter({
          'name': 'Text',
          'filter': { 'or': { 'from': 'nitobuendia' } },
          'action': { 'archive': false },
        });
      };

      expect(testFunction).toThrowErrorWithMatchingMessages(
        ['Filter name', 'exists']);
    });

    it('throws if operator is not specified', () => {
      const testFunction = () => {
        new localFilter.Filter({
          'name': 'Text',
          'filter': {},
          'action': { 'archive': true },
        });
      };

      expect(testFunction).toThrowErrorWithMatchingMessage(
        'filter matching rule');
    });

    it('throws if operator is not and -or- or', () => {
      const testFunction = () => {
        new localFilter.Filter({
          'name': 'Text',
          'filter': { 'xor': { 'to': 'nitobuendia' } },
          'action': { 'archive': true },
        });
      };

      expect(testFunction).toThrowErrorWithMatchingMessage(
        'filter matching rule');
    });
  });

  describe('getFilterMap', () => {
    it('returns the global filter map', () => {
      const map = localFilter.Filter.getFilterMap();

      expect(map).toBeInstanceOf(Map);
      expect(map.size).toBe(0);
    });

    it('returns the global filter map with added values', () => {
      const map = localFilter.Filter.getFilterMap();
      const filter = new localFilter.Filter({
        'name': 'Mapped Filter',
        'filter': { 'and': { 'to': 'user@example.com' } },
        'action': { 'archive': true },
      });

      expect(map).toBeInstanceOf(Map);
      expect(map.size).toBe(1);
      expect(map.get('Mapped Filter')).toBe(filter);
    });
  });

  describe('isManagedFilter', () => {
    it('returns true for a query string with managed filter id', () => {
      const filterQuery =
        'to:user@example.com -{"📧 GmailFilterId: ManagedFilter"}';

      const isManagedFilter = localFilter.Filter.isManagedFilter(filterQuery);

      expect(isManagedFilter).toBe(true);
    });

    it('returns false for a query string without managed filter id', () => {
      const filterQuery = 'to:user@example.com is:unread';

      const isManagedFilter = localFilter.Filter.isManagedFilter(filterQuery);

      expect(isManagedFilter).toBe(false);
    });

    it('returns false when query string is empty', () => {
      const filterQuery = '';

      const isManagedFilter = localFilter.Filter.isManagedFilter(filterQuery);

      expect(isManagedFilter).toBe(false);
    });

    it('returns false when query string is null', () => {
      const filterQuery = null;

      const isManagedFilter = localFilter.Filter.isManagedFilter(filterQuery);

      expect(isManagedFilter).toBe(false);
    });

    it('returns false when query string is undefined', () => {
      const filterQuery = undefined;

      const isManagedFilter = localFilter.Filter.isManagedFilter(filterQuery);

      expect(isManagedFilter).toBe(false);
    });
  });

  describe('getManagedFilterName', () => {
    it('extracts filter name from managed filter query', () => {
      const filterQuery =
        'to:user@example.com -{"📧 GmailFilterId: Test Filter"}';

      const queryName = localFilter.Filter.getManagedFilterName(filterQuery);

      expect(queryName).toEqual('Test Filter');
    });

    it('returns null when query is not managed', () => {
      const filterQuery = 'to:user@example.com is:unread';

      const queryName = localFilter.Filter.getManagedFilterName(filterQuery);

      expect(queryName).toBeNull();
    });

    it('returns null when query string is empty', () => {
      const filterQuery = '';

      const queryName = localFilter.Filter.getManagedFilterName(filterQuery);

      expect(queryName).toBeNull();
    });

    it('returns null when query string is null', () => {
      const filterQuery = null;

      const queryName = localFilter.Filter.getManagedFilterName(filterQuery);

      expect(queryName).toBeNull();
    });

    it('returns null when query string is undefined', () => {
      const filterQuery = undefined;

      const queryName = localFilter.Filter.getManagedFilterName(filterQuery);

      expect(queryName).toBeNull();
    });
  });

  describe('getId', () => {
    it('returns correct identifier match string with filter name', () => {
      const filter = new localFilter.Filter({
        'name': 'Filter Name',
        'filter': { 'and': { 'to': 'work@company.com' } },
        'action': { 'archive': true },
      });

      const filterId = filter.getId();

      expect(filterId).toEqual('-{"📧 GmailFilterId: Filter Name"}');
    });
  });

  describe('toString', () => {
    it('returns combined filter rule and id string', () => {
      const filter = new localFilter.Filter({
        'name': 'Filter Name',
        'filter': { 'and': { 'to': 'user@example.com' } },
        'action': { 'archive': true },
      });

      const filterString = filter.toString();

      expect(filterString).toEqual(
        '{to:user@example.com} -{"📧 GmailFilterId: Filter Name"}'
      );
    });
  });

  describe('castAsGmailFilter', () => {
    it('casts to GmailFilter instance with empty id and converted action/criteria', () => {
      const filter = new localFilter.Filter({
        'name': 'Important Project',
        'filter': { 'and': { 'subject': 'project-update' } },
        'action': { 'markImportant': true, 'archive': true },
      });

      const gmailFilter = filter.castAsGmailFilter();

      expect(gmailFilter).toBeInstanceOf(GmailFilter);
      expect(gmailFilter.id).toEqual('');
      expect(gmailFilter.criteria.query).toEqual(filter.toString());
      expect(gmailFilter.action.addLabelIds).toContain('IMPORTANT');
      expect(gmailFilter.action.removeLabelIds).toContain('INBOX');
    });
  });
});
