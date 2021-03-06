'use strict';
require('../common');
const assert = require('assert');

const stringASCII_3 = 'foo';
const stringUTF8_3 = '😃!';
const stringASCII_300 = 'foo'.repeat(100);
const stringUTF8_300 = '😃!'.repeat(100);

const stringSet = [stringASCII_3, stringUTF8_3,
                   stringASCII_300, stringUTF8_300];

stringSet.forEach((string) => {
  const len = string.length;
  let str = string;


  let strTaint;

  assert.strictEqual(str.isTainted(), false);
  assert.taintEqual(str, []);

  strTaint = str.taint('bar');
  assert.strictEqual(str.isTainted(), false);
  assert.taintEqual(str, []);
  assert.strictEqual(strTaint.isTainted(), true);
  assert.taintEqual(strTaint, [{ 'begin': 0, 'end': len }]);

  str = str.untaint();
  assert.strictEqual(str.isTainted(), false);
  assert.taintEqual(str, []);

  str = strTaint.untaint();
  assert.strictEqual(str.isTainted(), false);
  assert.taintEqual(str, []);
  assert.strictEqual(strTaint.isTainted(), true);
  assert.taintEqual(strTaint, [{ 'begin': 0, 'end': len }]);

  strTaint = strTaint.untaint();
  assert.strictEqual(strTaint.isTainted(), false);
  assert.taintEqual(strTaint, []);
});
