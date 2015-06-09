var express = require('express'),
    searchResource = require('./../resources/searchResource');

var router = express.Router();

router.route('/search')
    .get(searchResource.search);

module.exports = router;
