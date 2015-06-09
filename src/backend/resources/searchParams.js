var _ = require('lodash');

function SearchParams(params) {
    this.query = _.trim(params.query);
    this.lat = params.lat;
    this.lng = params.lng;
}

SearchParams.prototype.isValid = function() {
    return this.query || (this.lat && this.lng);
};

SearchParams.prototype.toString = function() {
    if(this.query) {
        return this.query;
    }
    return 'lat=' + this.lat + '&lng=' + this.lng;
};

module.exports = SearchParams;
