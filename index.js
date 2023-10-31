/**
 * @format
 * @param {string} appName - name of the application
 * @returns {JSX.Element}
 * @function
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
