exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                      // 'mongodb://localhost:27017/jazzDashboard';
                      'mongodb://mretfaster86:Jazz8Dash6@jazzdashdb-shard-00-00-65e8w.mongodb.net:27017,jazzdashdb-shard-00-01-65e8w.mongodb.net:27017,jazzdashdb-shard-00-02-65e8w.mongodb.net:27017/jazzDashboard?ssl=true&replicaSet=JazzDashDB-shard-0&authSource=admin&retryWrites=true'
exports.TEST_DATABASE_URL = 'mongodb://localhost:27017/jazzDashboard-test';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '10m';