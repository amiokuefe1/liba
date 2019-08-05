const mongoose = require('mongoose');

require('dotenv').config({ path: 'variables.env'});

mongoose.connect(process.env.DATABASE);

mongoose.Promise = global.Promise;

require('./models/Bstore');
require('./models/Buser');

const app = require('./app');

app.set('port', process.env.PORT || 8888);

const server = app.listen(app.get('port'), () => {
	console.log(`Our App is now running on port ${server.address().port}`);
});