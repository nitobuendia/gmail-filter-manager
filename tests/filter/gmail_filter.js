/** @fileoverview Tests gmail filter. */

import * as gmailFilter from '../../src/filter/gmail_filter';
import {
  toThrowErrorWithMatchingMessages,
} from '../jasmine/custom_matchers';

describe('GmailFilter', () => {

  beforeEach(() => {
    jasmine.addMatchers({
      ...toThrowErrorWithMatchingMessages,
    });
  });

  describe('constructor', () => {
    it('creates instance without errors', () => {
      const newGmailFilter = new gmailFilter.GmailFilter({
        'id': 'filter-id',
        'action': {
          'forward': 'test@gmail.com',
        },
        'criteria': {
          'from': 'nitobuendia',
        },
      });

      expect(newGmailFilter).not.toBe(null);
    });

    it('sets all attributes', () => {
      const newGmailFilter = new gmailFilter.GmailFilter({
        'id': 'filter-id',
        'action': {
          'forward': 'test@gmail.com',
        },
        'criteria': {
          'from': 'nitobuendia',
        },
      });

      expect(newGmailFilter.id).toEqual('filter-id');
      expect(newGmailFilter.action).toEqual({ 'forward': 'test@gmail.com' });
      expect(newGmailFilter.criteria).toEqual({ 'from': 'nitobuendia' });
    });
  });

  describe('equals', () => {
    it('returns true if filters have the same action and criteria', () => {
      const firstGmailFilter = new gmailFilter.GmailFilter({
        'id': 'filter-id',
        'action': {
          'forward': 'test@gmail.com',
        },
        'criteria': {
          'to': 'nitobuendia',
        },
      });
      const secondGmailFilter = new gmailFilter.GmailFilter({
        'id': 'filter-id-2',
        'action': {
          'forward': 'test@gmail.com',
        },
        'criteria': {
          'to': 'nitobuendia',
        },
      });

      const areEqual = firstGmailFilter.equals(secondGmailFilter);

      expect(areEqual).toBe(true);
    });

    it('returns false if filters have different action', () => {
      const firstGmailFilter = new gmailFilter.GmailFilter({
        'id': 'filter-id',
        'action': {
          'forward': 'test@gmail.com',
        },
        'criteria': {
          'to': 'nitobuendia',
        },
      });
      const secondGmailFilter = new gmailFilter.GmailFilter({
        'id': 'filter-id-2',
        'action': {
          'forward': 'other-test-test@gmail.com',
        },
        'criteria': {
          'to': 'nitobuendia',
        },
      });

      const areEqual = firstGmailFilter.equals(secondGmailFilter);

      expect(areEqual).toBe(false);
    });

    it('returns false if filters have different criteria', () => {
      const firstGmailFilter = new gmailFilter.GmailFilter({
        'id': 'filter-id',
        'action': {
          'forward': 'test@gmail.com',
        },
        'criteria': {
          'from': 'nitobuendia',
        },
      });
      const secondGmailFilter = new gmailFilter.GmailFilter({
        'id': 'filter-id-2',
        'action': {
          'forward': 'test@gmail.com',
        },
        'criteria': {
          'to': 'nitobuendia',
        },
      });

      const areEqual = firstGmailFilter.equals(secondGmailFilter);

      expect(areEqual).toBe(false);
    });
  });

  describe('hasSameAction', () => {
    it('returns true if both actions are not defined', () => {
      const firstGmailFilter = new gmailFilter.GmailFilter({
        'id': 'filter-id',
        'criteria': {
          'from': 'nitobuendia',
        },
      });
      const secondGmailFilter = new gmailFilter.GmailFilter({
        'id': 'filter-id-2',
        'criteria': {
          'to': 'nitobuendia',
        },
      });

      const hasSameAction = firstGmailFilter.hasSameAction(secondGmailFilter);

      expect(hasSameAction).toBe(true);
    });

    it('returns true if both actions are equal', () => {
      const firstGmailFilter = new gmailFilter.GmailFilter({
        'id': 'filter-id',
        'action': {
          'forward': 'test@gmail.com',
        },
        'criteria': {
          'from': 'nitobuendia',
        },
      });
      const secondGmailFilter = new gmailFilter.GmailFilter({
        'id': 'filter-id-2',
        'action': {
          'forward': 'test@gmail.com',
        },
        'criteria': {
          'to': 'nitobuendia',
        },
      });

      const hasSameAction = firstGmailFilter.hasSameAction(secondGmailFilter);

      expect(hasSameAction).toBe(true);
    });


    it('returns true if both actions have the same unique elements', () => {
      const firstGmailFilter = new gmailFilter.GmailFilter({
        'id': 'filter-id',
        'action': {
          'addLabelIds': 'Label 1',
          'forward': ['t1@gmail.com', 't2@gmail.com'],
          'removeLabelIds': ['Label 2', 'Label 2'],
        },
        'criteria': {
          'from': 'nitobuendia',
        },
      });
      const secondGmailFilter = new gmailFilter.GmailFilter({
        'id': 'filter-id-2',
        'action': {
          'addLabelIds': ['Label 1', 'Label 1'],
          'forward': ['t1@gmail.com', 't2@gmail.com', 't2@gmail.com'],
          'removeLabelIds': 'Label 2',
        },
        'criteria': {
          'to': 'nitobuendia',
        },
      });

      const hasSameAction = firstGmailFilter.hasSameAction(secondGmailFilter);

      expect(hasSameAction).toBe(true);
    });


    it('returns false if first action is not defined but second is', () => {
      const firstGmailFilter = new gmailFilter.GmailFilter({
        'id': 'filter-id',
        'criteria': {
          'from': 'nitobuendia',
        },
      });
      const secondGmailFilter = new gmailFilter.GmailFilter({
        'id': 'filter-id-2',
        'action': {
          'forward': 'test@gmail.com',
        },
        'criteria': {
          'to': 'nitobuendia',
        },
      });

      const hasSameAction = firstGmailFilter.hasSameAction(secondGmailFilter);

      expect(hasSameAction).toBe(false);
    });

    it('returns false if first action is defined but second is not', () => {
      const firstGmailFilter = new gmailFilter.GmailFilter({
        'id': 'filter-id',
        'action': {
          'forward': 'test@gmail.com',
        },
        'criteria': {
          'from': 'nitobuendia',
        },
      });
      const secondGmailFilter = new gmailFilter.GmailFilter({
        'id': 'filter-id-2',
        'criteria': {
          'to': 'nitobuendia',
        },
      });

      const hasSameAction = firstGmailFilter.hasSameAction(secondGmailFilter);

      expect(hasSameAction).toBe(false);
    });

    it('returns false if actions have different number of elements', () => {
      const firstGmailFilter = new gmailFilter.GmailFilter({
        'id': 'filter-id',
        'action': {
          'forward': 'test@gmail.com',
          'removeLabelIds': ['label-id'],
        },
        'criteria': {
          'from': 'nitobuendia',
        },
      });
      const secondGmailFilter = new gmailFilter.GmailFilter({
        'id': 'filter-id-2',
        'action': {
          'forward': 'test@gmail.com',
        },
        'criteria': {
          'to': 'nitobuendia',
        },
      });

      const hasSameAction = firstGmailFilter.hasSameAction(secondGmailFilter);

      expect(hasSameAction).toBe(false);
    });

    it('returns false if actions have different values', () => {
      const firstGmailFilter = new gmailFilter.GmailFilter({
        'id': 'filter-id',
        'action': {
          'forward': 'test@gmail.com',
        },
        'criteria': {
          'from': 'nitobuendia',
        },
      });
      const secondGmailFilter = new gmailFilter.GmailFilter({
        'id': 'filter-id-2',
        'action': {
          'forward': 'other-test-email@gmail.com',
        },
        'criteria': {
          'to': 'nitobuendia',
        },
      });

      const hasSameAction = firstGmailFilter.hasSameAction(secondGmailFilter);

      expect(hasSameAction).toBe(false);
    });
  });

  describe('hasSameCriteria', () => {
    it('returns true if both criteria are not defined', () => {
      const gmailFilterOne = new gmailFilter.GmailFilter({
        'id': 'filter-id',
        'action': {
          'forward': 'test@gmail.com',
        },
      });
      const gmailFilterTwo = new gmailFilter.GmailFilter({
        'id': 'filter-id-2',
        'action': {
          'forward': 'test@gmail.com',
        },
      });

      const hasSameCriteria = gmailFilterOne.hasSameCriteria(gmailFilterTwo);

      expect(hasSameCriteria).toBe(true);
    });

    it('returns true if both criteria are equal', () => {
      const gmailFilterOne = new gmailFilter.GmailFilter({
        'id': 'filter-id',
        'action': {
          'forward': 'test@gmail.com',
        },
        'criteria': {
          'from': 'nitobuendia',
        },
      });
      const gmailFilterTwo = new gmailFilter.GmailFilter({
        'id': 'filter-id-2',
        'action': {
          'forward': 'other-test-email@gmail.com',
        },
        'criteria': {
          'from': 'nitobuendia',
        },
      });

      const hasSameCriteria = gmailFilterOne.hasSameCriteria(gmailFilterTwo);

      expect(hasSameCriteria).toBe(true);
    });

    it('returns false if first criteria is not defined but second is', () => {
      const gmailFilterOne = new gmailFilter.GmailFilter({
        'id': 'filter-id',
        'action': {
          'forward': 'test@gmail.com',
        },
      });
      const gmailFilterTwo = new gmailFilter.GmailFilter({
        'id': 'filter-id-2',
        'action': {
          'forward': 'other-test-email@gmail.com',
        },
        'criteria': {
          'from': 'nitobuendia',
        },
      });

      const hasSameCriteria = gmailFilterOne.hasSameCriteria(gmailFilterTwo);

      expect(hasSameCriteria).toBe(false);
    });

    it('returns false if first criteria is defined but second is not', () => {
      const gmailFilterOne = new gmailFilter.GmailFilter({
        'id': 'filter-id',
        'action': {
          'forward': 'test@gmail.com',
        },
        'criteria': {
          'from': 'nitobuendia',
        },
      });
      const gmailFilterTwo = new gmailFilter.GmailFilter({
        'id': 'filter-id-2',
        'action': {
          'forward': 'other-test-email@gmail.com',
        },
      });

      const hasSameCriteria = gmailFilterOne.hasSameCriteria(gmailFilterTwo);

      expect(hasSameCriteria).toBe(false);
    });

    it('returns false if criteria have different number of elements', () => {
      const gmailFilterOne = new gmailFilter.GmailFilter({
        'id': 'filter-id',
        'action': {
          'forward': 'test@gmail.com',
        },
        'criteria': {
          'from': 'nitobuendia',
        },
      });
      const gmailFilterTwo = new gmailFilter.GmailFilter({
        'id': 'filter-id-2',
        'action': {
          'forward': 'other-test-email@gmail.com',
        },
        'criteria': {
          'from': 'nitobuendia',
          'to': 'you',
        },
      });

      const hasSameCriteria = gmailFilterOne.hasSameCriteria(gmailFilterTwo);

      expect(hasSameCriteria).toBe(false);
    });

    it('returns false if criteria have different values', () => {
      const gmailFilterOne = new gmailFilter.GmailFilter({
        'id': 'filter-id',
        'action': {
          'forward': 'test@gmail.com',
        },
        'criteria': {
          'from': 'nitobuendia',
        },
      });
      const gmailFilterTwo = new gmailFilter.GmailFilter({
        'id': 'filter-id-2',
        'action': {
          'forward': 'other-test-email@gmail.com',
        },
        'criteria': {
          'from': 'you',
        },
      });

      const hasSameCriteria = gmailFilterOne.hasSameCriteria(gmailFilterTwo);

      expect(hasSameCriteria).toBe(false);
    });
  });

  describe('castAsGmailResource', () => {

    it('sets all Gmail filter resource attributes', () => {
      const aGmailFilter = new gmailFilter.GmailFilter({
        'id': 'filter-id',
        'action': {
          'forward': 'test@gmail.com',
        },
        'criteria': {
          'from': 'nitobuendia',
        },
      });

      const gmailResource = aGmailFilter.castAsGmailResource();

      expect(gmailResource.id).toEqual('filter-id');
      expect(gmailResource.action).toEqual({ 'forward': 'test@gmail.com' });
      expect(gmailResource.criteria).toEqual({ 'from': 'nitobuendia' });
    });

    it('does not set id if not sent', () => {
      const aGmailFilter = new gmailFilter.GmailFilter({
        'action': {
          'forward': 'test@gmail.com',
        },
        'criteria': {
          'from': 'nitobuendia',
        },
      });

      const gmailResource = aGmailFilter.castAsGmailResource();

      expect(gmailResource.id).toBe(undefined);
    });

    it('sets multiple filter actions', () => {
      const aGmailFilter = new gmailFilter.GmailFilter({
        'id': 'filter-id',
        'action': {
          'forward': ['test@gmail.com', 'other-email@gmail.com'],
          'addLabelIds': 'label-id-1',
        },
        'criteria': {
          'from': 'nitobuendia',
        },
      });

      const gmailResource = aGmailFilter.castAsGmailResource();

      expect(gmailResource.action).toEqual({
        'forward': ['test@gmail.com', 'other-email@gmail.com'],
        'addLabelIds': 'label-id-1',
      });
    });

    it('ignores empty actions', () => {
      const aGmailFilter = new gmailFilter.GmailFilter({
        'id': 'filter-id',
        'action': {
          'forward': [],  // This will be ignored.
          'addLabelIds': 'label-id-1',
        },
        'criteria': {
          'from': 'nitobuendia',
        },
      });

      const gmailResource = aGmailFilter.castAsGmailResource();

      expect(gmailResource.action).toEqual({
        'addLabelIds': 'label-id-1',
      });
    });

    it('sets multiple filter criteria', () => {
      const aGmailFilter = new gmailFilter.GmailFilter({
        'id': 'filter-id',
        'action': {
          'forward': 'test@gmail.com',
        },
        'criteria': {
          'from': ['nitobuendia', 'me'],
          'to': 'you',
        },
      });

      const gmailResource = aGmailFilter.castAsGmailResource();

      expect(gmailResource.criteria).toEqual({
        'from': ['nitobuendia', 'me'],
        'to': 'you',
      });
    });

    it('throws error if no action is passed', () => {
      const aGmailFilter = new gmailFilter.GmailFilter({
        'id': 'filter-id',
        'criteria': {
          'from': 'nitobuendia',
        },
      });

      const testFunction = () => {
        aGmailFilter.castAsGmailResource();
      };

      expect(testFunction).toThrowErrorWithMatchingMessages(
        ['Action', 'not exist']);
    });

    it('throws error if action is passed empty', () => {
      const aGmailFilter = new gmailFilter.GmailFilter({
        'id': 'filter-id',
        'action': {},
        'criteria': {
          'from': 'nitobuendia',
        },
      });

      const testFunction = () => {
        aGmailFilter.castAsGmailResource();
      };

      expect(testFunction).toThrowErrorWithMatchingMessages(
        ['Action', 'empty']);
    });

    it('throws error if no criteria is passed', () => {
      const aGmailFilter = new gmailFilter.GmailFilter({
        'id': 'filter-id',
        'action': {
          'forward': 'test@gmail.com',
        },
      });

      const testFunction = () => {
        aGmailFilter.castAsGmailResource();
      };

      expect(testFunction).toThrowErrorWithMatchingMessages(
        ['Criteria', 'not exist']);
    });

    it('throws error if criteria is passed empty', () => {
      const aGmailFilter = new gmailFilter.GmailFilter({
        'id': 'filter-id',
        'action': {
          'forward': 'test@gmail.com',
        },
        'criteria': {},
      });

      const testFunction = () => {
        aGmailFilter.castAsGmailResource();
      };

      expect(testFunction).toThrowErrorWithMatchingMessages(
        ['Criteria', 'empty']);
    });
  });
});
