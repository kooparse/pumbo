var React           = require('react'),
    RouteHandler    = require('react-router').RouteHandler,

    Topbar          = require('./topbarComponents.react.jsx');


module.exports = React.createClass({

  render: function () {
    return (
      <div className="content">
        <Topbar/>
        <RouteHandler params={this.props.params} query={this.props.query}/>
      </div>
    )
  }

});
