
import React, { Component } from 'react';
import { TouchableOpacity, View, Image, WebView, AsyncStorage } from 'react-native';

import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Text, Button, Icon } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';
import Highcharts from 'highcharts';
import ChartView from 'react-native-highcharts';

import { logout } from '../../actions/session_actions';
import { openDrawer } from '../../actions/drawer';
import { setIndex } from '../../actions/list';
import myTheme from '../../themes/base-theme';
import styles from './styles';

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

    this.state = {
      lineChart: null,
    };

    this.handleLogout = this.handleLogout.bind(this);
    this.getToken = this.getToken.bind(this);
  }


  async getToken() {
    try {
      console.log('dash logout');
      await this.props.logout(this.props.currentUser.session_token);
      console.log('dash empty current user');
      await AsyncStorage.setItem('CURRENT_USER', '');
    } catch (error) {
      console.log('error logging out');
    }
  }

  async handleLogout() {
    await this.getToken();
    console.log('dash reset');
    this.props.reset(this.props.navigation.key);
  }

  pushRoute(route, index) {
    this.props.setIndex(index);
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  render() {
    let Highcharts = 'Highcharts';
    let confPie = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
      },
      title: {
        text: 'Breakdown',
        align: 'center',
        verticalAlign: 'middle',
        y: 40,
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: true,
            distance: -50,
            style: {
              fontWeight: 'bold',
              color: 'white',
            },
          },
          startAngle: -90,
          endAngle: 90,
          center: ['50%', '75%'],
        },
      },
      series: [{
        type: 'pie',
        name: 'Portfolio share',
        innerSize: '50%',
        data: [
          ['AAPL', 10],
          ['MSFT', 12],
          ['LMT', 22],
          ['INO', 5],
          ['AMD', 2],
        ],
      }],
    };

    let confLine = {
      chart: {
        type: 'spline',
        animation: Highcharts.svg,
        marginRight: 10,
        events: {
          load: function () {
            let series = this.series[0];
            setInterval(function () {
              let x = (new Date()).getTime()
              let y = Math.random();
              series.addPoint([x, y], true, true);
            }, 1000);
          },
        },
      },
      title: {
        text: 'Your Portfolio Value',
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150,
      },
      yAxis: {
        title: {
          text: 'Value ($)',
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080',
        }],
      },
      tooltip: {
        formatter: function () {
          return '<b>' + this.series.name + '</b><br/>' +
            Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
            Highcharts.numberFormat(this.y, 2);
        },
      },
      legend: {
        enabled: false,
      },
      exporting: {
        enabled: false,
      },
      series: [{
        name: 'Portfolio Value',
        data: (function () {
          let data = []
          let time = (new Date()).getTime()
          let i;

          for (i = -19; i <= 0; i += 1) {
            data.push({
              x: time + i * 1000,
              y: Math.random()
            });
          }
          return data;
        }()),
      }],
    };
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
          <ChartView style={{ height: 300 }} config={confLine} />
          <ChartView style={{ height: 300 }} config={confPie} />
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
