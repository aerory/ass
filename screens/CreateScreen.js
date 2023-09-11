import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default class InboxScreen extends Component<Props> {
  static navigationOptions = {
    title: 'Create',
  };

  constructor(props) {
      super(props);

      this.state = {
          bState: 0,
      };

      console.log('[+] <SecondScreen> constructor() invoked')
  }

  componentDidMount() {
      console.log('[+] <SecondScreen> componentDidMount() invoked')
  }

  componentDidUpdate() {
      console.log('[+] <SecondScreen> componentDidUpdate() invoked')
  }

  componentWillUnmount() {
      console.log('[+] <SecondScreen> componentWillUnmount() invoked')
  }

  render() {
    console.log('[+] <SecondScreen> render() invoked');

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Add Venue
        </Text>
        
        <View style={styles.button}>
            
          <Button
            title="Update State"
            onPress={() => {this.setState({
                bState: this.state.bState - 1,
            })}}
          />
        </View>
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
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
  }
});