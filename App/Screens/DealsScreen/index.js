import styles from '../LoginScreen/style';
import React, { Component } from 'react';
import {
     View,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Deal from './Deal'
import UserFooter from '../../Navigation/UserFooter';
import Header from './header'
class index extends Component {
   
    render() {
        return (
            <View>
           <Deal />
            </View>
        );

    }
}
export default withNavigation(index);
