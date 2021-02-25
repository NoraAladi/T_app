import React, { Component } from 'react';
import { ImageBackground } from 'react-native';
import { withNavigation } from "react-navigation";
import styles from './style';
class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (

            <ImageBackground source={require('../Images/HomeLogo.jpg')}
                resizeMode={'contain'}
                style={styles.fullScreen}
            >
            </ImageBackground>

        );
    }
}

export default withNavigation(SplashScreen)