/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  VictoryChart, VictoryLine, VictoryZoomContainer,
  VictoryTooltip
} from 'victory-native';

const INITIAL_A_DOMAIN = [
  new Date(1990, 1, 1),
  new Date(2009, 1, 1)
];

class CustomTooltip extends React.Component {
  render() {
    const { domain, index, data } = this.props;
    const datum = data[index];
    const active = datum.a >= domain.x[0] && datum.a <= domain.x[1];

    return (
      <VictoryTooltip
        {...this.props}
        active={active}
      />
    );
  }
}

export default class App extends React.Component {
  constructor() {
    super();

    this.data = [
      { a: new Date(1982, 1, 1), b: 125 },
      { a: new Date(1987, 1, 1), b: 257 },
      { a: new Date(1993, 1, 1), b: 345 },
      { a: new Date(1997, 1, 1), b: 515 },
      { a: new Date(2001, 1, 1), b: 132 },
      { a: new Date(2005, 1, 1), b: 305 },
      { a: new Date(2011, 1, 1), b: 2700 },
      { a: new Date(2015, 1, 1), b: 4700 }
    ];

    this.state = {
      domain: {
        x: INITIAL_A_DOMAIN,
        y: this.getYDomain(INITIAL_A_DOMAIN)
      }
    };
  }

  handleZoom(domain) {
    this.setState({
      domain: {
        x: domain.x,
        y: this.getYDomain(domain.x)
      }
    });
  }

  getYDomain(xDomain) {
    const data = this.getDomainData(xDomain);
    const bs = data.map((obj) => obj.b);

    return [
      Math.min.apply(this, bs) - 100,
      Math.max.apply(this, bs) + 100
    ];
  }

  getDomainData(xDomain) {
    return this.data.filter((obj) => {
      return obj.a >= xDomain[0] && obj.a <= xDomain[1];
    });
  }

  render() {
    return (
      <View>
        <VictoryChart
          width={400}
          height={270}
          scale={{ x: "time" }}
          containerComponent={
            <VictoryZoomContainer
              allowZoom={false}
              zoomDimension="x"
              zoomDomain={this.state.domain}
              onZoomDomainChange={this.handleZoom.bind(this)}
            />
          } >
          <VictoryLine
            style={{ data: { stroke: "tomato" } }}
            data={this.data}
            labels={(item) => item.b}
            labelComponent={
              <CustomTooltip
                domain={this.state.domain} />
            }
            x="a"
            y="b" />
      </VictoryChart>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
