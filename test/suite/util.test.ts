import * as assert from 'assert';

import * as Util from '../../src/util';

import {
    mockForClosest,
    selectedForClosest,
    expectedLineForClosest,
    keyLine,
    emptyLine,
    valueLine,
    commentLine,
    lineWithOnlyWhitespaces,
    commentLineStartWithSpaces,
} from './mockData';

suite('Util Tests', function() {
    test('isEmptyOrWhitespace function', function() {
        assert.equal(Util.isEmptyOrWhitespace(emptyLine), true);
        assert.equal(Util.isEmptyOrWhitespace(lineWithOnlyWhitespaces), true);

        assert.equal(Util.isEmptyOrWhitespace(keyLine), false);
        assert.equal(Util.isEmptyOrWhitespace(valueLine), false);
        assert.equal(Util.isEmptyOrWhitespace(commentLine), false);
        assert.equal(
            Util.isEmptyOrWhitespace(commentLineStartWithSpaces),
            false
        );
    });

    test('isKey function', function() {
        assert.equal(Util.isKey(keyLine), true);

        assert.equal(Util.isKey(valueLine), false);
        assert.equal(Util.isKey(emptyLine), false);
        assert.equal(Util.isKey(commentLine), false);
        assert.equal(Util.isKey(lineWithOnlyWhitespaces), false);
        assert.equal(Util.isKey(commentLineStartWithSpaces), false);
    });

    test('isCommentLine function', function() {
        assert.equal(Util.isCommentLine(commentLine), true);
        assert.equal(Util.isCommentLine(commentLineStartWithSpaces), true);

        assert.equal(Util.isCommentLine(keyLine), false);
        assert.equal(Util.isCommentLine(valueLine), false);
        assert.equal(Util.isCommentLine(emptyLine), false);
        assert.equal(Util.isCommentLine(lineWithOnlyWhitespaces), false);
    });

    test('textIndentations function', function() {
        assert.equal(Util.textIndentations(commentLine).length, 0);
        assert.equal(Util.textIndentations(keyLine).length, 2);
        assert.equal(
            Util.textIndentations(commentLineStartWithSpaces).length,
            4
        );
    });

    test('isUnnecessaryLine function', function() {
        assert.equal(Util.isUnnecessaryLine(commentLine), false);
        assert.equal(Util.isUnnecessaryLine(commentLineStartWithSpaces), false);
        assert.equal(Util.isUnnecessaryLine(emptyLine), false);
        assert.equal(Util.isUnnecessaryLine(lineWithOnlyWhitespaces), false);

        assert.equal(Util.isUnnecessaryLine(keyLine), true);
        assert.equal(Util.isUnnecessaryLine(valueLine), true);
    });

    test('findLineOfClosestKey function', function() {
        assert.equal(
            Util.findLineOfClosestKey(
                selectedForClosest,
                mockForClosest.split('\n')
            ),
            expectedLineForClosest
        );
    });
});
