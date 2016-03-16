/*
Copyright 2015,2016 Lesmana Zimmer lesmana@gmx.de

This program is free software. It comes without any warranty, to
the extent permitted by applicable law. You can redistribute it
and/or modify it under the terms of the Do What The Fuck You Want
To Public License, Version 2, as published by Sam Hocevar. See
http://www.wtfpl.net/ for more details.
*/

/*
collect google form edit response links.

https://github.com/lesmana/google-sheet-collect-form-edit-links

script expects to be put in a sheet
which is linked to a form.

run runThisFunction() to get desired effect.

script will:
* get the linked form.
* create a new sheet or clear the existing one.
* extract the edit response urls.
* add them to the sheet.

*/

/*
run this function to get desired effect.
*/
function runThisFunction() {
  insertEditResponseUrls();
}

/*
get form from spreadsheet.
returns the form.
*/
function getForm(spreadsheet) {
  var formUrl = spreadsheet.getFormUrl();
  var form = FormApp.openByUrl(formUrl);
  return form;
}

/*
create sheet or clear sheet if exists.
returns the created or cleared sheet.
*/
function getSheet(spreadsheet, sheetName) {
  var sheet = spreadsheet.getSheetByName(sheetName);
  if (sheet != null) {
    sheet.clear();
  } else {
    sheet = spreadsheet.insertSheet(sheetName);
  }
  return sheet;
}

/*
insert edit response urls from response to sheet
also get name and email if defined
*/
function insertUrlsFromResponse(response) {
  var itemResponses = response.getItemResponses();
  for (var i = 0; i < itemResponses.length; i++) {
    var itemResponse = itemResponses[i];
    var title = itemResponse.getItem().getTitle();
    if (title.toLowerCase() == 'name') {
      var name = itemResponse.getResponse();
    }
    if (title.toLowerCase() == 'email') {
      var email = itemResponse.getResponse();
    }
  }
  var url = response.getEditResponseUrl();
  var row = [name, email, url];
  return row
}

/*
insert edit response urls from form to sheet.
*/
function insertUrlsFromForm(form, sheet) {
  var titleRow = ['name', 'email', 'url']
  sheet.appendRow(titleRow);
  var responses = form.getResponses();
  for (var i = 0; i < responses.length; i++) {
    var response = responses[i];
    var row = insertUrlsFromResponse(response)
    sheet.appendRow(row);
  }
}

/*
insert edit response urls from a linked form to a new sheet.
sheet will be cleared if it already exists.

run this function manually to get desired effect.
*/
function insertEditResponseUrls() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var form = getForm(spreadsheet);
  var sheet = getSheet(spreadsheet, "Edit Response URLs");
  insertUrlsFromForm(form, sheet);
}

