"use strict";

var Bundler   = require('xcss').Bundler;
var aggregate = require('stream-aggregate-promise');

function serve(entry, opts) {
  var bundler = (typeof entry.toStream === 'function') ?
    entry :
    new Bundler(entry, opts);

  var server = function(req, res, next) {
    server.bundle.then(function(bundle) {
      res.setHeader('Content-type', 'text/css');
      res.write(bundle);
      res.end();
    }, next);
  }

  server.bundle = undefined;
  bundler.on('update', build);
  build();

  return server;

  function build() {
    server.bundle = aggregate(bundler.toStream());
  }
}

module.exports = serve;
