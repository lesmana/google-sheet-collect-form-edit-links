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

Copyright 2015,2016 Lesmana Zimmer lesmana@gmx.de

This program is free software. It comes without any warranty, to
the extent permitted by applicable law. You can redistribute it
and/or modify it under the terms of the Do What The Fuck You Want
To Public License, Version 2, as published by Sam Hocevar. See
http://www.wtfpl.net/ for more details.
*/

function runThisFunction() {
  insertEditResponseUrls();
}

function getForm(spreadsheet) {
  var formUrl = spreadsheet.getFormUrl();
  var form = FormApp.openByUrl(formUrl);
  return form;
}

function getSheet(spreadsheet, sheetName) {
  var sheet = spreadsheet.getSheetByName(sheetName);
  if (sheet != null) {
    sheet.clear();
  } else {
    sheet = spreadsheet.insertSheet(sheetName);
  }
  return sheet;
}

function getIndexes(items) {
  var indexes = []
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var title = item.getTitle();
    if (title.toLowerCase() == 'name') {
      indexes.push(item);
    }
    if (title.toLowerCase() == 'email') {
      indexes.push(item);
    }
  }
  return indexes;
}

function getDataRow(formResponse, indexes) {
  var row = []
  for (var i = 0; i < indexes.length; i++) {
    var item = indexes[i];
    var itemResponse = formResponse.getResponseForItem(item);
    var response = itemResponse.getResponse()
    row.push(response)
  }
  var url = formResponse.getEditResponseUrl();
  row.push(url)
  return row;
}

function getTitleRow(indexes) {
  var titleRow = [];
  for (var i = 0; i < indexes.length; i++) {
    var item = indexes[i];
    var title = item.getTitle()
    titleRow.push(title)
  }
  titleRow.push('url')
  return titleRow;
}

function getDataRows(formResponses, indexes) {
  var rows = [];
  var titleRow = getTitleRow(indexes);
  rows.push(titleRow);
  for (var i = 0; i < formResponses.length; i++) {
    var formResponse = formResponses[i];
    var row = getDataRow(formResponse, indexes);
    rows.push(row);
  }
  return rows;
}

function getData(form) {
  var items = form.getItems();
  var indexes = getIndexes(items);
  var formResponses = form.getResponses();
  var rows = getDataRows(formResponses, indexes)
  return rows;
}

function insertData(sheet, rows) {
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    sheet.appendRow(row);
  }
}

function insertEditResponseUrls() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var form = getForm(spreadsheet);
  var sheet = getSheet(spreadsheet, "Edit Response URLs");
  var data = getData(form);
  insertData(sheet, data);
}

