
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Text, Input, Button, Icon, InputGroup } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

const {
  popRoute,
} = actions;

class Search extends Component {

  static propTypes = {
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
    };
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  queryTickers(str) {
    fetch(`http://d.yimg.com/autoc.finance.yahoo.com/autoc?query=${str}&region=1&lang=en&callback=YAHOO.Finance.SymbolSuggest.ssJSON`, {method: "GET"})
    .then(res => res.text())
    .then((txt) => {
      const regex = /^YAHOO.Finance.SymbolSuggest.ssJSON\((.*)\);$/g;
      const match = regex.exec(txt);
      const tickerObj = JSON.parse(match[1]);
      const resultSet = tickerObj.ResultSet.Result;
      const resultArr = resultSet.map((r) => r.symbol);
      console.log(resultArr);
    })
    .catch(error => console.log(error));
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
            <Icon name="ios-people" />
          </InputGroup>
          <Button transparent>
              Search
          </Button>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  index: state.list.selectedIndex,
  list: state.list.list,
});


export default connect(mapStateToProps, bindAction)(Search);
