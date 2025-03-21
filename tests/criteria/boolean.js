/** @fileoverview Tests boolean criteria. */

import * as boolean from '../../src/criteria/boolean';
import {
  toThrowErrorWithMatchingMessages,
} from '../jasmine/custom_matchers';

describe('boolean', () => {

  beforeEach(() => {
    jasmine.addMatchers({
      ...toThrowErrorWithMatchingMessages,
    });
  });

  describe('HasAttachmentFilter', () => {
    describe('constructor', () => {
      it('sets without error', () => {
        const attachmentFilter = new boolean.HasAttachmentFilter(true);

        expect(attachmentFilter).not.toBe(null);
      });

      it('throws if value is not boolean', () => {
        const testFunction = () => {
          new boolean.HasAttachmentFilter('string');
        };

        expect(testFunction).toThrowErrorWithMatchingMessages(
          ['boolean', 'value']);
      });
    });

    describe('toString', () => {
      it('attachment true produces expected output string', () => {
        const attachmentFilter = new boolean.HasAttachmentFilter(true);

        const filterString = attachmentFilter.toString();

        expect(filterString).toEqual('has:attachment');
      });

      it('attachment false produces expected output string', () => {
        const attachmentFilter = new boolean.HasAttachmentFilter(false);

        const filterString = attachmentFilter.toString();

        expect(filterString).toEqual('-has:attachment');
      });
    });
  });

  describe('HasDriveFilter', () => {
    describe('constructor', () => {
      it('sets without error', () => {
        const driveFilter = new boolean.HasDriveFilter(true);

        expect(driveFilter).not.toBe(null);
      });
    });

    it('throws if value is not boolean', () => {
      const testFunction = () => {
        new boolean.HasDriveFilter('string');
      };

      expect(testFunction).toThrowErrorWithMatchingMessages(
        ['boolean', 'value']);
    });

    describe('toString', () => {
      it('drive true produces expected output string', () => {
        const driveFilter = new boolean.HasDriveFilter(true);

        const filterString = driveFilter.toString();

        expect(filterString).toEqual('has:drive');
      });

      it('drive false produces expected output string', () => {
        const driveFilter = new boolean.HasDriveFilter(false);

        const filterString = driveFilter.toString();

        expect(filterString).toEqual('-has:drive');
      });
    });
  });

  describe('HasDocumentFilter', () => {
    describe('constructor', () => {
      it('sets without error', () => {
        const documentFilter = new boolean.HasDocumentFilter(true);

        expect(documentFilter).not.toBe(null);
      });

      it('throws if value is not boolean', () => {
        const testFunction = () => {
          new boolean.HasDocumentFilter('string');
        };

        expect(testFunction).toThrowErrorWithMatchingMessages(
          ['boolean', 'value']);
      });
    });

    describe('toString', () => {
      it('document true produces expected output string', () => {
        const documentFilter = new boolean.HasDocumentFilter(true);

        const filterString = documentFilter.toString();

        expect(filterString).toEqual('has:document');
      });

      it('document false produces expected output string', () => {
        const documentFilter = new boolean.HasDocumentFilter(false);

        const filterString = documentFilter.toString();

        expect(filterString).toEqual('-has:document');
      });
    });
  });

  describe('HasNoUserLabelsFilter', () => {
    describe('constructor', () => {
      it('sets without error', () => {
        const noUserLabelsFilter = new boolean.HasNoUserLabelsFilter(true);

        expect(noUserLabelsFilter).not.toBe(null);
      });

      it('throws if value is not boolean', () => {
        const testFunction = () => {
          new boolean.HasNoUserLabelsFilter('string');
        };

        expect(testFunction).toThrowErrorWithMatchingMessages(
          ['boolean', 'value']);
      });
    });

    describe('toString', () => {
      it('NoUserLabels true produces expected output string', () => {
        const noUserLabelsFilter = new boolean.HasNoUserLabelsFilter(true);

        const filterString = noUserLabelsFilter.toString();

        expect(filterString).toEqual('has:nouserlabels');
      });

      it('NoUserLabels false produces expected output string', () => {
        const noUserLabelsFilter = new boolean.HasNoUserLabelsFilter(false);

        const filterString = noUserLabelsFilter.toString();

        expect(filterString).toEqual('-has:nouserlabels');
      });
    });
  });

  describe('HasSpreadsheetFilter', () => {
    describe('constructor', () => {
      it('sets without error', () => {
        const spreadsheetFilter = new boolean.HasSpreadsheetFilter(true);

        expect(spreadsheetFilter).not.toBe(null);
      });

      it('throws if value is not boolean', () => {
        const testFunction = () => {
          new boolean.HasSpreadsheetFilter('string');
        };

        expect(testFunction).toThrowErrorWithMatchingMessages(
          ['boolean', 'value']);
      });
    });

    describe('toString', () => {
      it('document true produces expected output string', () => {
        const spreadsheetFilter = new boolean.HasSpreadsheetFilter(true);

        const filterString = spreadsheetFilter.toString();

        expect(filterString).toEqual('has:spreadsheet');
      });

      it('document false produces expected output string', () => {
        const spreadsheetFilter = new boolean.HasSpreadsheetFilter(false);

        const filterString = spreadsheetFilter.toString();

        expect(filterString).toEqual('-has:spreadsheet');
      });
    });
  });

  describe('HasPresentationFilter', () => {
    describe('constructor', () => {
      it('sets without error', () => {
        const presentationFilter = new boolean.HasPresentationFilter(true);

        expect(presentationFilter).not.toBe(null);
      });

      it('throws if value is not boolean', () => {
        const testFunction = () => {
          new boolean.HasPresentationFilter('string');
        };

        expect(testFunction).toThrowErrorWithMatchingMessages(
          ['boolean', 'value']);
      });
    });

    describe('toString', () => {
      it('presentation true produces expected output string', () => {
        const presentationFilter = new boolean.HasPresentationFilter(true);

        const filterString = presentationFilter.toString();

        expect(filterString).toEqual('has:presentation');
      });

      it('presentation false produces expected output string', () => {
        const presentationFilter = new boolean.HasPresentationFilter(false);

        const filterString = presentationFilter.toString();

        expect(filterString).toEqual('-has:presentation');
      });
    });
  });

  describe('HasYouTubeFilter', () => {
    describe('constructor', () => {
      it('sets without error', () => {
        const youTubeFilter = new boolean.HasYouTubeFilter(true);

        expect(youTubeFilter).not.toBe(null);
      });

      it('throws if value is not boolean', () => {
        const testFunction = () => {
          new boolean.HasYouTubeFilter('string');
        };

        expect(testFunction).toThrowErrorWithMatchingMessages(
          ['boolean', 'value']);
      });
    });

    describe('toString', () => {
      it('YouTube true produces expected output string', () => {
        const youTubeFilter = new boolean.HasYouTubeFilter(true);

        const filterString = youTubeFilter.toString();

        expect(filterString).toEqual('has:youtube');
      });

      it('YouTube false produces expected output string', () => {
        const youTubeFilter = new boolean.HasYouTubeFilter(false);

        const filterString = youTubeFilter.toString();

        expect(filterString).toEqual('-has:youtube');
      });
    });
  });

  describe('IsChatFilter', () => {
    describe('constructor', () => {
      it('sets without error', () => {
        const chatFilter = new boolean.IsChatFilter(true);

        expect(chatFilter).not.toBe(null);
      });

      it('throws if value is not boolean', () => {
        const testFunction = () => {
          new boolean.IsChatFilter('string');
        };

        expect(testFunction).toThrowErrorWithMatchingMessages(
          ['boolean', 'value']);
      });
    });

    describe('toString', () => {
      it('chat true produces expected output string', () => {
        const chatFilter = new boolean.IsChatFilter(true);

        const filterString = chatFilter.toString();

        expect(filterString).toEqual('is:chat');
      });

      it('chat false produces expected output string', () => {
        const chatFilter = new boolean.IsChatFilter(false);

        const filterString = chatFilter.toString();

        expect(filterString).toEqual('-is:chat');
      });
    });
  });

  describe('IsImportantFilter', () => {
    describe('constructor', () => {
      it('sets without error', () => {
        const importantFilter = new boolean.IsImportantFilter(true);

        expect(importantFilter).not.toBe(null);
      });

      it('throws if value is not boolean', () => {
        const testFunction = () => {
          new boolean.IsImportantFilter('string');
        };

        expect(testFunction).toThrowErrorWithMatchingMessages(
          ['boolean', 'value']);
      });
    });

    describe('toString', () => {
      it('important true produces expected output string', () => {
        const importantFilter = new boolean.IsImportantFilter(true);

        const filterString = importantFilter.toString();

        expect(filterString).toEqual('is:important');
      });

      it('important false produces expected output string', () => {
        const importantFilter = new boolean.IsImportantFilter(false);

        const filterString = importantFilter.toString();

        expect(filterString).toEqual('-is:important');
      });
    });
  });

  describe('IsStarredFilter', () => {
    describe('constructor', () => {
      it('sets without error', () => {
        const starredFilter = new boolean.IsStarredFilter(true);

        expect(starredFilter).not.toBe(null);
      });

      it('throws if value is not boolean', () => {
        const testFunction = () => {
          new boolean.IsStarredFilter('string');
        };

        expect(testFunction).toThrowErrorWithMatchingMessages(
          ['boolean', 'value']);
      });
    });

    describe('toString', () => {
      it('starred true produces expected output string', () => {
        const starredFilter = new boolean.IsStarredFilter(true);

        const filterString = starredFilter.toString();

        expect(filterString).toEqual('is:starred');
      });

      it('starred false produces expected output string', () => {
        const starredFilter = new boolean.IsStarredFilter(false);

        const filterString = starredFilter.toString();

        expect(filterString).toEqual('-is:starred');
      });
    });
  });

  describe('IsSnoozedFilter', () => {
    describe('constructor', () => {
      it('sets without error', () => {
        const snoozedFilter = new boolean.IsSnoozedFilter(true);

        expect(snoozedFilter).not.toBe(null);
      });

      it('throws if value is not boolean', () => {
        const testFunction = () => {
          new boolean.IsSnoozedFilter('string');
        };

        expect(testFunction).toThrowErrorWithMatchingMessages(
          ['boolean', 'value']);
      });
    });

    describe('toString', () => {
      it('starred true produces expected output string', () => {
        const snoozedFilter = new boolean.IsSnoozedFilter(true);

        const filterString = snoozedFilter.toString();

        expect(filterString).toEqual('is:snoozed');
      });

      it('starred false produces expected output string', () => {
        const snoozedFilter = new boolean.IsSnoozedFilter(false);

        const filterString = snoozedFilter.toString();

        expect(filterString).toEqual('-is:snoozed');
      });
    });
  });

  describe('IsUnreadFilter', () => {
    describe('constructor', () => {
      it('sets without error', () => {
        const unreadFilter = new boolean.IsUnreadFilter(true);

        expect(unreadFilter).not.toBe(null);
      });

      it('throws if value is not boolean', () => {
        const testFunction = () => {
          new boolean.IsUnreadFilter('string');
        };

        expect(testFunction).toThrowErrorWithMatchingMessages(
          ['boolean', 'value']);
      });
    });

    describe('toString', () => {
      it('starred true produces expected output string', () => {
        const unreadFilter = new boolean.IsUnreadFilter(true);

        const filterString = unreadFilter.toString();

        expect(filterString).toEqual('is:unread');
      });

      it('starred false produces expected output string', () => {
        const unreadFilter = new boolean.IsUnreadFilter(false);

        const filterString = unreadFilter.toString();

        expect(filterString).toEqual('-is:unread');
      });
    });
  });

  describe('IsReadFilter', () => {
    describe('constructor', () => {
      it('sets without error', () => {
        const unreadFilter = new boolean.IsReadFilter(true);

        expect(unreadFilter).not.toBe(null);
      });

      it('throws if value is not boolean', () => {
        const testFunction = () => {
          new boolean.IsReadFilter('string');
        };

        expect(testFunction).toThrowErrorWithMatchingMessages(
          ['boolean', 'value']);
      });
    });

    describe('toString', () => {
      it('starred true produces expected output string', () => {
        const readFilter = new boolean.IsReadFilter(true);

        const filterString = readFilter.toString();

        expect(filterString).toEqual('is:read');
      });

      it('starred false produces expected output string', () => {
        const readFilter = new boolean.IsReadFilter(false);

        const filterString = readFilter.toString();

        expect(filterString).toEqual('-is:read');
      });
    });
  });
});
