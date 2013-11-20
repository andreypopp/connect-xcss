var path = require('path');
var assert = require('assert');
var xcss = require('../index');
var express = require('express');
var req = require('supertest');

describe('connect-xcss', function() {

  var app = express();
  var entry = path.join(__dirname, 'entry.css');
  app.get('/bundle.css', xcss(entry, {debug: true}));

  it('works', function(done) {
    req(app)
      .get('/bundle.css')
      .expect(200)
      .expect('Content-type', 'text/css')
      .end(function(err, res) {
        if (err) return done(err);
        assert.ok(/body/.exec(res.text));
        assert.ok(/div/.exec(res.text));
        assert.ok(/sourceMappingURL/.exec(res.text));
        done();
      });
  });

});
