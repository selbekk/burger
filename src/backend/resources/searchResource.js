var service = require('./../services/searchService'),
    Logger = require('logbekk');

var log = new Logger();

module.exports = {
    search: function(req, res, next) {
        var params = new SearchParams(req.body);
        if(!params.isValid()) {
            log.debug('Illegal search request received, returning 400 status code.');
            return res.sendStatus(400);
        }

        service.search(params)
            .then(function(data) {
                log.info('Successful search for "{}" returned {} hit(s)', params.toString(), data.length);
                return res.status(200).json(data);
            })
            .catch(function(err) {
                log.error('Error while searching for "{}": {}', params.toString(), JSON.stringify());
                return res.status(500).json(err);
            });
    }
};
