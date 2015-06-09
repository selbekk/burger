var express = require('express'),
    exphbs = require('express-handlebars'),
    Logger = require('logbekk'),
    apiRouter = require('./routers/api');

var app = express(),
    log = new Logger();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 4000);

app.use('/assets', express.static('./../frontend/dist'));
app.use('/api', apiRouter);

app.get('/', function(req, res) {
	res.render('index');
});

app.listen(app.get('port'), function() {
	log.info('server launched @ localhost:' + app.get('port'));
});
