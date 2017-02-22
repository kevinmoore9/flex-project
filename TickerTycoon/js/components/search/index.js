
import React, { Component } from 'react';
import { Modal, Image, Platform, Dimensions, AlertIOS } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Text, Input,
         Button, Icon, Badge, InputGroup, List, ListItem,
         Spinner, Card, CardItem, View } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';
import { trade } from '../../actions/trade';
import { updateStock } from '../../actions/stock';
import * as APIUtil from '../../util/stock_api_util';

const {
  popRoute,
} = actions;

class Search extends Component {

  static propTypes = {
    updateStock: React.PropTypes.func,
    trade: React.PropTypes.func,
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
    this.handleTrade = this.handleTrade.bind(this);
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
        });
      })
      .then(() => {
        this.setState({
          stockModalOpen: true,
        });
      });
  }

  handleTrade(type, num) {
    const params = {
      trade_type: type,
      volume: parseInt(num),
      ticker_sym: this.state.selectedStock.Symbol,
      user_id: this.props.currentUser.id,
    };
    this.props.trade(params);
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
                <Text note style={{ color: '#007594' }}>{item.name}</Text>
              </ListItem>
            }
          />}
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.stockModalOpen}
          >
            {(this.state.selectedStock !== undefined) &&
              <Card style={{ paddingTop: 20 }} >
                <CardItem header>
                  <Text>{this.state.selectedStock.Name}</Text>
                </CardItem>
                <CardItem cardBody style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Button onPress={() => AlertIOS.prompt('How many shares?', null, num => this.handleTrade('BUY', num))}>
                    Buy {this.state.selectedStock.Symbol}
                  </Button>
                  <Button onPress={() => AlertIOS.prompt('How many shares?', null, num => this.handleTrade('SELL', num))}>
                    Sell {this.state.selectedStock.Symbol}
                  </Button>
                </CardItem>
                <CardItem>
                  <Text>
                    Price: {this.state.selectedStock.LastTradePriceOnly}
                  </Text>
                </CardItem>
                <CardItem>
                  <Image
                    resizeMode="contain"
                    style={{ height: 200 }}
                    source={{
                      uri: `https://chart.finance.yahoo.com/z?s=${this.state.selectedStock.Symbol}&t=1M&key=${Math.random()}`,
                    }}
                  />
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
    trade: params => dispatch(trade(params)),
  };
}

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  navigation: state.cardNavigation,
  index: state.list.selectedIndex,
  list: state.list.list,
});


export default connect(mapStateToProps, bindAction)(Search);
