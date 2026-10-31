var SHEET_NAMES = ["RUNNING ITEMS POSITION"];

function doGet() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var records = [];

  SHEET_NAMES.forEach(function (sheetName) {
    var sheet = spreadsheet.getSheetByName(sheetName);
    if (!sheet) {
      throw new Error('Sheet "' + sheetName + '" was not found.');
    }

    var values = sheet.getDataRange().getValues();
    if (values.length < 2) {
      return;
    }

    var headers = values[0];
    values.slice(1).forEach(function (row) {
      var record = {};
      headers.forEach(function (header, index) {
        record[header] = row[index];
      });
      records.push(record);
    });
  });

  return ContentService
    .createTextOutput(JSON.stringify(records))
    .setMimeType(ContentService.MimeType.JSON);
}
