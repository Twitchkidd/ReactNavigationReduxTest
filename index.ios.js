import React, { Component } from 'react';
import {
  View,
  Text,
  AppRegistry,
  Button
} from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';

class Screen1 extends Component {
  render() {
    return (
      <View>
        <Text>Screen 1</Text>
        <Button
          onPress={() => this.props.navigation.navigate('Screen2')}
          title="To Screen 2"
        />
      </View>
    );
  }
}

class Screen2 extends Component {
  render() {
    return (
      <View>
        <Text>Screen 2</Text>
      </View>
    );
  }
}

const AppNavigator = StackNavigator({
  Screen1: { screen: Screen1 },
  Screen2: { screen: Screen2 }
});

const navReducer = (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return (newState ? newState : state)
};

const appReducer = combineReducers({
  nav: navReducer,
});

@connect(state => ({
  nav: state.nav,
}))
class AppWithNavigationState extends React.Component {
  render() {
    return (
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
      })} />
    );
  }
}

const store = createStore(appReducer);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('ReactNavigationReduxTest', () => App);