
var React           = require('react/addons'),
    Link            = require('react-router').Link,

    UserActions     = require('../actions/userActions'),
    StoryActions    = require('../actions/storyActions'),
    AuthStore       = require('../stores/authStore'),
    AuthActions     = require('../actions/authActions'),
    ProfileStore    = require('../stores/profileStore'),
    ProfileActions  = require('../actions/profileActions');

var currentUser     = require('../libs/current_user');


var topbarComponents = React.createClass({

  getInitialState: function () {
    if (currentUser.id())
      ProfileActions.getProfile(currentUser.id());
    return { profile: ProfileStore.getProfile(), dropDownToggle: false };
  },

  componentWillMount: function () {
    ProfileStore.addChangeListener(this._onChange);
    AuthStore.addChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState({profile: ProfileStore.getProfile() || AuthStore.getUserObj()});
  },

  handleProfileRoute: function (e) {
    e.stopPropagation();
    UserActions.getUser(this.state.profile.username);
  },

  handleHomeRoute: function (e) {
    e.stopPropagation();
    StoryActions.getFeed(this.state.profile.id);
  },

  handleDropDown: function (e) {
    e.stopPropagation();
    this.setState({dropDownToggle: !this.state.dropDownToggle});
  },

  handleLogout: function (e) {
    e.stopPropagation();
    currentUser.logout();
  },

  render: function () {

    var cx = React.addons.classSet;
    var dropDownClasses = cx({
      'inline-block': true,
      'disclosure-group': true,
      'is-active': this.state.dropDownToggle
    });

    var minWidth = {
      minWidth: '100px'
    };

    if (!currentUser.id() && typeof this.state.profile === 'undefined')
      var loginLinkButton = <Link className="button py2 m0 dark-gray button-nav-light" to="login">Login</Link>

    if (typeof this.state.profile !== 'undefined') {

      var myAccount = (
        <div id="account-menu" className={dropDownClasses} data-disclosure onClick={this.handleDropDown}>
          <div className="disclosure-show fixed top-0 right-0 bottom-0 left-0"></div>
          <div className="relative">
            <a href="javascript:void(0)" className="button py2 m0 dark-gray button-nav-light" style={minWidth}>{this.state.profile.username} &#9662;</a>
            <div className="disclosure-show absolute right-0 nowrap bg-darken-1 rounded" style={minWidth}>
              <ul className="h5 list-reset mb0">
                <li><Link className="button block button-nav-light" onClick={this.handleProfileRoute} to="user" params={{username: this.state.profile.username}}>Profile</Link></li>
                <li><Link className="button block button-nav-light" to="home">Settings</Link></li>
                <li><a href="javascript:void(0)" className="button block button-nav-light" onClick={this.handleLogout}>Sign Out</a></li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    return (
      <header>
        <div className="clearfix">
          <div className="left">
            <Link className="button py2 m0 dark-gray button-nav-light" onClick={this.handleHomeRoute} to="home">Pumbo</Link>
          </div>
          <div className="right">
            {loginLinkButton}
            {myAccount}
          </div>
          <div className="clearfix sm-hide"></div>
          <div className="overflow-hidden px2">
          </div>
        </div>
      </header>
    )
  }

});

module.exports = topbarComponents;
