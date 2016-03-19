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
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var title = item.getTitle();
    if (title.toLowerCase() == 'name') {
      var name = i;
    }
    if (title.toLowerCase() == 'email') {
      var email = i;
    }
  }
  var indexes = {
    name: name,
    email: email
  };
  return indexes;
}

function getDataFromResponse(formResponse, indexes) {
  var itemResponses = formResponse.getItemResponses();
  var name = itemResponses[indexes.name].getResponse();
  var email = itemResponses[indexes.email].getResponse();
  var url = formResponse.getEditResponseUrl();
  var row = [name, email, url];
  return row;
}

function getData2(formResponses, indexes) {
  var rows = [];
  var titleRow = ['name', 'email', 'url'];
  rows.push(titleRow);
  for (var i = 0; i < formResponses.length; i++) {
    var formResponse = formResponses[i];
    var row = getDataFromResponse(formResponse, indexes);
    rows.push(row);
  }
  return rows;
}

function getData(form) {
  var indexes = getIndexes(form.getItems());
  var formResponses = form.getResponses();
  var rows = getData2(formResponses, indexes)
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

