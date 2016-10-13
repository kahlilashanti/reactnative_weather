// var React = require('react-native');
// var {
//   AppRegistry,
//   MapView,
//   View,
//   StyleSheet
// } = React;

import React, {Component} from 'react'
import {AppRegistry, MapView, View, StyleSheet} from 'react-native';

var Api = require('./src/api');

var Weather = React.createClass({
  getInitialState: function(){
    return {
      pin: {
        latitude: 0,
        longitude: 0
      },
      city: '',
      temperature: '',
      description: ''
    };
  },
  render: function(){
    return <MapView
      annotations={[this.state.pin]}
      onRegionChangeComplete={this.onRegionChangeComplete}
      style={styles.map}>
    </MapView>
  },
  onRegionChangeComplete: function(region){
    this.setState({
      pin: {
        longitude: region.longitude,
        latitude: region.latitude
      }
    });

    //when we use the fat arrow function the value of 'this' is equal to the value of this outside of the Component
    Api(region.latitude, region.longitude)
    .then((data) => {
      console.log(data);
      this.setState(data);
    });

  }
});

var styles = StyleSheet.create({
  map: {
    flex: 1
  }
});

AppRegistry.registerComponent('weather', () => Weather);
