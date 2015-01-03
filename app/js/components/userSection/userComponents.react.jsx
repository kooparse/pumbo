var React             = require('react'),
    _                 = require('underscore'),
    Navigation        = require('react-router').Navigation,

    ProfileStore      = require('../../stores/profileStore'),

    UserStore         = require('../../stores/userStore'),
    UserActions       = require('../../actions/userActions'),

    StoryStore        = require('../../stores/storyStore'),
    StoryActions      = require('../../actions/storyActions'),

    collectionStore   = require('../../stores/CollectionStore'),
    collectionActions = require('../../actions/CollectionActions');


var currentUser       = require('../../libs/current_user');




var storyFormComponents = React.createClass({

  handleSubmit: function (e) {

   e.preventDefault();

   var username      = this.props.username,
       url           = this.refs.url.getDOMNode().value.trim(),
       title         = this.refs.title.getDOMNode().value.trim(),
       description   = this.refs.description.getDOMNode().value.trim();


    if (!url || !title || !username)
      return;

    var dataForm = {
      url: url,
      title: title,
      description: description
    };

    StoryActions.createStory(username, dataForm);

  },

  render: function () {

    return (

      <form className="storyForm" onSubmit={this.handleSubmit}>
        <input type="text" className="m1 mb0 field-light" placeholder="story url" ref="url"/>
        <input type="text" className="m1 mb0 field-light" placeholder="story title" ref="title"/>
        <input type="text" className="m1 mb0 field-light" placeholder="story description" ref="description"/>
        <button type="submit" className="button-blue caps">add</button>
      </form>

    );

  }

});


var collectionFormComponents = React.createClass({

  handleSubmit: function (e) {

   e.preventDefault();

   var userId        = this.props.userId,
       title         = this.refs.title.getDOMNode().value.trim(),
       description   = this.refs.description.getDOMNode().value.trim();


    if (!title || !userId)
      return;

    var dataForm = {
      title: title,
      description: description
    };

    collectionActions.create(userId, dataForm);

  },

  render: function () {

    return (

      <form className="collectionForm" onSubmit={this.handleSubmit}>
        <input type="text" className="m1 mb0 field-light" placeholder="story title" ref="title"/>
        <input type="text" className="m1 mb0 field-light" placeholder="story description" ref="description"/>
        <button type="submit" className="button-blue caps">add</button>
      </form>

    );

  }

});



var followButtonComponents = React.createClass({

  handleClick: function (e) {

    e.preventDefault();
    UserActions.follow(this.props.username);

  },

  render: function () {

    return (
      <button className="button-gray" onClick={this.handleClick}>Follow</button>
    );

  }

});

var unfollowButtonComponents = React.createClass({

  handleClick: function (e) {

    e.preventDefault();
    UserActions.unfollow(this.props.username);

  },

  render: function () {

    return (
      <button className="button-gray" onClick={this.handleClick}>Unfollow</button>
    );

  }

});



var UserComponents = React.createClass({

  mixins: [Navigation],

  getInitialState: function () {
    UserActions.getUser(this.props.params.username);
    return { user: UserStore.getUser() };
  },

  componentWillMount: function () {
    UserStore.addChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState({user: UserStore.getUser()});
  },

  render: function () {

    if (typeof this.state.user !== 'undefined') {

      if (this.state.user.isCurrentUser) {
        var addStoryForm      = <storyFormComponents username={this.state.user.username}/>
        var addCollectionForm = <collectionFormComponents userId={this.state.user.id}/>
      }


      var listStories = this.state.user.stories.list.map(function (story) {
        return <li><a href={story.url} target="_blank">{story.title}</a></li>
      });

      var FollowersCount = this.state.user.followers.count;
      var FollowingCount = this.state.user.following.count;

      if (currentUser.id() && this.state.user.isFollow)
        var followButton = <unfollowButtonComponents username={this.state.user.username}/>
      if (currentUser.id() && !_.isUndefined(this.state.user.isFollow) && !this.state.user.isFollow)
        var followButton = <followButtonComponents username={this.state.user.username}/>

    }


    return (
      <div className="profile-user content">
        <div className="clearflix">
          <div className="p2">
            <div className="p1 mb3 center">
              <h1 className="h1 mb3 caps">{this.props.params.username} profile</h1>
              {FollowersCount} Followers / {FollowingCount} Following
              <div className="clearfix mt1">
                {followButton}
              </div>

            </div>
            <ul className="list-reset">
              {listStories}
            </ul>
            <div className="center mt4">
              {addStoryForm}
            </div>

            <div className="center mt4">
              {addCollectionForm}
            </div>


            <div className="mt2">

            </div>
          </div>

        </div>

      </div>
    );
  }

});


module.exports = UserComponents;
