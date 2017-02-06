import React, { Component } from 'react';
import { Image, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Content, InputGroup, Input, Title, Button, Text, Icon, View, List, ListItem } from 'native-base';
import { deposit } from '../../actions/deposit';
import { openDrawer } from '../../actions/drawer';
import styles from './styles';

const {
  popRoute,
  replaceAt,
} = actions;

class Deposit extends Component {

  static propTypes = {
    deposit: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    openDrawer: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      user_id: props.currentUser.id,
    }
    this.makeDeposit = this.makeDeposit.bind(this);
  }

  replaceRoute(route) {
    this.props.replaceAt('deposit', { key: route }, this.props.navigation.key);
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  makeDeposit() {
    this.props.deposit(this.state);
    this.popRoute();
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Button transparent onPress={() => this.popRoute()}>
            <Icon name="ios-arrow-back" />
          </Button>

          <Title>Deposit Funds</Title>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content >
          <InputGroup style={styles.input}>
            <Input
              placeholder="AMOUNT"
              onChangeText={val => this.setState({ amount: val })}
            />
          </InputGroup>
          <Button style={styles.btn} onPress={() => this.makeDeposit()}>
            Make Deposit
          </Button>
        </Content>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    deposit: params => dispatch(deposit(params)),
    popRoute: key => dispatch(popRoute(key)),
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser,
    navigation: state.cardNavigation,
  };
};

export default connect(mapStateToProps, bindActions)(Deposit);
