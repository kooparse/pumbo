var mongoose = require('mongoose'),
    dev_conn = mongoose.connect('mongodb://localhost/pumbo');

return dev_conn;
