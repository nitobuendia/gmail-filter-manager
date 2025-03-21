/** @fileoverview Tests gmail label. */

import * as gmailLabel from '../../src/label/gmail_label';
import {
  toThrowErrorWithMatchingMessage,
  toThrowErrorWithMatchingMessages,
} from '../jasmine/custom_matchers';

describe('gmailLabel', () => {

  beforeEach(() => {
    jasmine.addMatchers({
      ...toThrowErrorWithMatchingMessage,
      ...toThrowErrorWithMatchingMessages,
    });
  });

  describe('GmailLabel', () => {
    describe('constructor', () => {
      it('assigns property values', () => {
        const color = Object.freeze({
          'textColor': '#ffffff',
          'backgroundColor': '#000000'
        });
        const labelOptions = Object.freeze({
          'id': '123',
          'name': 'Test Label',
          'type': 'User',
          'messageListVisibility': 'hide',
          'labelListVisibility': 'show',
          'color': color,
        });

        const label = new gmailLabel.GmailLabel(labelOptions);

        expect(label.id).toEqual('123');
        expect(label.name).toEqual('Test Label');
        expect(label.type).toEqual('User');
        expect(label.messageListVisibility).toEqual('hide');
        expect(label.labelListVisibility).toEqual('show');
        expect(label.color).toEqual(color);
      });

      it('assigns properties with partial values', () => {
        const labelOptions = Object.freeze({
          'id': '123',
          'name': 'Test Label',
          'type': 'User',
          'messageListVisibility': undefined,
        });

        const label = new gmailLabel.GmailLabel(labelOptions);

        expect(label.id).toEqual('123');
        expect(label.name).toEqual('Test Label');
        expect(label.type).toEqual('User');
        expect(label.messageListVisibility).toBe(undefined);
        expect(label.labelListVisibility).toEqual(undefined);
        expect(label.color).toEqual(undefined);
      });

      it('ignores extra values', () => {
        const labelOptions = Object.freeze({
          'id': '123',
          'name': 'Test Label',
          'otherValue': 'ignored',
        });

        const label = new gmailLabel.GmailLabel(labelOptions);

        expect(label.id).toEqual('123');
        expect(label.name).toEqual('Test Label');
        expect(label.otherValue).toBe(undefined);
      });
    });

    describe('is()', () => {
      it('returns true for the same label', () => {
        const labelOptions = Object.freeze({
          'id': '123',
          'name': 'Test Label',
          'type': 'User',
          'messageListVisibility': 'hide',
          'labelListVisibility': 'show',
          'color': Object.freeze({
            'textColor': '#ffffff',
            'backgroundColor': '#000000'
          }),
        });
        const label = new gmailLabel.GmailLabel(labelOptions);

        const isValue = label.is(label);

        expect(isValue).toBe(true);
      });

      it('returns true for the two labels with same values', () => {
        const labelOptionsA = Object.freeze({
          'id': '123',
          'name': 'Test Label',
          'type': 'User',
          'messageListVisibility': 'hide',
          'labelListVisibility': 'show',
          'color': Object.freeze({
            'textColor': '#ffffff',
            'backgroundColor': '#000000'
          }),
        });
        const labelA = new gmailLabel.GmailLabel(labelOptionsA);
        const labelOptionsB = Object.freeze({
          'id': '123',
          'name': 'Test Label',
          'type': 'User',
          'messageListVisibility': 'hide',
          'labelListVisibility': 'show',
          'color': Object.freeze({
            'textColor': '#ffffff',
            'backgroundColor': '#000000'
          }),
        });
        const labelB = new gmailLabel.GmailLabel(labelOptionsB);

        const isValue = labelA.is(labelB);

        expect(isValue).toBe(true);
      });

      it('returns false when name is different', () => {
        const labelOptionsA = Object.freeze({
          'id': '123',
          'name': 'Test Label',
        });
        const labelA = new gmailLabel.GmailLabel(labelOptionsA);
        const labelOptionsB = Object.freeze({
          'id': '123',
          'name': 'Other Test Label',
        });
        const labelB = new gmailLabel.GmailLabel(labelOptionsB);

        const isValue = labelA.is(labelB);

        expect(isValue).toBe(false);
      });

      it('returns false when name is undefined', () => {
        const labelOptionsA = Object.freeze({
          'id': '123',
          'name': undefined,
        });
        const labelA = new gmailLabel.GmailLabel(labelOptionsA);
        const labelOptionsB = Object.freeze({
          'id': '123',
          'name': undefined,
        });
        const labelB = new gmailLabel.GmailLabel(labelOptionsB);

        const isValue = labelA.is(labelB);

        expect(isValue).toBe(false);
      });

      it('returns false when id is undefined', () => {
        const labelOptionsA = Object.freeze({
          'id': undefined,
          'name': 'Test Label',
        });
        const labelA = new gmailLabel.GmailLabel(labelOptionsA);
        const labelOptionsB = Object.freeze({
          'id': undefined,
          'name': 'Test Label',
        });
        const labelB = new gmailLabel.GmailLabel(labelOptionsB);

        const isValue = labelA.is(labelB);

        expect(isValue).toBe(false);
      });

      it('returns false when name and id are undefined', () => {
        const labelOptionsA = Object.freeze({
          'id': undefined,
          'name': undefined,
        });
        const labelA = new gmailLabel.GmailLabel(labelOptionsA);
        const labelOptionsB = Object.freeze({
          'id': undefined,
          'name': undefined,
        });
        const labelB = new gmailLabel.GmailLabel(labelOptionsB);

        const isValue = labelA.is(labelB);

        expect(isValue).toBe(false);
      });

      it('returns false when id is different', () => {
        const labelOptionsA = Object.freeze({
          'id': '123',
          'name': 'Test Label',
        });
        const labelA = new gmailLabel.GmailLabel(labelOptionsA);
        const labelOptionsB = Object.freeze({
          'id': '789',
          'name': 'Test Label',
        });
        const labelB = new gmailLabel.GmailLabel(labelOptionsB);

        const isValue = labelA.is(labelB);

        expect(isValue).toBe(false);
      });

      it('returns false when name and id are different', () => {
        const labelOptionsA = Object.freeze({
          'id': 'abc',
          'name': 'Test Label',
        });
        const labelA = new gmailLabel.GmailLabel(labelOptionsA);
        const labelOptionsB = Object.freeze({
          'id': '123',
          'name': 'Other Test Label',
        });
        const labelB = new gmailLabel.GmailLabel(labelOptionsB);

        const isValue = labelA.is(labelB);

        expect(isValue).toBe(false);
      });

      it('returns true even when messageListVisibility is different', () => {
        const labelOptionsA = Object.freeze({
          'id': '123',
          'name': 'Test Label',
          'type': 'User',
          'messageListVisibility': 'hide',
          'labelListVisibility': 'show',
        });
        const labelA = new gmailLabel.GmailLabel(labelOptionsA);
        const labelOptionsB = Object.freeze({
          'id': '123',
          'name': 'Test Label',
          'type': 'User',
          'messageListVisibility': 'show',
          'labelListVisibility': 'show',
        });
        const labelB = new gmailLabel.GmailLabel(labelOptionsB);

        const isValue = labelA.is(labelB);

        expect(isValue).toBe(true);
      });

      it('returns true even when labelListVisibility is different', () => {
        const labelOptionsA = Object.freeze({
          'id': '123',
          'name': 'Test Label',
          'type': 'User',
          'messageListVisibility': 'show',
          'labelListVisibility': 'show',
        });
        const labelA = new gmailLabel.GmailLabel(labelOptionsA);
        const labelOptionsB = Object.freeze({
          'id': '123',
          'name': 'Test Label',
          'type': 'User',
          'messageListVisibility': 'show',
          'labelListVisibility': 'hide',
        });
        const labelB = new gmailLabel.GmailLabel(labelOptionsB);

        const isValue = labelA.is(labelB);

        expect(isValue).toBe(true);
      });
    });

    describe('equals()', () => {
      it('returns true for the same label', () => {
        const labelOptions = Object.freeze({
          'id': '123',
          'name': 'Test Label',
          'type': 'User',
          'messageListVisibility': 'hide',
          'labelListVisibility': 'show',
          'color': Object.freeze({
            'textColor': '#ffffff',
            'backgroundColor': '#000000'
          }),
        });
        const label = new gmailLabel.GmailLabel(labelOptions);

        const isEqual = label.equals(label);

        expect(isEqual).toBe(true);
      });

      it('returns true for the two labels with same values', () => {
        const labelOptionsA = Object.freeze({
          'id': '123',
          'name': 'Test Label',
          'type': 'User',
          'messageListVisibility': 'hide',
          'labelListVisibility': 'show',
          'color': Object.freeze({
            'textColor': '#ffffff',
            'backgroundColor': '#000000'
          }),
        });
        const labelA = new gmailLabel.GmailLabel(labelOptionsA);
        const labelOptionsB = Object.freeze({
          'id': '123',
          'name': 'Test Label',
          'type': 'User',
          'messageListVisibility': 'hide',
          'labelListVisibility': 'show',
          'color': Object.freeze({
            'textColor': '#ffffff',
            'backgroundColor': '#000000'
          }),
        });
        const labelB = new gmailLabel.GmailLabel(labelOptionsB);

        const isEqual = labelA.equals(labelB);

        expect(isEqual).toBe(true);
      });

      it('returns false when name is different', () => {
        const labelOptionsA = Object.freeze({
          'id': '123',
          'name': 'Test Label',
        });
        const labelA = new gmailLabel.GmailLabel(labelOptionsA);
        const labelOptionsB = Object.freeze({
          'id': '123',
          'name': 'Other Test Label',
        });
        const labelB = new gmailLabel.GmailLabel(labelOptionsB);

        const isEqual = labelA.equals(labelB);

        expect(isEqual).toBe(false);
      });

      it('returns false when name is undefined', () => {
        const labelOptionsA = Object.freeze({
          'id': '123',
          'name': undefined,
        });
        const labelA = new gmailLabel.GmailLabel(labelOptionsA);
        const labelOptionsB = Object.freeze({
          'id': '123',
          'name': undefined,
        });
        const labelB = new gmailLabel.GmailLabel(labelOptionsB);

        const isEqual = labelA.equals(labelB);

        expect(isEqual).toBe(false);
      });

      it('returns false when id is undefined', () => {
        const labelOptionsA = Object.freeze({
          'id': undefined,
          'name': 'Test Label',
        });
        const labelA = new gmailLabel.GmailLabel(labelOptionsA);
        const labelOptionsB = Object.freeze({
          'id': undefined,
          'name': 'Test Label',
        });
        const labelB = new gmailLabel.GmailLabel(labelOptionsB);

        const isEqual = labelA.equals(labelB);

        expect(isEqual).toBe(false);
      });

      it('returns false when name and id are undefined', () => {
        const labelOptionsA = Object.freeze({
          'id': undefined,
          'name': undefined,
        });
        const labelA = new gmailLabel.GmailLabel(labelOptionsA);
        const labelOptionsB = Object.freeze({
          'id': undefined,
          'name': undefined,
        });
        const labelB = new gmailLabel.GmailLabel(labelOptionsB);

        const isEqual = labelA.equals(labelB);

        expect(isEqual).toBe(false);
      });

      it('returns false when id is different', () => {
        const labelOptionsA = Object.freeze({
          'id': '123',
          'name': 'Test Label',
        });
        const labelA = new gmailLabel.GmailLabel(labelOptionsA);
        const labelOptionsB = Object.freeze({
          'id': '789',
          'name': 'Test Label',
        });
        const labelB = new gmailLabel.GmailLabel(labelOptionsB);

        const isEqual = labelA.equals(labelB);

        expect(isEqual).toBe(false);
      });

      it('returns false when name and id are different', () => {
        const labelOptionsA = Object.freeze({
          'id': 'abc',
          'name': 'Test Label',
        });
        const labelA = new gmailLabel.GmailLabel(labelOptionsA);
        const labelOptionsB = Object.freeze({
          'id': '123',
          'name': 'Other Test Label',
        });
        const labelB = new gmailLabel.GmailLabel(labelOptionsB);

        const isEqual = labelA.equals(labelB);

        expect(isEqual).toBe(false);
      });

      it('returns false when messageListVisibility is different', () => {
        const labelOptionsA = Object.freeze({
          'id': '123',
          'name': 'Test Label',
          'type': 'User',
          'messageListVisibility': 'hide',
          'labelListVisibility': 'show',
        });
        const labelA = new gmailLabel.GmailLabel(labelOptionsA);
        const labelOptionsB = Object.freeze({
          'id': '123',
          'name': 'Test Label',
          'type': 'User',
          'messageListVisibility': 'show',
          'labelListVisibility': 'show',
        });
        const labelB = new gmailLabel.GmailLabel(labelOptionsB);

        const isEqual = labelA.equals(labelB);

        expect(isEqual).toBe(false);
      });

      it('returns false when labelListVisibility is different', () => {
        const labelOptionsA = Object.freeze({
          'id': '123',
          'name': 'Test Label',
          'type': 'User',
          'messageListVisibility': 'show',
          'labelListVisibility': 'show',
        });
        const labelA = new gmailLabel.GmailLabel(labelOptionsA);
        const labelOptionsB = Object.freeze({
          'id': '123',
          'name': 'Test Label',
          'type': 'User',
          'messageListVisibility': 'show',
          'labelListVisibility': 'hide',
        });
        const labelB = new gmailLabel.GmailLabel(labelOptionsB);

        const isEqual = labelA.equals(labelB);

        expect(isEqual).toBe(false);
      });
    });

    describe('importMissingValuesFromLabel', () => {
      it('sets values that were not set', () => {
        const emptyLabel = new gmailLabel.GmailLabel({});
        const labelOptions = Object.freeze({
          'id': '123',
          'name': 'Test Label',
          'type': 'User',
          'messageListVisibility': 'hide',
          'labelListVisibility': 'show',
          'color': Object.freeze({
            'textColor': '#ffffff',
            'backgroundColor': '#000000'
          }),
        });
        const fullLabel = new gmailLabel.GmailLabel(labelOptions);

        emptyLabel.importMissingValuesFromLabel(fullLabel);

        expect(emptyLabel.messageListVisibility).toEqual(
          fullLabel.messageListVisibility);
        expect(emptyLabel.labelListVisibility).toEqual(
          fullLabel.labelListVisibility);
        expect(emptyLabel.color).toEqual(fullLabel.color);
      });

      it('does not set name and id', () => {
        const emptyLabel = new gmailLabel.GmailLabel({});
        const labelOptions = Object.freeze({
          'id': '123',
          'name': 'Test Label',
          'type': 'User',
          'messageListVisibility': 'hide',
          'labelListVisibility': 'show',
          'color': Object.freeze({
            'textColor': '#ffffff',
            'backgroundColor': '#000000'
          }),
        });
        const fullLabel = new gmailLabel.GmailLabel(labelOptions);

        emptyLabel.importMissingValuesFromLabel(fullLabel);

        expect(emptyLabel.name).not.toEqual(fullLabel.name);
        expect(emptyLabel.id).not.toEqual(fullLabel.id);
      });

      it('does not set existing values', () => {
        const originalLabelOptions = Object.freeze({
          'id': '123',
          'name': 'Test Label',
          'type': 'User',
          'messageListVisibility': 'hide',
          'labelListVisibility': 'show',
          'color': Object.freeze({
            'textColor': '#ffffff',
            'backgroundColor': '#000000'
          }),
        });
        const originalLabel = new gmailLabel.GmailLabel(originalLabelOptions);
        const newLabelOptions = Object.freeze({
          'id': '456',
          'name': 'Other Test Label',
          'type': 'System',
          'messageListVisibility': 'show',
          'labelListVisibility': 'hide',
          'color': Object.freeze({
            'textColor': '#000000',
            'backgroundColor': '#ffffff'
          }),
        });
        const newLabel = new gmailLabel.GmailLabel(newLabelOptions);

        originalLabel.importMissingValuesFromLabel(newLabel);

        expect(originalLabel.name).not.toEqual(newLabel.name);
        expect(originalLabel.id).not.toEqual(newLabel.id);
        expect(originalLabel.messageListVisibility).not.toEqual(
          newLabel.messageListVisibility);
        expect(originalLabel.labelListVisibility).not.toEqual(
          newLabel.labelListVisibility);
        expect(originalLabel.color).not.toEqual(newLabel.color);
      });

      it('sets full color if it was not set', () => {
        const originalLabelOptions = Object.freeze({
          'id': '123',
          'name': 'Test Label',
        });
        const originalLabel = new gmailLabel.GmailLabel(originalLabelOptions);
        const newLabelOptions = Object.freeze({
          'id': '456',
          'name': 'Other Test Label',
          'color': Object.freeze({
            'textColor': '#000000',
            'backgroundColor': '#ffffff',
          }),
        });
        const newLabel = new gmailLabel.GmailLabel(newLabelOptions);

        originalLabel.importMissingValuesFromLabel(newLabel);

        expect(originalLabel.color).toEqual(newLabel.color);
      });

      it('sets only text color if color was set but not text color', () => {
        const originalLabelOptions = Object.freeze({
          'id': '123',
          'name': 'Test Label',
          'color': {
            'backgroundColor': '#00ff00',
          }
        });
        const originalLabel = new gmailLabel.GmailLabel(originalLabelOptions);
        const newLabelOptions = Object.freeze({
          'id': '456',
          'name': 'Other Test Label',
          'color': Object.freeze({
            'textColor': '#000000',
            'backgroundColor': '#ffffff',
          }),
        });
        const newLabel = new gmailLabel.GmailLabel(newLabelOptions);

        originalLabel.importMissingValuesFromLabel(newLabel);

        expect(originalLabel.color.textColor).toEqual(newLabel.color.textColor);
        expect(originalLabel.color.backgroundColor)
          .not.toEqual(newLabel.color.backgroundColor);
      });

      it('sets only background color if color was set but not background color',
        () => {
          const originalLabelOptions = Object.freeze({
            'id': '123',
            'name': 'Test Label',
            'color': {
              'textColor': '#00ff00',
            }
          });
          const originalLabel = new gmailLabel.GmailLabel(originalLabelOptions);
          const newLabelOptions = Object.freeze({
            'id': '456',
            'name': 'Other Test Label',
            'color': Object.freeze({
              'textColor': '#000000',
              'backgroundColor': '#ffffff',
            }),
          });
          const newLabel = new gmailLabel.GmailLabel(newLabelOptions);

          originalLabel.importMissingValuesFromLabel(newLabel);

          expect(originalLabel.color.textColor)
            .not.toEqual(newLabel.color.textColor);
          expect(originalLabel.color.backgroundColor)
            .toEqual(newLabel.color.backgroundColor);
        });

      it('does not set color if not defined', () => {
        const originalLabelOptions = Object.freeze({
          'id': '123',
          'name': 'Test Label',
          'color': {
            'textColor': '#00ff00',
          }
        });
        const originalLabel = new gmailLabel.GmailLabel(originalLabelOptions);
        const newLabelOptions = Object.freeze({
          'id': '456',
          'name': 'Other Test Label',
        });
        const newLabel = new gmailLabel.GmailLabel(newLabelOptions);

        originalLabel.importMissingValuesFromLabel(newLabel);

        expect(originalLabel.color.textColor).toEqual('#00ff00');
        expect(originalLabel.color.backgroundColor).toBe(undefined);
      });
    });

    describe('castAsGmailResource', () => {
      it('casts label into Gmail object', () => {
        const expectedGmailResource = {
          'id': '123',
          'name': 'Test Label',
          'messageListVisibility': 'show',
          'labelListVisibility': 'show',
        };
        const label = new gmailLabel.GmailLabel({
          ...expectedGmailResource,
          'type': 'User',
        });

        const gmailResource = label.castAsGmailResource();

        expect(gmailResource).toEqual(expectedGmailResource);
      });

      it('casts label into Gmail object, including color values', () => {
        const expectedGmailResource = {
          'id': '123',
          'name': 'Test Label',
          'messageListVisibility': 'show',
          'labelListVisibility': 'show',
          'color': {
            'textColor': '#ffffff',
            'backgroundColor': '#000000',
          }
        };
        const label = new gmailLabel.GmailLabel({
          ...expectedGmailResource,
          'type': 'User',
        });

        const gmailResource = label.castAsGmailResource();

        expect(gmailResource).toEqual(expectedGmailResource);
      });

      it('casts to a label even if id is not defined', () => {
        const labelOptions = Object.freeze({
          'name': 'Test Label',
          'type': 'User',
          'messageListVisibility': 'show',
          'labelListVisibility': 'show',
        });
        const label = new gmailLabel.GmailLabel(labelOptions);

        const gmailResource = label.castAsGmailResource();

        expect(gmailResource.id).toBe(undefined);
      });

      it('throws error if name is not defined', () => {
        const labelOptions = Object.freeze({
          'id': '123',
          'name': undefined,
          'type': 'User',
          'messageListVisibility': 'show',
          'labelListVisibility': 'show',
        });
        const label = new gmailLabel.GmailLabel(labelOptions);

        const outputFunction = () => {
          label.castAsGmailResource();
        };

        expect(outputFunction)
          .toThrowErrorWithMatchingMessages(['Name', 'required']);
      });

      it('throws error if labelListVisibility is not defined', () => {
        const labelOptions = Object.freeze({
          'id': '123',
          'name': 'Test Label',
          'type': 'User',
          'messageListVisibility': 'show',
        });
        const label = new gmailLabel.GmailLabel(labelOptions);

        const outputFunction = () => {
          label.castAsGmailResource();
        };

        expect(outputFunction).toThrowErrorWithMatchingMessages(
          ['Label visibility', 'required']);
      });

      it('throws error if messageListVisibility is not defined', () => {
        const labelOptions = Object.freeze({
          'id': '123',
          'name': 'Test Label',
          'type': 'User',
          'labelListVisibility': 'show',
        });
        const label = new gmailLabel.GmailLabel(labelOptions);

        const outputFunction = () => {
          label.castAsGmailResource();
        };

        expect(outputFunction).toThrowErrorWithMatchingMessages(
          ['Message visibility', 'required']);
      });

      it('throws error if color is defined, but text color is not', () => {
        const labelOptions = Object.freeze({
          'id': '123',
          'name': 'Test Label',
          'type': 'User',
          'messageListVisibility': 'show',
          'labelListVisibility': 'hide',
          'color': {
            'backgroundColor': '#ffffff',
          }
        });
        const label = new gmailLabel.GmailLabel(labelOptions);

        const outputFunction = () => {
          label.castAsGmailResource();
        };

        expect(outputFunction).toThrowErrorWithMatchingMessage(
          'missing text color');
      });

      it('throws error if color is defined, but background color is not',
        () => {
          const labelOptions = Object.freeze({
            'id': '123',
            'name': 'Test Label',
            'type': 'User',
            'messageListVisibility': 'show',
            'labelListVisibility': 'hide',
            'color': {
              'textColor': '#ffffff',
            }
          });
          const label = new gmailLabel.GmailLabel(labelOptions);

          const outputFunction = () => {
            label.castAsGmailResource();
          };

          expect(outputFunction).toThrowErrorWithMatchingMessage(
            'missing background color');
        });
    });
  });
});
