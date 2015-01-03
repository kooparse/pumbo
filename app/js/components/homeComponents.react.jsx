
var _               = require('underscore'),
    React           = require('react'),
    UserStore       = require('../stores/userStore'),
    StoryStore      = require('../stores/storyStore'),
    UserActions     = require('../actions/userActions'),
    StoryActions    = require('../actions/storyActions');


var currentUser     = require('../libs/current_user');

var Router          = require('react-router'),
    Link            = Router.Link;



var HomeApp = React.createClass({

  getInitialState: function () {
    if (currentUser.id())
      StoryActions.getFeed(currentUser.id());

    return {storyList: StoryStore.getFeed()};
  },

  componentWillMount: function () {
    StoryStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    StoryStore.removeChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState({storyList: StoryStore.getFeed()});
  },

  render: function() {

    if (typeof this.state.storyList !== 'undefined') {

      var storyList = this.state.storyList.map(function (story) {
        return (
          <li className="p2">
            <a href={story.url} target="_blank">{story.title}</a>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <a className="clearfix" href={story.userInfos.username}>By {story.userInfos.username}</a>
          </li>
        );
      });

      var list = (
        <div className="col-8 px2 mx-auto">
          <ul className="list-reset">
            {storyList}
          </ul>
        </div>
      );
    }


    return (
      <div className="clearfix container home">
        <h1 className="h1 p1 mb3 center caps">This is Pumbo</h1>
        <div className="p3">
        {list}
        </div>
      </div>
    );
  }

});

module.exports = HomeApp;
