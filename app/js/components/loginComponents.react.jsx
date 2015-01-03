
var React           = require('react'),
    Navigation      = require('react-router').Navigation;

    UserActions     = require('../actions/userActions'),
    AuthStore       = require('../stores/authStore'),
    AuthActions     = require('../actions/authActions');

var currentUser     = require('../libs/current_user');

var _ = require('underscore');

var SignUpComponents = React.createClass({

  handleSubmit: function (e) {
    e.preventDefault();

    var dataForm = {
      username    : this.refs.username.getDOMNode().value,
      email       : this.refs.email.getDOMNode().value,
      password    : this.refs.password.getDOMNode().value,
      description : this.refs.description.getDOMNode().value
    }

    if (!dataForm.email || !dataForm.username || !dataForm.password)
      return;

    AuthActions.signUp(dataForm);
  },

  render: function () {
    return (
      <form className="signup-form p4" onSubmit={this.handleSubmit}>
        <label>Email Address</label>
        <input type="email" className="block full-width field-light" ref="email"/>
        <label>Username</label>
        <input type="text" className="block full-width field-light" ref="username"/>
        <label>Password</label>
        <input type="password" className="block full-width field-light" ref="password"/>
        <label>Description</label>
        <input type="text" className="block full-width field-light" ref="description"/>
        <button type="submit" className="button-blue mt1">Sign Up</button>
      </form>
    )
  }

});

var SignInComponents = React.createClass({

  handleSubmit: function (e) {
    e.preventDefault();

    var dataForm = {
      email       : this.refs.email.getDOMNode().value,
      password    : this.refs.password.getDOMNode().value
    }

    if (!dataForm.email || !dataForm.password)
      return;

    AuthActions.signIn(dataForm);
  },

  render: function () {
    return (
      <form className="signin-form p4" onSubmit={this.handleSubmit}>
        <label>Email Address</label>
        <input type="email" className="block full-width field-light" ref="email"/>
        <label>Password</label>
        <input type="password" className="block full-width field-light" ref="password"/>
        <button type="submit" className="button-blue mt1">Sign In</button>
      </form>
    )
  }

});

var LoginPageComponents = React.createClass({

  mixins: [Navigation],

  componentWillMount: function () {
    AuthStore.addChangeListener(this._onChange);
  },

  _onChange: function () {
    var user = AuthStore.getUserObj();

    if (user.username) {
      // UserActions.getUser(user.username);
      this.transitionTo('user', {username: user.username});
    }

  },

  render: function () {

    return (
      <div classNamme="login container">
        <div classNamme="clearfix mxn2 mx-auto">
          <div className="col col-6">
            <SignUpComponents/>
          </div>
          <div className="col col-6">
            <SignInComponents/>
          </div>

        </div>
      </div>
    )

  }

});

module.exports = LoginPageComponents;
