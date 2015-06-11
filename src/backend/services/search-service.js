var config = require('nodestretto')('./api.properties'),
    Logger = require('logbekk'),
    log = new Logger(),
    yelp = require('yelp').createClient({
      consumer_key: config.get('yelp.api.consumer.key'),
      consumer_secret: config.get('yelp.api.consumer.secret'),
      token: config.get('yelp.api.token'),
      token_secret: config.get('yelp.api.token.secret')
    });

exports.search = function(params, callback) {
    var terms = ['burger'];
    if(params.query) {
      terms.push(params.query);
    }
    var opts = {
      term: terms.join(',') || undefined, 
      category: 'burgers',
      ll: params.lat + ',' + params.lng,
      radius_filter: 3000 // meters
    };
    log.debug('Searching for {}', params.toString());
    var start = new Date();
    yelp.search(opts, function(err, data) {
      if(err) {
        // TODO: Reform error
        return callback(err);
      }

      // TODO: Parse data
      log.debug('{} result(s) returned in {} ms for query "{}"', data.total, new Date() - start, params.toString());
      return callback(null, data);
    });
}
