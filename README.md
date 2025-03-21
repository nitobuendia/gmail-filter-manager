# Gmail Filter Manager

`Gmail Filter Manager` is a utility to manage your Gmail Filters through Apps
Script using YAML files.

Gmail Filter Manager is able to create and update Gmail filters and labels based
on YAML configuration files. This is helpful when you manage complex filters
on a more readable manner, and/or when you want to have a way to have version
control on your filters and labels.

You can use Gmail Filter Manager to manage only your filters, or only your
labels. There is no requirement to manage both. Gmail Filter Manager can be used
together with your existing and manually created and managed labels and filters:

*   Gmail Filter Manager does not create, modify or delete any filter that is
    not directly managed by the app.

*   Gmail Filter Manager only creates or edits labels that match the names
    provided in the configuration file.

*   Gmail Filter Manager can manage your filters with existing labels, even if
    those labels are not managed using Gmail Filter Manager.

## Usage

### Installation

In order to install the application, you must follow these steps once:

1.  Compile the code.

    ```sh
    npm install && npm run build
    ```

1.  Create a
    [new Apps Script script](https://script.google.com/home/projects/create)
    ([docs](https://developers.google.com/apps-script/guides/standalone)).

1.  Paste the contents of `src/Code.js` into the `Code.gs` file.

1.  Create a new Script file called `App` (`App.gs`).

1.  Paste the contents of `dist/app.js` into the new `App.gs` file.

1.  Create a new HTML file called `labels` (`labels.html`). See
    [Configuring Labels](#configuring-labels) for more details on the contents
    of this file.

1.  Create a new HTML file called `filters` (`filters.html`). See
    [Configuring Filters](#configuring-filters) for more details on the contents
    on this file.

1.  Add Gmail API to the project:

    1.  Click Services (+).

    1.  Find and click Gmail API.

    1.  Select version `v1`.

    1.  Leave Identifier as `Gmail`.

    1.  Click `Add`.

### Running the App

After installation, you can run any of these functions when you need to update
your labels or filters:

*   `runUpdateFilters`: creates and updates all managed filters following
    `filters.html`. It may create labels if they are used in filter actions and
    they do not already exist on the account.

*   `dryRunUpdateFilters`: same as `runUpdateFilters`, but only logs the actions
    that it would perform without applying any changes into your Gmail account.

*   `runUpdateLabels`: creates and updates all managed labels following
    `labels.html`.

*   `dryRunUpdateLabels`: same as `runUpdateLabels`, but only logs the actions
    that it would perform without applying any changes into your Gmail account.

These functions must be run from the file called `Code.gs`.

#### First Run, Granting Permissions

During the first run, the App may ask you for permissions:

1.  Make sure your file has a name (e.g. "Gmail Filter Manager") before running
    the desired function.

1.  Click "Review permissions".

1.  Select your account.

1.  A message saying "Google hasn’t verified this app" will appear. Click
    Advanced.

1.  Click "Go to `<Name of Your Project>`" (e.g. "Go to Gmail Filter Manager").

1.  Select all the checkboxes to grant all required permissions. This will grant
    permissions to create labels and filters on the selected Gmail account.

1.  Click Continue.

## Configuration

### Configuring Labels

#### Labels File Structure

The scructure of the `labels.html` file is a YAML file with the following
attributes:

Top-level:

*   `labels`: `Array<Label>`

Label:

*   `name`: string, name of the label. It will be created in Gmail with this
    name.

*   `labelVisibility`: enum, possible values: `hide`, `show`, `showIfUnread`.
    Whether the label is shown on the Gmail label menu. See
    [LabelVisibility](https://developers.google.com/gmail/api/reference/rest/v1/users.labels#LabelListVisibility)
    for more details.

*   `messageVisibility`: enum, possible values: `hide`, `show`. Whether the
    label is shown on the Gmail label menu. See
    [MessageVisiblity](https://developers.google.com/gmail/api/reference/rest/v1/users.labels#MessageListVisibility)
    for more details.

*   `backgroundColor`: string, hex value (e.g. `#000000`) of the RGB value of
    the background color of the label. Color must be one of the approved colors.
    You can use `utils/gmail_color_preview/index.html` to get your desired (and
    supported) colors. See
    [Color](https://developers.google.com/gmail/api/reference/rest/v1/users.labels#Color)
    for more details.

*   `textColor`: string, hex value (e.g. `#ffffff`) of the RGB value of the
    foreground (text) color of the label. Color must be one of the approved
    colors. You can use `utils/gmail_color_preview/index.html` to get your
    desired (and supported) colors. See
    [Color](https://developers.google.com/gmail/api/reference/rest/v1/users.labels#Color)
    for more details.

See
[Gmail Labels API](https://developers.google.com/gmail/api/reference/rest/v1/users.labels)
to learn more about these parameters.

#### Sample Labels File

```yaml
labels:
  - name: "Coding"
    labelVisibility: "show"
    messageVisibility: "show"
    backgroundColor: "#000000"
    textColor: "#ffffff"

  - name: "Finances"
    labelVisibility: "show"
    messageVisibility: "show"
    backgroundColor: "#16a765"
    textColor: "#ffffff"

  - name: "Shopping"
    labelVisibility: "showIfUnread"
    messageVisibility: "show"
    backgroundColor: "#653e9b"
    textColor: "#e4d7f5"

  - name: "Unsubscribe"
    labelVisibility: "hide"
    messageVisibility: "hide"
    backgroundColor: "#ffffff"
    textColor: "#000000"
```

This will create 4 labels called: `Coding`, `Finances`, `Shopping` and
`Unsubscribe`. If the labels already exist, it will update the existing labels
if any of the parameters other than name has changed. If the label name has
changed, it will think the label does not exist and it will create it instead.

### Configuring Filters

#### Filters File Structure

The scructure of the `filters.html` file is a YAML file with the following
attributes:

Top-level:

*   `filters`: `Array<Filter>`

Filter:

*   `name`: `string`, name of the filter. Used for internal reference.

*   `filter`: `GmailFilter`, filter logic to match messages.

*   `action`: optional, `GmailAction`, action that will be taken in the matched
    messages. If there is no action, the filter will not be created in Gmail.
    However, the filter still can be used to create derived filters using its
    `name`.

GmailFilter:

*   One of the following `OperatorOptions`:

    *   `and`: `Array<Operator>`, joins all the operator criteria using `AND`.
        In other words, the messages must match all the provided criteria.
        Supports other `OR` operators, but not other `AND` operators inside it.
    *   `or`: `Array<Operator>`, joins all the criteria using `OR`. In other
        words, the messages must match one of the provided criteria.
        Supports other `AND` operators, but not other `OR` operators inside it.

GmailFilter > Operator:

*   `name`: `string`, includes the logic of the filter whose name matches.
    The filter must be specified in the same file before its use. To exclude the
    matched emails, use `-` before the value.

*   `from`: `string` or `Array<string>`, find emails sent from a specific
    person. To exclude the matched emails, use `-` before the value. When
    multiple values are provided (as an array), the matching logic is treated
    like an `OR` among all the values.

*   `to`: `string` or `Array<string>`, find emails sent to a specific person.
    To exclude the matched emails, use `-` before the value. When
    multiple values are provided (as an array), the matching logic is treated
    like an `OR` among all the values.

*   `cc`: `string` or `Array<string>`, find emails that include specific people
    in the "cc" field. To exclude the matched emails, use `-` before the value.
    When multiple values are provided (as an array), the matching logic is
    treated like an `OR` among all the values.

*   `bcc`: `string` or `Array<string>`, find emails that include specific people
    in the "bcc" field. To exclude the matched emails, use `-` before the value.
    When multiple values are provided (as an array), the matching logic is
    treated like an `OR` among all the values.

*   `subject`: `string` or `Array<string>`, find emails by a word or phrase in
    the subject line. If you need an exact match phrase, you should escape your
    double quotes (e.g. `* subject: "\"My GitHub Account\""`). To exclude the
    matched emails, use `-` before the value. When multiple values are provided
    (as an array), the matching logic is treated like an `OR` among all the
    values.

*   `hasWords`: `string` or `Array<string>`, find emails by a word or phrase in
    the email. If you need an exact match phrase, you should escape your
    double quotes (e.g. `* hasWords: "\"My GitHub Account\""`). To exclude the
    matched emails, use `-` before the value. When multiple values are provided
    (as an array), the matching logic is treated like an `OR` among all the
    values.

*   `larger`: `string` or `Array<string>`, find emails by their size, finding
    files larger than the provided size. To exclude the matched emails, use `-`
    before the value. When multiple values are provided (as an array), the
    matching logic is treated like an `OR` among all the values.

*   `smaller`: `string` or `Array<string>`, , find emails by their size, finding
    files smaller than the provided size. To exclude the matched emails, use `-`
    before the value. When multiple values are provided (as an array), the
    matching logic is treated like an `OR` among all the values.

*   `fromDate`: `string`, find emails received after a certain date. To exclude
    the matched emails, use `-` before the value.

*   `toDate`: `string`, find emails received before a certain date. To exclude
    the matched emails, use `-` before the value.

*   `olderThan`: `string`, find emails older than a certain date. To exclude the
    matched emails, use `-` before the value.

*   `newerThan`: `string`, find emails newer than a certain date. To exclude the
    matched emails, use `-` before the value.

*   `hasAttachment`: `boolean`, find emails that include attachments.

*   `filename`: `string` or `Array<string>`, find emails that have attachments
    with a certain name or file type. If you need an exact match phrase, you
    should escape your double quotes (e.g. `* filename: "\"My File\""`). To
    exclude the matched emails, use `-` before the value. To exclude the matched
    emails, use `-` before the value. When multiple values are provided (as an
    array), the matching logic is treated like an `OR` among all the values.

*   `hasDrive`: `boolean`, find emails that include Google Drive files.

*   `hasDocument`: `boolean`, find emails that include Google Docs files.

*   `hasNoUserLabels`: `boolean`, find emails that don't have a label.

*   `hasSpreadsheet`: `boolean`, find emails that include Google Sheets files.

*   `hasPresentation`: `boolean`, find emails that include Google Slides files.

*   `hasYouTube`: `boolean`, find emails that include YouTube videos.

*   `isChat`: `boolean`, find chat messages that are in Gmail.

*   `isImportant`: `boolean`, find emails marked as important.

*   `isStarred`: `boolean`, find starred emails.

*   `isSnoozed`: `boolean`, find snoozed emails

*   `isUnread`: `boolean`, find unread emails

*   `isRead`: `boolean`, find read emails

*   `inLabel`: `string` or `Array<string>`, find emails that have the given
    labels. To exclude the matched emails, use `-` before the value. When
    multiple values are provided (as an array), the matching logic is
    treated like an `OR` among all the values.

One or more of these operators may be used for each GmailFilter. All Operators
are optional. See
[Gmail search operators](http://support.google.com/mail/answer/7190) and
[Criteria](https://developers.google.com/gmail/api/reference/rest/v1/users.settings.filters#Criteria)
to learn more about these operators.

GmailAction:

*   `archive`: `boolean`, whether to archive the matched emails.

*   `markRead`: `boolean`, whether to mark the matched emails as read.

*   `markStar`: `boolean`, whether to mark the matched emails as starred.

*   `label`: `string`, which label to apply to the matched emails. Only one
    label is supported. If you need to apply multiple labels, you must create
    a new filter.

*   `forward`: `string`, to which email to forward the matched emails. The email
    must be first
    [added as a supported forward email address](https://support.google.com/mail/answer/10957).

*   `delete`: `boolean`, whether to delete the matched emails. Deleted emails
    are sent to the Trash.

*   `neverMarkSpam`: `boolean`, whether to prevent matched emails from being
    marked as Spam.

*   `markImportant`: `boolean`, whether to mark matched emails as Important.

*   `neverMarkImportant`: `boolean`, whether to prvent matched emails from being
    marked as Important.

*   `category`: `Category`, which Category to apply to the matched emails.
    Supported `Category` values are: `PRIMARY`, `SOCIAL`, `UPDATES`, `FORUMS`,
    and `PROMOTIONS`. See
    [Gmail categories](https://support.google.com/mail/answer/3094499) to learn
    more about this topic.

One or more of these actions may be used for each GmailFilter. All Actions
are optional. See
[Gmail actions](https://developers.google.com/gmail/api/reference/rest/v1/users.settings.filters#action)
to learn more about these actions.

#### Sample Filters File

```yaml
filters:

  - name: "Shopping"
    filter:
      or:
        subject:
          - "payment"
          - "invoice"
          - "order"
          - "ordering"
          - "purchase"
          - "receipt"
          - "booking"
        from:
          # Generic.
          - "invoices@"
          - "transaction@"
          - "payments@"
          # Specific websites.
          - "@amazon.com"
          - "@ebay.com"
    action:
      label: Shopping

  - name: "Education"
    filter:
      and:
        from: "coursera.org"
        subject: "certificate"

  - name: "Unsubscribe"
    filter:
      and:
        hasWords: "unsubscribe"
        name:
          - "-Shopping"
          - "-Education"
    action:
      archive: true
      label: Unsubscribe
```

This will create two filters in Gmail: one for `Shopping` and one
for `Unsubscribe`. No filter is created for `Education` because
it contains no action. Its contents are, however, used in the `Unsubscribe`
filter.

The `Shopping` filter will match emails whose `subject` contains
`"payment" or "invoice" or "order" or "ordering" or "purchase" or "receipt" or "booking"`,
or comes `from` the following email addresses:
`"invoices@" or "transaction@" or "payments@" or "@amazon.com" or "@ebay.com"`.
Matched emails will be marked with the label `Shopping`. Gmail filter (output):

```text
Matches: ({subject:payment OR subject:invoice OR subject:order OR subject:ordering OR subject:purchase OR subject:receipt OR subject:booking OR from:invoices@ OR from:transaction@ OR from:payments@ OR from:@amazon.com OR from:@ebay.com} -{"📧 GmailFilterId: Shopping"})

Do this: Apply label "Shopping"
```

The `Education` filter will match emails sent `from` `"coursera.org"` and whose
`subject` contains the word `"certificate"`. However, no Gmail filter will be
created since there is no action.

The `Unsubscribe` filter will match emails which contains the words (`hasWords`)
`unsubscribe`, but are not matched by the rules described by filter `name`d
`Shopping` or `Education`. Matched emails will be archived (skip Inbox) and
they will be marked with the label `Unsubscribe`.

If the filter already exists and it has been changed by adding/removing
operators or actions, the filters will be updated instead. If the filters have
been removed from the YAML file, they will be removed. Only filters created
through this tool will be removed. Manually created filters will not be modified
or deleted. Gmail filter (output):

```text
Matches: ({unsubscribe AND -{subject:payment OR subject:invoice OR subject:order OR subject:ordering OR subject:purchase OR subject:receipt OR subject:booking OR from:invoices@ OR from:transaction@ OR from:payments@ OR from:@amazon.com OR from:@ebay.com} AND -{from:coursera.org AND subject:certificate}} -{"📧 GmailFilterId: Unsubscribe"})

Do this: Skip Inbox, Apply label "Unsubscribe"
```
