// import React, {Component, render} from 'react';
var React = require('react');

var HelloMessage = React.createClass({

    render:function() {
        return(
            <div>Hello world</div>
        );
    },
})
//es6 
// class HelloMessage extends React.Component {
//  render() {
//      return <div>Hello {this.props.name}</div>;
//  }
// }

module.exports = HelloMessage;