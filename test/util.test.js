/* global suite, test */

const assert = require('assert');

const {
  isKey,
  isCommentLine,
  findLineOfClosestKey,
  textIndentations,
  isEmptyOrWhitespace,
  isUnnecessaryLine,
} = require('../src/util');

const {
  mockForClosest,
  selectedForClosest,
  expectedLineForClosest,
  keyLine,
  emptyLine,
  valueLine,
  commentLine,
  lineWithOnlyWhitespaces,
  commentLineStartWithSpaces,
} = require('./mockData');

suite("Util Tests", function () {
  test("isEmptyOrWhitespace function", function () {
    assert.equal(isEmptyOrWhitespace(emptyLine),               true);
    assert.equal(isEmptyOrWhitespace(lineWithOnlyWhitespaces), true);

    assert.equal(isEmptyOrWhitespace(keyLine),                    false);
    assert.equal(isEmptyOrWhitespace(valueLine),                  false);
    assert.equal(isEmptyOrWhitespace(commentLine),                false);
    assert.equal(isEmptyOrWhitespace(commentLineStartWithSpaces), false);
  });
  
  test("isKey function", function () {
    assert.equal(isKey(keyLine), true);

    assert.equal(isKey(valueLine),                  false);
    assert.equal(isKey(emptyLine),                  false);
    assert.equal(isKey(commentLine),                false);
    assert.equal(isKey(lineWithOnlyWhitespaces),    false);
    assert.equal(isKey(commentLineStartWithSpaces), false);
  });

  test("isCommentLine function", function () {
    assert.equal(isCommentLine(commentLine),                true);
    assert.equal(isCommentLine(commentLineStartWithSpaces), true);

    assert.equal(isCommentLine(keyLine),                 false);
    assert.equal(isCommentLine(valueLine),               false);
    assert.equal(isCommentLine(emptyLine),               false);
    assert.equal(isCommentLine(lineWithOnlyWhitespaces), false);
  });

  test("textIndentations function", function () {
    assert.equal(textIndentations(commentLine).length,                0);
    assert.equal(textIndentations(keyLine).length,                    2);
    assert.equal(textIndentations(commentLineStartWithSpaces).length, 4);
  });

  test("isUnnecessaryLine function", function () {
    assert.equal(isUnnecessaryLine(commentLine),                false);
    assert.equal(isUnnecessaryLine(commentLineStartWithSpaces), false);
    assert.equal(isUnnecessaryLine(emptyLine),                  false);
    assert.equal(isUnnecessaryLine(lineWithOnlyWhitespaces),    false);

    assert.equal(isUnnecessaryLine(keyLine),   true);
    assert.equal(isUnnecessaryLine(valueLine), true);
  });

  test("findLineOfClosestKey function", function () {
    assert.equal(
      findLineOfClosestKey(selectedForClosest, mockForClosest.split('\n')),
      expectedLineForClosest
    );
  });
});