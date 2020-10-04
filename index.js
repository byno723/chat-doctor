/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

import {YellowBox} from 'react-native';

import 'react-native-gesture-handler';

// console.ignoredYellowBox = ['Remote debugger'];
YellowBox.ignoreWarnings(['Remote debugger']);
AppRegistry.registerComponent(appName, () => App);
