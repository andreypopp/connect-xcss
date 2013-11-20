# connect-xcss

Connect/Express middleware for [xcss][].

## Installation

    % npm install connect-xcss

## Usage

    var express = require('express');
    var xcss = require('connect-xcss');

    var app = express();
    app.get('/bundle.css', xcss('./index.css, {debug: true}));
    app.listen(3000);

[xcss]: https://github.com/andreypopp/xcss
