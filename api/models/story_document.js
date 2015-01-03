var mongoose          = require('mongoose'),
    Schema            = mongoose.Schema,

    Story             = require('./story_document.js'),
    User              = require('./user_document.js'),

    ObjectId          = Schema.Types.ObjectId;


var storySchema = new Schema({

  url           : { type: String, required: true },

  title         : { type: String, required: true },

  creation_date : { type: Date, required: true, default: Date.now },

  read_count    : { type: Number, required: true, default: 0 },

  userInfos     : {
                    userId    : { type: ObjectId, required: true },
                    username  : { type: String, required: true }
                  },

  description   : { type: String }

});



storySchema.pre('save', function (next) {

  var User = require('./user_document.js');

  User.findByIdAndUpdate(this.userInfos.userId, { $addToSet: { 'stories.list': this._id }, $inc: { 'stories.count': 1} }, function (err) {
    if (err) return err;
    next();
  });

});


storySchema.statics.get = function (storyId, callback) {
  if (!storyId) callback(true);

  this.findOne({ _id: storyId }, function (err, storyObj) {
    if (err) return callback(true);

    if (storyObj)
      callback(null, storyObj);
    else
      callback(true);
  });
};

storySchema.statics.getStories = function (userIdList, callback) {

  var Story = require('./story_document.js');

  Story.find({ 'userInfos.userId': {$in: userIdList}})
  .sort({creation_date: -1})
  .exec(function (err, storyList) {
    if (err)
      callback(err);
    else
      callback(null, storyList);
  });

};


module.exports = mongoose.model('story', storySchema);
