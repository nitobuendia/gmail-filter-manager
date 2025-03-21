/**
 * @fileoverview Provides Custom Matchers for Jasmine tests.
 */

const toThrowErrorWithMatchingMessage = {
  toThrowErrorWithMatchingMessage: () => {
    return {
      /**
       * Passes the test if functionToRun throws an error whose message matches
       * expectedTextFragment.
       * @param {function<>} functionToRun Function to run that should throw
       *  error.
       * @param {string} expectedTextFragment Text to match against error
       *  message.
       */
      compare: (functionToRun, expectedTextFragment) => {
        const result = {
          pass: false,
          message: 'Error not matched.'
        };

        try {
          functionToRun();
          result.pass = false;
          result.message = 'Expected function to throw but no error was thrown';
        } catch (e) {
          if (e.message.includes(expectedTextFragment)) {
            result.pass = true;
            result.message =
              `Function threw error [${e.message}], ` +
              `containing [${expectedTextFragment}].`;
          } else {
            result.pass = false;
            result.message =
              `Function threw error [${e.message}], but it didn't contain ` +
              `[${expectedTextFragment}].`;
          }
        }

        return result;
      },
    };
  },
};

const toThrowErrorWithMatchingMessages = {
  toThrowErrorWithMatchingMessages: () => {
    return {
      /**
       * Passes the test if functionToRun throws an error whose message matches
       * all the expectedTextFragments.
       * @param {function<>} functionToRun Function to run that should throw
       *  error.
       * @param {!Array<string>} expectedTextFragments List of texts to match
       *  against error message.
       */
      compare: (functionToRun, expectedTextFragments) => {
        try {
          functionToRun();
          return {
            pass: false,
            message: 'Expected function to throw but no error was thrown',
          };
        } catch (e) {
          let pass = true;
          let unmatchedFragments = [];
          for (const expectedTextFragment of expectedTextFragments) {
            if (!e.message.includes(expectedTextFragment)) {
              unmatchedFragments.push(expectedTextFragment);
              pass = false;
            }
          }

          if (pass) {
            return {
              pass: true,
              message:
                `Function threw error [${e.message}], ` +
                `containing [${expectedTextFragments.join('], [')}].`,
            }
          }

          return {
            pass: false,
            message:
              `Function threw error [${e.message}], but it didn't contain ` +
              `[${unmatchedFragments.join('], [')}].`,
          };
        }
      },
    };
  },
};

export {
  toThrowErrorWithMatchingMessage,
  toThrowErrorWithMatchingMessages,
};
