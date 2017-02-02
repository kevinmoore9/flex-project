
import React, { Component } from 'react';
import { Image, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, InputGroup, Input, Button, Icon, View } from 'native-base';
import { signup, login, logout } from '../../actions/session_actions';
import { setUser } from '../../actions/user';

import styles from './styles';

const {
  replaceAt,
} = actions;

const SESSION_TOKEN = 'session_token';

class Login extends Component {

  static propTypes = {
    setUser: React.PropTypes.func,
    signup: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleSignUp = this.handleSignUp.bind(this);
    // this.storeToken = this.storeToken.bind(this);
  }

  setUser(name) {
    this.props.setUser(name);
  }

  replaceRoute(route) {
    this.props.replaceAt('login', { key: route }, this.props.navigation.key);
  }
  //
  // async storeToken(accessToken) {
  //   debugger
  //   try {
  //     await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
  //     console.log("Token was stored successfull ");
  //   } catch (error) {
  //     console.log("Something went wrong");
  //   }
  // }

  handleSignUp() {
    this.props.signup(this.state);
    this.replaceRoute('dashboard');
  }

  // async setToken(token) {
  //   try {
  //     await AsyncStorage.setItem(SESSION_TOKEN, currentUser.session_token);
  //     console.log("token saved");
  //   } catch (error) {
  //     console.log("token not saved");
  //   }
  // }


  render() {
    // debugger
    return (
      <Container>
        <View style={styles.container}>
          <Content>
              <View style={styles.bg}>
                <InputGroup style={styles.input}>
                  <Icon name="ios-person" />
                  <Input placeholder="EMAIL" onChangeText={val => this.setState({ email: val })} />
                </InputGroup>

                <InputGroup style={styles.input}>
                  <Icon name="ios-unlock-outline" />
                  <Input
                    placeholder="PASSWORD"
                    onChangeText={val => this.setState({ password: val })}
                    debugger
                    secureTextEntry
                  />
                </InputGroup>

                <Button style={styles.btn} onPress={() => this.handleSignUp()}>
                  Sign Up
                </Button>
              </View>
          </Content>
        </View>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    setUser: name => dispatch(setUser(name)),
    login: user => dispatch(login(user)),
    signup: user => dispatch(signup(user)),
  };
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser,
    errors: state.session.errors,
    navigation: state.cardNavigation,
  };
};

export default connect(mapStateToProps, bindActions)(Login);
