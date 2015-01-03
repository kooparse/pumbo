var mongoose          = require('mongoose'),
    Schema            = mongoose.Schema,

    Story             = require('./story_document.js'),
    User              = require('./user_document.js'),

    ObjectId          = Schema.Types.ObjectId;


var collectionSchema = new Schema({

  url           : { type: String, required: true },

  title         : { type: String, required: true },

  creation_date : { type: Date, required: true, default: Date.now },

  userInfos     : {
                    userId    : { type: ObjectId, required: true },
                    username  : { type: String, required: true }
                  },

  stories       : {
                    list  : [ { type: ObjectId } ],
                    count : { type: Number, default: 0 }
                  },

  description   : { type: String }

});


collectionSchema.pre('save', function (next) {

  var User = require('./user_document.js');

  User.findByIdAndUpdate(this.userInfos.userId, { $addToSet: { 'collections.list': this._id }, $inc: { 'collections.count': 1} }, function (err) {
    if (err) return err;
    next();
  });

});

collectionSchema.statics.get = function (collectionId, callback) {

};


module.exports = mongoose.model('collection', collectionSchema);
