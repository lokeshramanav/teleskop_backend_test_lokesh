const mysqlDbConnection = require('./mysql');

module.exports = {
    masterDbConn : mysqlDbConnection.getInstance(),
}
