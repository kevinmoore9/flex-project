import React, { Component } from 'react';
import { Image, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Content, InputGroup, Input, Title, Button, Text, Icon, View, List, ListItem } from 'native-base';
import { openDrawer } from '../../actions/drawer';
import styles from './styles';

const {
  popRoute,
  replaceAt,
} = actions;

class Positions extends Component {

  static propTypes = {
    popRoute: React.PropTypes.func,
    openDrawer: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      user_id: props.currentUser.id,
    };
  }

  replaceRoute(route) {
    this.props.replaceAt('positions', { key: route }, this.props.navigation.key);
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Button transparent onPress={() => this.popRoute()}>
            <Icon name="ios-arrow-back" />
          </Button>

          <Title>Positions</Title>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>
        <Content>
          <Text style={styles.value}>Portfolio Value: ${this.props.currentUser.balances.equity}</Text>
          <List>
            {Object.values(this.props.currentUser.stocks).map((stock, i) => (
              <ListItem key={`stock-${i}`} style={styles.li}>
                <List>
                  <ListItem>
                    <Text style={styles.headerText}>
                      {stock.name}
                    </Text>
                  </ListItem>
                  <ListItem style={styles.indentItem}>
                    <Text>
                      {`    Shares: ${stock.num_shares}`}
                    </Text>
                  </ListItem>
                  <ListItem style={styles.indentItem}>
                    <Text>
                      {`    Price: ${stock.price}`}
                    </Text>
                  </ListItem>
                </List>
              </ListItem>
              ))
            }
          </List>
        </Content>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
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

export default connect(mapStateToProps, bindActions)(Positions);
