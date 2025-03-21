/** @fileoverview Tests filter actions. */

import * as filterAction from './../../src/action/filter_action';
import {
  GmailLabel
} from '../../src/label/gmail_label';

describe('FilterAction', () => {
  const filterActionAttributes = new Set([
    'archive', 'markRead', 'markStar', 'label', 'delete',
    'neverMarkSpam', 'markImportant', 'neverMarkImportant', 'category',
  ]);

  describe('constructor', () => {

    describe('with full values', () => {
      const actionOptions = {
        archive: true,
        markRead: false,
        markStar: true,
        label: 'Label Name',
        forward: 'email@gmail.com',
        delete: false,
        neverMarkSpam: true,
        markImportant: false,
        neverMarkImportant: true,
        category: 'PROMOTIONS',
      };

      filterActionAttributes.forEach((attributeName) => {
        it(`initializes ${attributeName} with full values`, () => {
          const action = new filterAction.FilterAction(actionOptions);

          expect(action[attributeName]).toEqual(actionOptions[attributeName]);
        });
      });
    });

    describe('with no values', () => {
      filterActionAttributes.forEach((attributeName) => {
        it(`initializes ${attributeName} as undefined`, () => {
          const actionOptions = {};

          const action = new filterAction.FilterAction(actionOptions);

          expect(action[attributeName]).toBe(undefined);
        });
      });
    });

    describe('with partial values', () => {
      const filledAttributeValues = new Set(['archive', 'markRead']);
      filledAttributeValues.forEach((attributeName) => {
        it(`initializes filled ${attributeName} with value`, () => {
          const actionOptions = {
            archive: true,
            markRead: false,
          };

          const action = new filterAction.FilterAction(actionOptions);

          expect(action[attributeName]).toEqual(actionOptions[attributeName]);
        });
      });

      const unfilledAttributeValues = new Set(filterActionAttributes);
      filledAttributeValues.forEach((attributeName) => {
        unfilledAttributeValues.delete(attributeName);
      });
      unfilledAttributeValues.forEach((attributeName) => {
        it(`initializes unfilled ${attributeName} with undefined`, () => {
          const actionOptions = {
            archive: true,
            markRead: false,
          };

          const action = new filterAction.FilterAction(actionOptions);

          expect(action[attributeName]).toBe(undefined);
        });
      });
    });
  });

  describe('hasAction', () => {
    [
      ['archive is true', 'archive', true],
      ['archive is false', 'archive', false],
      ['markRead is true', 'markRead', true],
      ['markRead is false', 'markRead', false],
      ['markStar is true', 'markStar', true],
      ['markStar is false', 'markStar', false],
      ['label is a string', 'label', 'Test Label'],
      ['forward is a string', 'forward', 'test@gmail.com'],
      ['delete is true', 'delete', true],
      ['delete is false', 'delete', false],
      ['neverMarkSpam is true', 'neverMarkSpam', true],
      ['neverMarkSpam is false', 'neverMarkSpam', false],
      ['markImportant is true', 'markImportant', true],
      ['markImportant is false', 'markImportant', false],
      ['neverMarkImportant is true', 'neverMarkImportant', true],
      ['neverMarkImportant is false', 'neverMarkImportant', false],
      ['category is a string', 'category', 'PROMOTIONS'],
    ].forEach(([testName, attributeName, attributeValue]) => {
      it(`returns true when ${testName}`, () => {
        const actionOptions = {
          [attributeName]: attributeValue
        };
        const action = new filterAction.FilterAction(actionOptions);

        const hasAction = action.hasAction();

        expect(hasAction).toBe(true);
      });
    });

    it('returns true when multiple values are set', () => {
      const actionOptions = {
        label: 'Test Label',
        delete: true,
      };
      const action = new filterAction.FilterAction(actionOptions);

      const hasAction = action.hasAction();

      expect(hasAction).toBe(true);
    });

    it('returns true when label is a gmail label', () => {
      const actionOptions = {
        label: new GmailLabel({}),
      };
      const action = new filterAction.FilterAction(actionOptions);

      const hasAction = action.hasAction();

      expect(hasAction).toBe(true);
    });

    it('returns false when actionOption values are undefined', () => {
      const actionOptions = {
        label: undefined,
        archive: undefined,
      };
      const action = new filterAction.FilterAction(actionOptions);

      const hasAction = action.hasAction();

      expect(hasAction).toBe(false);
    });

    it('returns false when string values are empty', () => {
      const actionOptions = {
        label: '',
        forward: '',
        category: '',
      };
      const action = new filterAction.FilterAction(actionOptions);

      const hasAction = action.hasAction();

      expect(hasAction).toBe(false);
    });

    it('returns false when actionOptions is empty', () => {
      const actionOptions = {};
      const action = new filterAction.FilterAction(actionOptions);

      const hasAction = action.hasAction();

      expect(hasAction).toBe(false);
    });

  });

  describe('hasLabel', () => {
    it('returns true when label has string value', () => {
      const actionOptions = {
        label: 'Test Label',
      };
      const action = new filterAction.FilterAction(actionOptions);

      const hasLabel = action.hasLabel();

      expect(hasLabel).toBe(true);
    });

    it('returns true when label is gmail label', () => {
      const actionOptions = {
        label: new GmailLabel({}),
      };
      const action = new filterAction.FilterAction(actionOptions);

      const hasLabel = action.hasLabel();

      expect(hasLabel).toBe(true);
    });

    it('returns false when label is empty string', () => {
      const actionOptions = {
        label: '',
      };
      const action = new filterAction.FilterAction(actionOptions);

      const hasLabel = action.hasLabel();

      expect(hasLabel).toBe(false);
    });

    it('returns false when label is undefined', () => {
      const actionOptions = {
        label: undefined,
      };
      const action = new filterAction.FilterAction(actionOptions);

      const hasLabel = action.hasLabel();

      expect(hasLabel).toBe(false);
    });

    it('returns false when label is null', () => {
      const actionOptions = {
        label: null,
      };
      const action = new filterAction.FilterAction(actionOptions);

      const hasLabel = action.hasLabel();

      expect(hasLabel).toBe(false);
    });
  });

  describe('hasCastedLabel', () => {
    it('returns false when label has string value', () => {
      const actionOptions = {
        label: 'Test Label',
      };
      const action = new filterAction.FilterAction(actionOptions);

      const hasCastedLabel = action.hasCastedLabel();

      expect(hasCastedLabel).toBe(false);
    });

    it('returns true when label is gmail label', () => {
      const actionOptions = {
        label: new GmailLabel({}),
      };
      const action = new filterAction.FilterAction(actionOptions);

      const hasCastedLabel = action.hasCastedLabel();

      expect(hasCastedLabel).toBe(true);
    });

    it('returns true when label is empty string', () => {
      const actionOptions = {
        label: '',
      };
      const action = new filterAction.FilterAction(actionOptions);

      const hasCastedLabel = action.hasCastedLabel();

      expect(hasCastedLabel).toBe(true);
    });

    it('returns true when label is undefined', () => {
      const actionOptions = {
        label: undefined,
      };
      const action = new filterAction.FilterAction(actionOptions);

      const hasCastedLabel = action.hasCastedLabel();

      expect(hasCastedLabel).toBe(true);
    });

    it('returns true when label is null', () => {
      const actionOptions = {
        label: null,
      };
      const action = new filterAction.FilterAction(actionOptions);

      const hasCastedLabel = action.hasCastedLabel();

      expect(hasCastedLabel).toBe(true);
    });
  });

  describe('castAsGmailFilterAction', () => {
    it('returns null when no action is set', () => {
      const action = new filterAction.FilterAction({});

      const gmailAction = action.castAsGmailFilterAction();

      expect(gmailAction).toBe(null);
    });

    it('archive true removes inbox value', () => {
      const action = new filterAction.FilterAction({
        archive: true,
      });

      const gmailAction = action.castAsGmailFilterAction();

      expect(gmailAction).not.toBe(null);
      expect(gmailAction.addLabelIds).toBe(undefined);
      expect(gmailAction.forward).toBe(undefined);
      expect(gmailAction.removeLabelIds).toEqual(['INBOX']);
    });

    it('archive false does nothing', () => {
      const action = new filterAction.FilterAction({
        archive: false,
      });

      const gmailAction = action.castAsGmailFilterAction();

      expect(gmailAction).not.toBe(null);
      expect(gmailAction.addLabelIds).toBe(undefined);
      expect(gmailAction.forward).toBe(undefined);
      expect(gmailAction.removeLabelIds).toBe(undefined);
    });

    it('markRead true removes unread value', () => {
      const action = new filterAction.FilterAction({
        markRead: true,
      });

      const gmailAction = action.castAsGmailFilterAction();

      expect(gmailAction).not.toBe(null);
      expect(gmailAction.addLabelIds).toBe(undefined);
      expect(gmailAction.forward).toBe(undefined);
      expect(gmailAction.removeLabelIds).toEqual(['UNREAD']);
    });

    it('markRead false does nothing', () => {
      const action = new filterAction.FilterAction({
        markRead: false,
      });

      const gmailAction = action.castAsGmailFilterAction();

      expect(gmailAction).not.toBe(null);
      expect(gmailAction.addLabelIds).toBe(undefined);
      expect(gmailAction.forward).toBe(undefined);
      expect(gmailAction.removeLabelIds).toBe(undefined);
    });

    it('markStar true adds star value', () => {
      const action = new filterAction.FilterAction({
        markStar: true,
      });

      const gmailAction = action.castAsGmailFilterAction();

      expect(gmailAction).not.toBe(null);
      expect(gmailAction.addLabelIds).toEqual(['STARRED']);
      expect(gmailAction.forward).toBe(undefined);
      expect(gmailAction.removeLabelIds).toBe(undefined);
    });

    it('markStar false does nothing', () => {
      const action = new filterAction.FilterAction({
        markStar: false,
      });

      const gmailAction = action.castAsGmailFilterAction();

      expect(gmailAction).not.toBe(null);
      expect(gmailAction.addLabelIds).toBe(undefined);
      expect(gmailAction.forward).toBe(undefined);
      expect(gmailAction.removeLabelIds).toBe(undefined);
    });

    it('undefined label does nothing', () => {
      const action = new filterAction.FilterAction({
        forward: 'test@gmail.com', // Required to avoid null return.
        label: undefined,
      });

      const gmailAction = action.castAsGmailFilterAction();

      expect(gmailAction).not.toBe(null);
      expect(gmailAction.addLabelIds).toBe(undefined);
      // Forward not tested as it has received a random value.
      expect(gmailAction.removeLabelIds).toBe(undefined);
    });

    it('empty string label does nothing', () => {
      const action = new filterAction.FilterAction({
        forward: 'test@gmail.com', // Required to avoid null return.
        label: '',
      });

      const gmailAction = action.castAsGmailFilterAction();

      expect(gmailAction).not.toBe(null);
      expect(gmailAction.addLabelIds).toBe(undefined);
      expect(gmailAction.removeLabelIds).toBe(undefined);
    });

    it('label string throws error', () => {
      const action = new filterAction.FilterAction({
        label: 'Label Name',
      });

      expect(() => {
        action.castAsGmailFilterAction();
      }).toThrow(Error('Label must be casted to Gmail label.'));
    });

    it('gmail label adds label id', () => {
      const label = new GmailLabel({
        id: 'ABC',
      });
      const action = new filterAction.FilterAction({
        label: label,
      });

      const gmailAction = action.castAsGmailFilterAction();

      expect(gmailAction).not.toBe(null);
      expect(gmailAction.addLabelIds).toEqual([label.id]);
      expect(gmailAction.removeLabelIds).toBe(undefined);
    });

    it('undefined forward does nothing', () => {
      const action = new filterAction.FilterAction({
        archive: true, // Required to avoid null return.
        forward: undefined,
      });

      const gmailAction = action.castAsGmailFilterAction();

      expect(gmailAction).not.toBe(null);
      expect(gmailAction.addLabelIds).toBe(undefined);
      expect(gmailAction.forward).toBe(undefined);
      // Ignore removeLabelIds because of archive true.
    });

    it('empty string forward does nothing', () => {
      const action = new filterAction.FilterAction({
        archive: true, // Required to avoid null return.
        forward: '',
      });

      const gmailAction = action.castAsGmailFilterAction();

      expect(gmailAction).not.toBe(null);
      expect(gmailAction.addLabelIds).toBe(undefined);
      expect(gmailAction.forward).toBe(undefined);
      // Ignore removeLabelIds because of archive true.
    });

    it('forward string email is set', () => {
      const action = new filterAction.FilterAction({
        forward: 'test@gmail.com',
      });

      const gmailAction = action.castAsGmailFilterAction();

      expect(gmailAction).not.toBe(null);
      expect(gmailAction.addLabelIds).toBe(undefined);
      expect(gmailAction.forward).toEqual('test@gmail.com');
      expect(gmailAction.removeLabelIds).toBe(undefined);
    });

    it('delete true adds trash value', () => {
      const action = new filterAction.FilterAction({
        delete: true,
      });

      const gmailAction = action.castAsGmailFilterAction();

      expect(gmailAction).not.toBe(null);
      expect(gmailAction.addLabelIds).toEqual(['TRASH']);
      expect(gmailAction.forward).toBe(undefined);
      expect(gmailAction.removeLabelIds).toBe(undefined);
    });

    it('delete false does nothing', () => {
      const action = new filterAction.FilterAction({
        delete: false,
      });

      const gmailAction = action.castAsGmailFilterAction();

      expect(gmailAction).not.toBe(null);
      expect(gmailAction.addLabelIds).toBe(undefined);
      expect(gmailAction.forward).toBe(undefined);
      expect(gmailAction.removeLabelIds).toBe(undefined);
    });

    it('neverMarkSpam true removes spam value', () => {
      const action = new filterAction.FilterAction({
        neverMarkSpam: true,
      });

      const gmailAction = action.castAsGmailFilterAction();

      expect(gmailAction).not.toBe(null);
      expect(gmailAction.addLabelIds).toBe(undefined);
      expect(gmailAction.forward).toBe(undefined);
      expect(gmailAction.removeLabelIds).toEqual(['SPAM']);
    });

    it('neverMarkSpam false does nothing', () => {
      const action = new filterAction.FilterAction({
        neverMarkSpam: false,
      });

      const gmailAction = action.castAsGmailFilterAction();

      expect(gmailAction).not.toBe(null);
      expect(gmailAction.addLabelIds).toBe(undefined);
      expect(gmailAction.forward).toBe(undefined);
      expect(gmailAction.removeLabelIds).toBe(undefined);
    });

    it('markImportant true adds important value', () => {
      const action = new filterAction.FilterAction({
        markImportant: true,
      });

      const gmailAction = action.castAsGmailFilterAction();

      expect(gmailAction).not.toBe(null);
      expect(gmailAction.addLabelIds).toEqual(['IMPORTANT']);
      expect(gmailAction.forward).toBe(undefined);
      expect(gmailAction.removeLabelIds).toBe(undefined);
    });

    it('markImportant false does nothing', () => {
      const action = new filterAction.FilterAction({
        markImportant: false,
      });

      const gmailAction = action.castAsGmailFilterAction();

      expect(gmailAction).not.toBe(null);
      expect(gmailAction.addLabelIds).toBe(undefined);
      expect(gmailAction.forward).toBe(undefined);
      expect(gmailAction.removeLabelIds).toBe(undefined);
    });

    it('neverMarkImportant true removes important value', () => {
      const action = new filterAction.FilterAction({
        neverMarkImportant: true,
      });

      const gmailAction = action.castAsGmailFilterAction();

      expect(gmailAction).not.toBe(null);
      expect(gmailAction.addLabelIds).toBe(undefined);
      expect(gmailAction.forward).toBe(undefined);
      expect(gmailAction.removeLabelIds).toEqual(['IMPORTANT']);
    });

    it('neverMarkImportant false does nothing', () => {
      const action = new filterAction.FilterAction({
        neverMarkImportant: false,
      });

      const gmailAction = action.castAsGmailFilterAction();

      expect(gmailAction).not.toBe(null);
      expect(gmailAction.addLabelIds).toBe(undefined);
      expect(gmailAction.forward).toBe(undefined);
      expect(gmailAction.removeLabelIds).toBe(undefined);
    });

    it('undefined category does nothing', () => {
      const action = new filterAction.FilterAction({
        forward: 'test@gmail.com', // Required to avoid null return.
        category: undefined,
      });

      const gmailAction = action.castAsGmailFilterAction();

      expect(gmailAction).not.toBe(null);
      expect(gmailAction.addLabelIds).toBe(undefined);
      // Forward not tested as it has received a random value.
      expect(gmailAction.removeLabelIds).toBe(undefined);
    });

    it('empty string category does nothing', () => {
      const action = new filterAction.FilterAction({
        forward: 'test@gmail.com', // Required to avoid null return.
        category: '',
      });

      const gmailAction = action.castAsGmailFilterAction();

      expect(gmailAction).not.toBe(null);
      expect(gmailAction.addLabelIds).toBe(undefined);
      expect(gmailAction.removeLabelIds).toBe(undefined);
    });

    it('category non-category string throws error', () => {
      const action = new filterAction.FilterAction({
        category: 'NotValidCategoryName',
      });

      expect(() => {
        action.castAsGmailFilterAction();
      }).toThrow(Error(
        'Category NotValidCategoryName not supported. Must be one of ' +
        'PRIMARY, SOCIAL, UPDATES, FORUMS, PROMOTIONS.'));
    });

    [
      ['PRIMARY', 'CATEGORY_PERSONAL'],
      ['Primary', 'CATEGORY_PERSONAL'],
      ['SOCIAL', 'CATEGORY_SOCIAL'],
      ['UPDATES', 'CATEGORY_UPDATES'],
      ['FORUMS', 'CATEGORY_FORUMS'],
      ['PROMOTIONS', 'CATEGORY_PROMOTIONS'],
    ].forEach(([categoryName, expectedLabel]) => {
      it(`category ${categoryName} adds ${expectedLabel} to labels`, () => {
        const action = new filterAction.FilterAction({
          category: categoryName,
        });

        const gmailAction = action.castAsGmailFilterAction();

        expect(gmailAction).not.toBe(null);
        expect(gmailAction.addLabelIds).toEqual([expectedLabel]);
        expect(gmailAction.removeLabelIds).toBe(undefined);
      });
    });

    it('adds several actions together', () => {
      const label = new GmailLabel({
        id: '123',
      });
      const actionOptions = {
        archive: true,
        markRead: true,
        markStar: true,
        label: label,
        delete: true,
        neverMarkSpam: true,
        markImportant: true,
        neverMarkImportant: true,
        category: 'SOCIAL',
        forward: 'test@gmail.com',
      };
      const action = new filterAction.FilterAction(actionOptions);

      const gmailAction = action.castAsGmailFilterAction();

      expect(gmailAction).not.toBe(null);
      expect(gmailAction.addLabelIds).toEqual(
        ['STARRED', '123', 'TRASH', 'IMPORTANT', 'CATEGORY_SOCIAL']);
      expect(gmailAction.forward).toEqual('test@gmail.com');
      expect(gmailAction.removeLabelIds).toEqual(
        ['INBOX', 'UNREAD', 'SPAM', 'IMPORTANT']);
    });
  });
});
