import React, { Component } from 'react';
import { View, Text, Image, Dimensions, ImageBackground } from 'react-native';
import { withNavigation } from "react-navigation";

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
                style={{ width: '100%', height: '100%' }}
            >
            </ImageBackground>

        );
    }
}

export default withNavigation(SplashScreen)