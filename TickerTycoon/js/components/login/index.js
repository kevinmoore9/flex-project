
import React, { Component } from 'react';
import { Image, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, InputGroup, Input, Button, Text, Icon, View } from 'native-base';
import { signup, login } from '../../actions/session_actions';
import { setUser } from '../../actions/user';

import styles from './styles';

const {
  replaceAt,
} = actions;

class Login extends Component {

  static propTypes = {
    setUser: React.PropTypes.func,
    signup: React.PropTypes.func,
    login: React.PropTypes.func,
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
      session: '',
    };
    this.formType = 'Log In';
    this.handleSignUp = this.handleSignUp.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async _redirectIfLoggedIn() {
    const token = await AsyncStorage.getItem('SESSION_TOKEN');
    console.log(' async pre redirect: ' + token);
    if (token !== null) {
      this.replaceRoute('dashboard');
    }
  }

  async componentWillMount() {
    await this._redirectIfLoggedIn();
  }

  // setUser(name) {
  //   this.props.setUser(name);
  // }
  shouldComponentUpdate() {
    return false;
  }

  replaceRoute(route) {
    this.props.replaceAt('login', { key: route }, this.props.navigation.key);
  }

  loginCredentials() {
    return {
      email: this.state.email,
      password: this.state.password,
    };
  }
  handleSignUp() {
    this.props.signup(this.state);
    this.replaceRoute('dashboard');
  }

  async handleLogIn() {
    await this.props.login(this.loginCredentials());
    let token = null;
    if (this.props.currentUser) {
      token = this.props.currentUser.session_token;
    }
    console.log('async post: ' + token);
    if (token !== null) {
      this.replaceRoute('dashboard');
    } else {
      this.forceUpdate();
    }
  }

  handleSubmit() {
    this.formType === 'Log In' ? this.handleLogIn() : this.handleSignUp();
  }

  toggleForm() {
    this.formType = (this.formType === 'Log In' ? 'Sign Up' : 'Log In');
    this.forceUpdate();
  }

  renderErrors() {

  }

  render() {
    console.log("render login");
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
              <Button style={styles.btn} onPress={() => this.handleSubmit()}>
                {this.formType}
              </Button>
              <Button style={styles.btn} onPress={() => this.toggleForm()} >
                {(this.formType === 'Log In' ? 'Sign Up' : 'Log In') + ' Instead'}
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
    state,
    currentUser: state.session.currentUser,
    errors: state.session.errors,
    navigation: state.cardNavigation,
  };
};

export default connect(mapStateToProps, bindActions)(Login);
