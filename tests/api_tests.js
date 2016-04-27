var superagent = require('superagent');
var assert = require('assert');

describe("API tests", function () {
  describe("/add", function () {
    it('should return error object for missing params', function (done) {
      superagent.get("http://localhost/api/add")
        .end(function (e, res) {
          assert.ok(e === null, 'API response error');
          assert.ok(!!res.body, 'Response body not found');
          if (res.body)
            assert.ok(!!res.body.error,
              'Missing error object in response body');
          done();
        });
    });

    it('should return error object for invalid params', function (done) {
      superagent.get("http://localhost/api/add?a=hello&b=world")
        .end(function (e, res) {
          assert.ok(e === null, 'API response error');
          assert.ok(!!res.body, 'Response body not found');
          assert.ok(!!res.body.error, 'Missing error object in response body');
          done();
        });
    });

    it('should return correct result for valid params', function (done) {
      superagent.get("http://localhost/api/add?a=1&b=2")
        .end(function (e, res) {
          assert.ok(e === null, 'API response error');
          assert.ok(!!res.body, 'Response body not found');
          assert.equal(res.body.a, 1);
          assert.equal(res.body.b, 2);
          assert.equal(res.body.answer, 3);
          done();
        });
    });
  });
});
