import 'react-native-gesture-handler';
import React, { Component } from 'react';
import HomeScreen from './screens/HomeScreen';
import {Picker} from '@react-native-picker/picker';
import WishlistScreen from './screens/WishlistScreen';
import HistoryScreen from './screens/HistoryScreen';
import InboxScreen from './screens/InboxScreen';
import ProfileScreen from './screens/ProfileScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import MenuDrawer from './screens/MenuDrawer';
import Icon from 'react-native-ionicons'
import { 
  Text,
  View,
  Alert,
  Image,
  Button,
  Switch,
  Platform,
  FlatList,
  TextInput,
  ScrollView,
  StyleSheet,
  SectionList,
  SafeAreaView,
  ToastAndroid,
  TouchableOpacity,
  TimePickerAndroid,
  TouchableHighlight,
  DrawerLayoutAndroid,
  TouchableNativeFeedback,
  TouchableWithoutFeedback
} from 'react-native';

/**
 * InputWithLabel
 */
class InputWithLabel extends Component {
    constructor(props) {
      super(props);
  
      this.orientation = this.props.orientation
        ? this.props.orientation == 'horizontal'
          ? 'row'
          : 'column'
        : 'column';
    }
  
    render() {
      return (
        <View style={[inputStyles.container, {flexDirection: this.orientation}]}>
          <Text style={inputStyles.label}>{this.props.label}</Text>
          <TextInput
            style={[inputStyles.input, this.props.style]}
            {...this.props}
          />
        </View>
      );
    }
  }
  
  /**
   * AppButton
   */
  class AppButton extends Component {
    constructor(props) {
      super(props);
  
      if (props.theme) {
        switch (props.theme) {
          case 'success':
            this.backgroundColor = '#449d44';
            break;
          case 'info':
            this.backgroundColor = '#31b0d5';
            break;
          case 'warning':
            this.backgroundColor = '#ec971f';
            break;
          case 'danger':
            this.backgroundColor = '#c9302c';
            break;
          case 'primary':
          default:
            this.backgroundColor = '#286090';
        }
      } else {
        this.backgroundColor = 'white';
      }
    }
  
    render() {
      return (
        <TouchableNativeFeedback
          onPress={this.props.onPress}
          onLongPress={this.props.onLongPress}
          background={
            Platform.OS === 'android'
              ? TouchableNativeFeedback.SelectableBackground()
              : ''
          }>
          <View
            style={[
              buttonStyles.button,
              {backgroundColor: this.backgroundColor},
            ]}>
            <Image style={{width: 25, height: 25}} source={require('./icons/search-icon.png')}/>
          </View>
        </TouchableNativeFeedback>
      );
    }
  }
  
  const buttonStyles = StyleSheet.create({
    button: {
      marginTop: 1,
      padding: 12,
      height: 50,
      width: 50,
      alignItems: 'center',
    },
  });
  
  const inputStyles = StyleSheet.create({
    container: {
      height: 50,
    },
    label: {
      flex: 1,
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 3,
      textAlignVertical: 'center',
    },
  
    input: {
      flex: 120,
      fontSize: 20,
      color: 'blue',
    },
  });

 
  /**
   * Export modules
   */
  module.exports = {
    InputWithLabel: InputWithLabel,
    AppButton: AppButton,
  };
