import './ReactotronConfig'
import { AppRegistry } from 'react-native';
import App from './App';

// Adding payment requests to the global object
global.PaymentRequest = require('react-native-payments').PaymentRequest;

AppRegistry.registerComponent('iMove', () => App);
