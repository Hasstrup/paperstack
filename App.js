import RootTabs from './src/nav'
import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation'
import { AdMobInterstitial } from 'react-native-admob'

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      counter: 1
    }
  }

addCounter = (blam) => {
  this.setState({ counter: this.state.counter + 1})
    if(this.state.counter !== 1 &&this.state.counter % 4 == 0) {
      this.showAd()
    } else { }
  }

showAd = () => {
    AdMobInterstitial.setAdUnitID('ca-app-pub-6762059104295133/6294117322');
    AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
  }


  render() {
    return (
      <RootTabs onNavigationStateChange={(prevState, currentState) => {
        getCurrentRouteName = (navigationState) => {
        if (!navigationState) {
          return null }
        const route = navigationState.routes[navigationState.index];
        if (route.routes) {
          return getCurrentRouteName(route) }
        return route.routeName;
      }
        const currentScreen = getCurrentRouteName(currentState);
        const prevScreen = getCurrentRouteName(prevState);

        if(currentScreen === 'ShowPost') {
          this.addCounter()
        } else { }

          }}
          />
    );
  }
}
