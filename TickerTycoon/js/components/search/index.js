
import React, { Component } from 'react';
import { Modal, Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Text, Input,
         Button, Icon, Badge, InputGroup, List, ListItem,
         Spinner, Card, CardItem, View } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

import { updateStock } from '../../actions/stock';
import * as APIUtil from '../../util/stock_api_util';

const {
  popRoute,
} = actions;

class Search extends Component {

  static propTypes = {
    updateStock: React.PropTypes.func,
    index: React.PropTypes.number,
    openDrawer: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);

    this.state = {
      results: [],
      loading: false,
      stockModalOpen: false,
      selectedStock: undefined,
    };
    this.handlePress = this.handlePress.bind(this);
    this.queryTickers = this.queryTickers.bind(this);
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  queryTickers(str) {
    this.setState({
      loading: true,
    });

    APIUtil.suggestStocks(str)
      .then((results) => {
        this.setState({
          results,
          loading: false,
        });
      });
  }

  handlePress(ticker) {
    this.props.updateStock(ticker);
    APIUtil.getStock(ticker)
      .then((stock) => {
        this.setState({
          selectedStock: stock,
          stockModalOpen: true,
        });
      });
    console.log(this.state.selectedStock);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Button transparent onPress={() => this.popRoute()}>
            <Icon name="ios-arrow-back" />
          </Button>

          <Title>Search Stocks</Title>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content padder>
          <InputGroup>
            <Icon name="ios-search" />
            <Input
              placeholder="Search"
              onChangeText={searchString => this.queryTickers(searchString)}
            />
          </InputGroup>
          {this.state.loading ? <Spinner />
          : <List
            dataArray={this.state.results}
            renderRow={item =>
              <ListItem button onPress={() => this.handlePress(item.symbol)} >
                <Text>{item.symbol}</Text>
                <Text style={{ color: '#007594' }}>{item.name}</Text>
              </ListItem>
            }
          />}
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.stockModalOpen}
          >
            {this.state.selectedStock &&
              <Card style={{ paddingTop: 20 }} >
                <CardItem header>
                  <Text>{this.state.selectedStock.name}</Text>
                </CardItem>
                <CardItem>
                  <Button>Buy {this.state.selectedStock.symbol}</Button>
                  <Button>Sell {this.state.selectedStock.symbol}</Button>
                </CardItem>
                <CardItem header>
                  <Button onPress={() => this.setState({ stockModalOpen: false })}>
                    Close
                  </Button>
                </CardItem>
              </Card>
            }
          </Modal>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    popRoute: key => dispatch(popRoute(key)),
    updateStock: ticker => dispatch(updateStock(ticker)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  index: state.list.selectedIndex,
  list: state.list.list,
});


export default connect(mapStateToProps, bindAction)(Search);
