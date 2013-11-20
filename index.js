"use strict";

var path                = require('path');
var Bundler             = require('xcss').Bundler;
var aggregate           = require('stream-aggregate-promise');
var getCallsiteDirname  = require('get-callsite-dirname');

function serve(entry, opts) {
  opts = opts || {};

  var logger = opts.logger || require('quiet-console');
  var root = opts.root || getCallsiteDirname();

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

  function build(filename) {
    var start = new Date;

    if (filename) {
      logger.info('change detected in', path.relative(root, filename));
    }

    server.bundle = aggregate(bundler.toStream());
    server.bundle.then(function() {
      logger.info('bundle built in', new Date - start, 'ms');
    });
  }
}

module.exports = serve;
