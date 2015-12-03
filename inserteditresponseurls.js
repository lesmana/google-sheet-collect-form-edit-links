/*
This program is free software. It comes without any warranty, to
the extent permitted by applicable law. You can redistribute it
and/or modify it under the terms of the Do What The Fuck You Want
To Public License, Version 2, as published by Sam Hocevar. See
http://www.wtfpl.net/ for more details.
*/

function onOpen(e) {
  SpreadsheetApp.getUi()
      .createAddonMenu()
      .addItem('insert edit response urls', 'insertEditResponseUrls')
      .addToUi();
}

function onInstall(e) {
  onOpen(e);
}

var sheetName = "Edit Response URLs";

function getForm(spreadsheet) {
  var formUrl = spreadsheet.getFormUrl();
  var form = FormApp.openByUrl(formUrl);
  return form;
}

function getSheet(spreadsheet) {
  var sheet = spreadsheet.getSheetByName(sheetName);
  if (sheet != null) {
    sheet.clear();
  } else {
    sheet = spreadsheet.insertSheet(sheetName);
  }
  return sheet;
}

function insertUrls(form, sheet) {
  var responses = form.getResponses();
  for (var i = 0; i < responses.length; i++) {
    var response = responses[i];
    var url = response.getEditResponseUrl();
    var row = [url];
    sheet.appendRow(row);
  }
}

function insertEditResponseUrls() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var form = getForm(spreadsheet);
  var sheet = getSheet(spreadsheet);
  insertUrls(form, sheet);
}

