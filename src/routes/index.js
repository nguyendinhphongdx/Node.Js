const versionRoute = require('./version');
const deviceRoute  = require('./device');
const reportRoute = require('./report');
const objectRoute = require('./object');
const loggingRoute = require('./logging');
const  sitesRoute = require('./site');
function route(app){

    
    app.get('/version', versionRoute)

    app.get('/device', deviceRoute)

    app.get('/report', reportRoute)

    app.get('/logging', loggingRoute)

    app.get('/object', objectRoute)

    app.get('/',sitesRoute)
}
module.exports = route;