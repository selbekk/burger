var service = require('./../services/search-service'),
    SearchParams = require('./search-params'),
    Logger = require('logbekk');

var log = new Logger();

module.exports = {
    search: function(req, res, next) {
        var params = new SearchParams(req.query);
        if(!params.isValid()) {
            log.debug('Illegal search request received, returning 400 status code.');
            return res.sendStatus(400);
        }

        service.search(params, function(err, data) {
          if(err) {
            log.error('Error while searching for "{}": {}', params.toString(), err);
            return res.status(500).json(err);
          }

          log.info('Successful search for "{}" returned {} hit(s)', params.toString(), data.length);
          return res.status(200).json(data);
        })
    }
};
