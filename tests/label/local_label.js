/** @fileoverview Tests local label. */

import * as localLabel from '../../src/label/local_label';
import { GmailLabel } from '../../src/label/gmail_label';
import {
  toThrowErrorWithMatchingMessage,
  toThrowErrorWithMatchingMessages,
} from '../jasmine/custom_matchers';

describe('Label', () => {

  beforeEach(() => {
    jasmine.addMatchers({
      ...toThrowErrorWithMatchingMessage,
      ...toThrowErrorWithMatchingMessages,
    });
  });

  describe('constructor', () => {
    it('instantiates without errors', () => {
      const label = new localLabel.Label({
        'name': 'Test Label',
        'labelVisibility': 'show',
        'messageVisibility': 'show',
        'backgroundColor': '#ffffff',
        'textColor': '#000000',
      });

      expect(label).not.toBe(null);
    });

    it('sets class attributes', () => {
      const label = new localLabel.Label({
        'name': 'Test Label',
        'labelVisibility': 'show',
        'messageVisibility': 'show',
        'backgroundColor': '#ffffff',
        'textColor': '#000000',
      });

      expect(label.name).toEqual('Test Label');
      expect(label.labelVisibility).toEqual('show');
      expect(label.messageVisibility).toEqual('show');
      expect(label.backgroundColor).toEqual('#ffffff');
      expect(label.textColor).toEqual('#000000');
    });

    [
      ['Show', 'show'],
      ['HIDE', 'hide'],
      ['showIfUnread', 'showifunread'],
    ].forEach(([testValue, expectedValue]) => {
      it(`sets and parses label list visibility for value ${testValue}`, () => {
        const label = new localLabel.Label({
          'name': 'Test Label',
          'labelVisibility': testValue,
          'messageVisibility': 'show',
          'backgroundColor': '#ffffff',
          'textColor': '#000000',
        });

        expect(label.labelVisibility).toEqual(expectedValue);
      });
    });

    [
      ['Show', 'show'],
      ['HIDE', 'hide'],
    ].forEach(([testValue, expectedValue]) => {
      it(`sets and parses message list visibility for value ${testValue}`,
        () => {
          const label = new localLabel.Label({
            'name': 'Test Label',
            'labelVisibility': 'show',
            'messageVisibility': testValue,
            'backgroundColor': '#ffffff',
            'textColor': '#000000',
          });

          expect(label.messageVisibility).toEqual(expectedValue);
        });
    });

    it('throws if no name is provided', () => {
      const labelFunction = () => {
        new localLabel.Label({})
      };

      expect(labelFunction).toThrowErrorWithMatchingMessages(
        ['Name', 'required']);
    });

    it('throws if text color is not provided in hex', () => {
      const labelFunction = () => {
        new localLabel.Label({
          'name': 'Test label',
          'textColor': 'red',
          'backgroundColor': '#000000',
        });
      };

      expect(labelFunction).toThrowErrorWithMatchingMessages(['Color', 'hex']);
    });

    it('throws if background color is not provided in hex', () => {
      const labelFunction = () => {
        new localLabel.Label({
          'name': 'Test label',
          'textColor': '#ffffff',
          'backgroundColor': 'red',
        });
      };

      expect(labelFunction).toThrowErrorWithMatchingMessages(['Color', 'hex']);
    });

    it('throws if text color is not supported by gmail', () => {
      const labelFunction = () => {
        new localLabel.Label({
          'name': 'Test label',
          'textColor': '#123456',
          'backgroundColor': '#000000',
        });
      };

      expect(labelFunction)
        .toThrowErrorWithMatchingMessage('supported gmail colors');
    });

    it('throws if background color is not supported by gmail', () => {
      const labelFunction = () => {
        new localLabel.Label({
          'name': 'Test label',
          'textColor': '#123456',
          'backgroundColor': '#000000',
        });
      };

      expect(labelFunction)
        .toThrowErrorWithMatchingMessage('supported gmail colors');
    });
  });

  describe('castAsGmailLabel', () => {
    it('casts local label into Gmail label', () => {
      const label = new localLabel.Label({
        'name': 'Test Label',
      });

      const gmailLabel = label.castAsGmailLabel();

      expect(gmailLabel).toBeInstanceOf(GmailLabel);
      expect(gmailLabel.name).toEqual('Test Label');
      expect(gmailLabel.labelListVisibility).toBe(undefined);
      expect(gmailLabel.messageListVisibility).toBe(undefined);
      expect(gmailLabel.color).toBe(undefined);
    });

    it('sets all Gmail label attributes', () => {
      const label = new localLabel.Label({
        'name': 'Test Label',
        'labelVisibility': 'show',
        'messageVisibility': 'show',
        'backgroundColor': '#ffffff',
        'textColor': '#000000',
      });

      const gmailLabel = label.castAsGmailLabel();

      expect(gmailLabel).toBeInstanceOf(GmailLabel);
      expect(gmailLabel.name).toEqual('Test Label');
      expect(gmailLabel.labelListVisibility).toEqual('labelShow');
      expect(gmailLabel.messageListVisibility).toEqual('show');
      expect(gmailLabel.color.backgroundColor).toEqual('#ffffff');
      expect(gmailLabel.color.textColor).toEqual('#000000');
    });

    it('sets color if text color is present', () => {
      const label = new localLabel.Label({
        'name': 'Test Label',
        'textColor': '#000000',
      });

      const gmailLabel = label.castAsGmailLabel();

      expect(gmailLabel).toBeInstanceOf(GmailLabel);
      expect(gmailLabel.name).toEqual('Test Label');
      expect(gmailLabel.color.backgroundColor).toBe(undefined);
      expect(gmailLabel.color.textColor).toEqual('#000000');
    });

    it('sets color if background color is present', () => {
      const label = new localLabel.Label({
        'name': 'Test Label',
        'backgroundColor': '#000000',
      });

      const gmailLabel = label.castAsGmailLabel();

      expect(gmailLabel).toBeInstanceOf(GmailLabel);
      expect(gmailLabel.name).toEqual('Test Label');
      expect(gmailLabel.color.backgroundColor).toEqual('#000000');
      expect(gmailLabel.color.textColor).toBe(undefined);
    });

  });
});
