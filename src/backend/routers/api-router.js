var express = require('express'),
    searchResource = require('./../resources/search-resource');

var router = express.Router();

router.route('/search')
    .get(searchResource.search);

module.exports = router;
