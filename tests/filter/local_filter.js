/** @fileoverview Tests local filter. */

import {
  toThrowErrorWithMatchingMessage,
  toThrowErrorWithMatchingMessages,
} from '../jasmine/custom_matchers';
import * as filterAction from './../../src/action/filter_action';
import * as localFilter from '../../src/filter/local_filter';
import * as operator from '../../src/criteria/operator';

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

    it('sets passed attributes', () => {
      const filter = new localFilter.Filter({
        'name': 'Filter Name',
        'filter': { 'and': { 'to': 'nitobuendia' } },
        'action': { 'archive': true },
      });

      expect(filter.name).toEqual('Filter Name');
      expect(filter.filter).toBeInstanceOf(operator.AndOperator);
      expect(filter.filter.operands.length).toEqual(1);
      expect(filter.filter.operands[0].toString()).toEqual('to:nitobuendia');
      expect(filter.action).toBeInstanceOf(filterAction.FilterAction);
      expect(filter.action.archive).toBe(true);
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
        const filter = new localFilter.Filter({
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

  });

  describe('isManagedFilter', () => {

  });

  describe('getManagedFilterName', () => {

  });

  describe('getId', () => {

  });

  describe('toString', () => {

  });

  describe('castAsGmailFilter', () => {

  });
});
