
import React, { Component } from 'react';
import { TouchableOpacity, View, WebView, AsyncStorage } from 'react-native';

import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Text, Button, Icon } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';
import Highcharts from 'highcharts';

import { logout } from '../../actions/session_actions';
import { openDrawer } from '../../actions/drawer';
import { setIndex } from '../../actions/list';
import myTheme from '../../themes/base-theme';
import styles from './styles';

const {
  reset,
  pushRoute,
} = actions;

const pieWebView = `
  <html>
    <head>
      <!--Load the AJAX API-->
      <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
      <script type="text/javascript">

        // Load the Visualization API and the corechart package.
        google.charts.load('current', {'packages':['corechart']});

        // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(drawChart);

        // Callback that creates and populates a data table,
        // instantiates the pie chart, passes in the data and
        // draws it.
        function drawChart() {

          // Create the data table.
          var data = new google.visualization.DataTable();
          data.addColumn('string', 'Ticker');
          data.addColumn('number', 'Shares');
          data.addRows([
            ['AAPL', 3],
            ['GOOG', 1],
            ['MSFT', 1],
            ['TSLA', 6],
            ['LMT', 2]
          ]);

          // Set chart options
          var options = {'title':'Portfolio Overview',
                          legend: {
                            position: 'top', textStyle: {
                              color: 'blue', fontSize: 16
                            }
                          },
                          height: '100%',
                          width: '100%'
                        };

          // Instantiate and draw our chart, passing in some options.
          var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
          chart.draw(data, options);
        }
      </script>
    </head>

    <body>
      <!--Div that will hold the pie chart-->
      <div id="chart_div"></div>
    </body>
  </html>
`;

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
      lineChart: null
    };

    this.handleLogout = this.handleLogout.bind(this);
    this.getToken = this.getToken.bind(this);
    this.createLineChart = this.createLineChart.bind(this);
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
    var Highcharts='Highcharts';
    var conf={
      chart: {
        type: 'spline',
        animation: Highcharts.svg, // don't animate in old IE
        marginRight: 10,
        events: {
          load: function () {

            // set up the updating of the chart each second
            var series = this.series[0];
            setInterval(function () {
                var x = (new Date()).getTime(), // current time
                    y = Math.random();
                series.addPoint([x, y], true, true);
            }, 1000);
          }
        }
      },
      title: {
          text: 'Live random data'
      },
      xAxis: {
          type: 'datetime',
          tickPixelInterval: 150
      },
      yAxis: {
          title: {
              text: 'Value'
          },
          plotLines: [{
              value: 0,
              width: 1,
              color: '#808080'
          }]
      },
      tooltip: {
          formatter: function () {
              return '<b>' + this.series.name + '</b><br/>' +
                  Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                  Highcharts.numberFormat(this.y, 2);
          }
      },
      legend: {
          enabled: false
      },
      exporting: {
          enabled: false
      },
      series: [{
          name: 'Random data',
          data: (function () {
              // generate an array of random data
              var data = [],
                  time = (new Date()).getTime(),
                  i;

              for (i = -19; i <= 0; i += 1) {
                  data.push({
                      x: time + i * 1000,
                      y: Math.random()
                  });
              }
              return data;
          }())
      }]
  };
    return (
      <ChartView style={{height:300}} config={conf}></ChartView>
    );
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
          <WebView>
            style={{
              height: 400,
            }}
            source={ this.state.lineChart }
          </WebView>

          <WebView
            style={{
              height: 400,
            }}
            source={{ html: pieWebView }}
          />
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
