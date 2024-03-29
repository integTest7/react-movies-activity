import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//import Search from './Components/Search' /* On n'appelle plus Search directement */
import Navigation from './Navigation/Navigation' /* ON import la navigation qui contient le Stack Navigator */
import { Provider } from 'react-redux'
import Store from './Store/configureStore'

export default class App extends React.Component {
  render() {
    return (
        <Provider store={Store}>
            <Navigation />
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
