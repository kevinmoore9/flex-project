/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Alert,
  Text,
  Button,
  View
} from 'react-native';

export default class TestProject extends Component {
  constructor(props) {
    super(props);
    let pressed = false;
  }
  buttonPress() {
    Alert.alert('button has been pressed');
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          React Native Test!
        </Text>
        <Button title="Button" onPress={this.buttonPress}/>
        <Text style={styles.instructions}>
        {this.pressed ? "button pressed" : "not pressed"}
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('TestProject', () => TestProject);
