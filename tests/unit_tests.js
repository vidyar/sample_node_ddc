var assert = require('assert');

describe('Unit tests for components in ./logic', function (){
  describe('add.js', function (){
    var add;
    it('should be able to require()', function (){
      add = require('../logic/add.js');
    });
    it('should return error for null values', function (){
      var result = add(null, null);
      assert.ok(!!result.error);
      var result = add('somestring', 1);
      assert.ok(!!result.error);
    });
    it('should add two numbers correctly', function (){
      var result = add(1,2);
      assert.equal(result.a, 1);
      assert.equal(result.b, 2);
      assert.equal(result.answer, 3);
    });
  });
});
