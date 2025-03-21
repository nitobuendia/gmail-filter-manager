/** @fileoverview Tests basic operators. */

import * as operator from '../../src/criteria/operator';
import * as localFilter from '../../src/filter/local_filter';
import { toThrowErrorWithMatchingMessage } from '../jasmine/custom_matchers';

describe('operator', () => {

  beforeEach(() => {
    jasmine.addMatchers({
      ...toThrowErrorWithMatchingMessage,
    });

    localFilter.Filter.getFilterMap().clear();
    const filter = new localFilter.Filter({
      'name': 'Filter Name',
      'filter': {
        'and': {
          'to': 'nitobuendia',
          'from': 'you',
        },
      },
      'action': { 'archive': true },
    });
  });

  describe('AndOperator', () => {
    describe('constructor', () => {
      it('creates instance without errors', () => {
        const andOperator = new operator.AndOperator({
          'from': 'nitobuendia',
          'to': 'you',
        });

        expect(andOperator).not.toBe(null);
      });

      it('throws if no operands are passed', () => {
        const testFunction = () => {
          const andOperator = new operator.AndOperator({});
        };

        expect(testFunction).toThrowErrorWithMatchingMessage(
          'at least one operand');
      });

      it('throws if no value on operands are passed', () => {
        const testFunction = () => {
          const andOperator = new operator.AndOperator({
            'to': '',
          });
        };

        expect(testFunction).toThrowErrorWithMatchingMessage(
          'at least one operand');
      });

      it('throws if it contains another and operator', () => {
        const andTestFunction = () => {
          const andOperator = new operator.AndOperator({
            'and': {
              'to': 'nitobuendia',
              'from': 'you',
            },
            'bcc': 'others',
          });
        };

        expect(andTestFunction).toThrowErrorWithMatchingMessage(
          'not contain another AND');
      });
    });

    describe('toString', () => {
      it('casts to string by joining two filters with AND', () => {
        const andOperator = new operator.AndOperator({
          'from': 'nitobuendia',
          'to': 'you',
        });

        const andOperatorString = andOperator.toString();

        expect(andOperatorString).toEqual('{from:nitobuendia AND to:you}');
      });

      it('casts to string by joining three filters with AND', () => {
        const andOperator = new operator.AndOperator({
          'from': 'nitobuendia',
          'to': 'you',
          'bcc': 'others',
        });

        const andOperatorString = andOperator.toString();

        expect(andOperatorString).toEqual(
          '{from:nitobuendia AND to:you AND bcc:others}');
      });

      it('joins with another or operator', () => {
        const andOperator = new operator.AndOperator({
          'or': {
            'to': 'nitobuendia',
            'from': 'you',
          },
          'bcc': 'others',
        });

        const andOperatorString = andOperator.toString();

        expect(andOperatorString).toEqual(
          '{{to:nitobuendia OR from:you} AND bcc:others}');
      });

      it('joins with a named filter', () => {
        const andOperator = new operator.AndOperator({
          'name': 'Filter Name',
        });

        const andOperatorString = andOperator.toString();

        expect(andOperatorString).toEqual('{{to:nitobuendia AND from:you}}');
      });

      it('joins with repeated filters', () => {
        const andOperator = new operator.AndOperator({
          'from': ['nitobuendia', 'you'],
          'to': 'others',
        });

        const andOperatorString = andOperator.toString();

        expect(andOperatorString).toEqual(
          '{from:nitobuendia AND from:you AND to:others}');
      });

      it('joins all filter types', () => {
        const andOperator = new operator.AndOperator({
          'to': 'nitobuendia',
          'from': 'from-test',
          'cc': 'cc-test',
          'bcc': 'bcc-test',
          'subject': 'subject-test',
          'hasWords': 'has words',
          'larger': '2mb',
          'smaller': '1mb',
          'fromDate': '1990-07-14',
          'toDate': '1990-07-15',
          'olderThan': '1990-07-16',
          'newerThan': '1990-07-17',
          'hasAttachment': true,
          'filename': 'test-file',
          'hasDrive': true,
          'hasDocument': true,
          'hasNoUserLabels': true,
          'hasSpreadsheet': true,
          'hasPresentation': true,
          'hasYouTube': true,
          'isChat': true,
          'isImportant': true,
          'isStarred': true,
          'isSnoozed': true,
          'isUnread': true,
          'isRead': true,
          'isLabel': true,
          'inLabel': 'Label Name',
        });

        const andOperatorString = andOperator.toString();

        expect(andOperatorString).toEqual([
          '{',
          'to:nitobuendia AND ',
          'from:from-test AND ',
          'cc:cc-test AND ',
          'bcc:bcc-test AND ',
          'subject:subject-test AND ',
          '(has words) AND ',
          'larger:2mb AND ',
          'smaller:1mb AND ',
          'after:1990-07-14 AND ',
          'before:1990-07-15 AND ',
          'older_than:1990-07-16 AND ',
          'newer_than:1990-07-17 AND ',
          'has:attachment AND ',
          'filename:test-file AND ',
          'has:drive AND ',
          'has:document AND ',
          'has:nouserlabels AND ',
          'has:spreadsheet AND ',
          'has:presentation AND ',
          'has:youtube AND ',
          'is:chat AND ',
          'is:important AND ',
          'is:starred AND ',
          'is:snoozed AND ',
          'is:unread AND ',
          'is:read AND ',
          'in:(Label Name)',
          '}'
        ].join(''));
      });
    });
  });


  describe('OrOperator', () => {
    describe('constructor', () => {
      it('creates instance without errors', () => {
        const orOperator = new operator.OrOperator({
          'from': 'nitobuendia',
          'to': 'you',
        });

        expect(orOperator).not.toBe(null);
      });

      it('throws if no operands are passed', () => {
        const testFunction = () => {
          const andOperator = new operator.OrOperator({});
        };

        expect(testFunction).toThrowErrorWithMatchingMessage(
          'at least one operand');
      });

      it('throws if no value on operands are passed', () => {
        const testFunction = () => {
          const orOperator = new operator.OrOperator({
            'to': '',
          });
        };

        expect(testFunction).toThrowErrorWithMatchingMessage(
          'at least one operand');
      });

      it('throws if it contains another or operator', () => {
        const orTestFunction = () => {
          const orOperator = new operator.OrOperator({
            'or': {
              'to': 'nitobuendia',
              'from': 'you',
            },
            'bcc': 'others',
          });
        };

        expect(orTestFunction).toThrowErrorWithMatchingMessage(
          'not contain another OR');
      });
    });

    describe('toString', () => {
      it('casts to string by joining two filters with OR', () => {
        const orOperator = new operator.OrOperator({
          'from': 'nitobuendia',
          'to': 'you',
        });

        const orOperatorString = orOperator.toString();

        expect(orOperatorString).toEqual('{from:nitobuendia OR to:you}');
      });

      it('casts to string by joining three filters with AND', () => {
        const orOperator = new operator.OrOperator({
          'from': 'nitobuendia',
          'to': 'you',
          'bcc': 'others',
        });

        const orOperatorString = orOperator.toString();

        expect(orOperatorString).toEqual(
          '{from:nitobuendia OR to:you OR bcc:others}');
      });

      it('joins with another and operator', () => {
        const orOperator = new operator.OrOperator({
          'and': {
            'to': 'nitobuendia',
            'from': 'you',
          },
          'bcc': 'others',
        });

        const orOperatorString = orOperator.toString();

        expect(orOperatorString).toEqual(
          '{{to:nitobuendia AND from:you} OR bcc:others}');
      });

      it('joins with a named filter', () => {
        const orOperator = new operator.OrOperator({
          'name': 'Filter Name',
        });

        const andOperatorString = orOperator.toString();

        // Expected AND because it comes from the name filter rule where it's
        // doing and OR with a filter which contains an AND.
        expect(andOperatorString).toEqual('{{to:nitobuendia AND from:you}}');
      });

      it('joins with repeated filters', () => {
        const orOperator = new operator.OrOperator({
          'from': ['nitobuendia', 'you'],
          'to': 'others',
        });

        const orOperatorString = orOperator.toString();

        expect(orOperatorString).toEqual(
          '{from:nitobuendia OR from:you OR to:others}');
      });

      it('joins all filter types', () => {
        const orOperator = new operator.OrOperator({
          'to': 'nitobuendia',
          'from': 'from-test',
          'cc': 'cc-test',
          'bcc': 'bcc-test',
          'subject': 'subject-test',
          'hasWords': 'has words',
          'larger': '2mb',
          'smaller': '1mb',
          'fromDate': '1990-07-14',
          'toDate': '1990-07-15',
          'olderThan': '1990-07-16',
          'newerThan': '1990-07-17',
          'hasAttachment': true,
          'filename': 'test-file',
          'hasDrive': true,
          'hasDocument': true,
          'hasNoUserLabels': true,
          'hasSpreadsheet': true,
          'hasPresentation': true,
          'hasYouTube': true,
          'isChat': true,
          'isImportant': true,
          'isStarred': true,
          'isSnoozed': true,
          'isUnread': true,
          'isRead': true,
          'isLabel': true,
          'inLabel': 'Label Name',
        });

        const orOperatorString = orOperator.toString();

        expect(orOperatorString).toEqual([
          '{',
          'to:nitobuendia OR ',
          'from:from-test OR ',
          'cc:cc-test OR ',
          'bcc:bcc-test OR ',
          'subject:subject-test OR ',
          '(has words) OR ',
          'larger:2mb OR ',
          'smaller:1mb OR ',
          'after:1990-07-14 OR ',
          'before:1990-07-15 OR ',
          'older_than:1990-07-16 OR ',
          'newer_than:1990-07-17 OR ',
          'has:attachment OR ',
          'filename:test-file OR ',
          'has:drive OR ',
          'has:document OR ',
          'has:nouserlabels OR ',
          'has:spreadsheet OR ',
          'has:presentation OR ',
          'has:youtube OR ',
          'is:chat OR ',
          'is:important OR ',
          'is:starred OR ',
          'is:snoozed OR ',
          'is:unread OR ',
          'is:read OR ',
          'in:(Label Name)',
          '}'
        ].join(''));
      });
    });
  });
});
