import React, { Component } from 'react';
import { View, Text, Image, Dimensions, ImageBackground } from 'react-native';
import styles from './style';
import { withNavigation } from "react-navigation";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (

            <ImageBackground source={require('../Images/processed.jpeg')}
                resizeMode={'contain'}
                style={{ width: '100%', height: '100%' }}
            >
            </ImageBackground>

        );
    }
}

export default withNavigation(SplashScreen)