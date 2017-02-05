
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Text, Input,
         Button, Icon, Badge, InputGroup, List, ListItem,
         Spinner } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

import { updateStock } from '../../actions/stock';

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
    };
    this.handlePress = this.handlePress.bind(this);
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  queryTickers(str) {
    this.setState({
      loading: true,
    });

    fetch(`http://d.yimg.com/autoc.finance.yahoo.com/autoc?query=${str}&region=1&lang=en&callback=YAHOO.Finance.SymbolSuggest.ssJSON`, { method: 'GET' })
    .then(res => res.text())
    .then((txt) => {
      const regex = /^YAHOO.Finance.SymbolSuggest.ssJSON\((.*)\);$/g;
      const match = regex.exec(txt);
      const tickerObj = JSON.parse(match[1]);
      const results = tickerObj.ResultSet.Result.filter(res => res.exchDisp === 'NASDAQ');
      this.setState({ results, loading: false });
    })
    .catch(error => console.log(error));
  }

  handlePress(ticker) {
    this.props.updateStock(ticker);
  }

  render() {
    let tickerItems;
    let tickers = this.state.results;
    console.log(tickers[0]);
    if (tickers.length > 0) {
      tickerItems = tickers.map(ticker => (
        <ListItem iconLeft key={ticker.symbol}>
          <Text>{ticker.symbol}</Text>
        </ListItem>
      ));
    } else {
      tickerItems = (
        <ListItem>
          <Text>No Results</Text>
        </ListItem>
      );
    }


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
            <Icon name="ios-people" />
          </InputGroup>
          {this.state.loading ? <Spinner /> : <List dataArray={this.state.results} renderRow={item =>
            <ListItem button onPress={() => this.handlePress(item.symbol)} >
              <Text>{item.symbol}</Text>
              <Text style={{ color: '#007594' }}>{item.name}</Text>
            </ListItem>
          } />}
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
