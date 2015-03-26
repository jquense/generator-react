'use strict';
var React = require('react');

<% if ( props.includeStyles ) { %>
require('../src/less/styles.less')
<% } %>
var App = React.createClass({

  render: function() {
    
    return (<div>

    </div>);
  }

});

React.render(<App />, document.body);