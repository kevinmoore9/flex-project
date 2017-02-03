
import React, { Component } from 'react';
import { TouchableOpacity, ART, View, AsyncStorage } from 'react-native';

import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Text, Button, Icon } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';
import { logout } from '../../actions/session_actions';

import { openDrawer } from '../../actions/drawer';
import { setIndex } from '../../actions/list';
import myTheme from '../../themes/base-theme';
import styles from './styles';

const {
  Surface,
  Group,
  Shape
} = ART;

const {
  reset,
  pushRoute,
} = actions;

class Dashboard extends Component {
  static propTypes = {
    logout: React.PropTypes.func,
    setIndex: React.PropTypes.func,
    openDrawer: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    reset: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
    this.getToken = this.getToken.bind(this);
  }


  async getToken() {
    try {
      // debugger
      let token = await AsyncStorage.getItem('SESSION_TOKEN');
      // debugger
      // console.log('session_token: ' + this.props.currentUser.session_token);
      // console.log('async_token: ' + token);
      await this.props.logout(token);
      // console.log('before reset: ' + token);
      token = await AsyncStorage.setItem('SESSION_TOKEN', '');
      console.log('after reset: ' + token);
    } catch (error) {
      console.log('errors');
    }
  }

  async handleLogout() {
    console.log('logout');
    await this.getToken();
    this.props.reset(this.props.navigation.key);
  }

  pushRoute(route, index) {
    this.props.setIndex(index);
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  render() {
    console.log('render dsh');
    return (
      <Container theme={myTheme} style={styles.container}>
        <Header>
          <Button transparent onPress={() => this.handleLogout()}>
            <Icon name="ios-power" />
          </Button>

          <Title>Dashboard</Title>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content>
          <Text>
            Dashboard content goes here...
          </Text>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    logout: token => dispatch(logout(token)),
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer()),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    reset: key => dispatch(reset([{ key: 'login' }], key, 0)),
  };
}

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  list: state.list.list,
  navigation: state.cardNavigation,
  state,
});

export default connect(mapStateToProps, bindAction)(Dashboard);
