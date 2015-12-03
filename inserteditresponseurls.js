/**
 * This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details.
 */

/**
 * add menu item when containing sheet is opened.
 * can be run manually.
 */
function onOpen(e) {
  SpreadsheetApp.getUi()
      .createAddonMenu()
      .addItem('insert edit response urls', 'insertEditResponseUrls')
      .addToUi();
}

/**
 * add menu item when installed as addon.
 */
function onInstall(e) {
  onOpen(e);
}

/**
 * name of the sheet to be created for the edit response urls.
 * if already exists sheet will be cleared.
 */
var sheetName = "Edit Response URLs";

/**
 * get form from spreadsheet.
 * returns the form.
 * does not check for errors.
 * there is no getFormId().
 * if there is use that instead.
 * then use openById().
 */
function getForm(spreadsheet) {
  var formUrl = spreadsheet.getFormUrl();
  var form = FormApp.openByUrl(formUrl);
  return form;
}

/**
 * create sheet or clear sheet if exists.
 * returns the created or cleared sheet.
 * does not check for errors.
 */
function getSheet(spreadsheet) {
  var sheet = spreadsheet.getSheetByName(sheetName);
  if (sheet != null) {
    sheet.clear();
  } else {
    sheet = spreadsheet.insertSheet(sheetName);
  }
  return sheet;
}

/**
 * insert edit response urls from form to sheet.
 * does not check for errors.
 */
function insertUrls(form, sheet) {
  var responses = form.getResponses();
  for (var i = 0; i < responses.length; i++) {
    var response = responses[i];
    var url = response.getEditResponseUrl();
    var row = [url];
    sheet.appendRow(row);
  }
}

/**
 * insert edit response urls from a linked form to a new sheet.
 * sheet name controlled by variable named sheetName.
 * sheet will be cleared if it already exists.
 * does not check for errors.
 * main function.
 * called from the menu item added by onOpen().
 * can be run manually.
 */
function insertEditResponseUrls() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var form = getForm(spreadsheet);
  var sheet = getSheet(spreadsheet);
  insertUrls(form, sheet);
}

