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

            <View style={{
                backgroundColor: '#fff',
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Image source={require('../Images/AnimatedLogo.gif')}
                    resizeMode={'center'}
                />
            </View>

        );
    }
}

export default withNavigation(SplashScreen)