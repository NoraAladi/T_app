import React, { Component } from 'react';
//import { UIActivityIndicator } from 'react-native-indicators';
import { View, Image } from 'react-native';

class Spinner extends Component {

    render() {
        return (
            <View style={{
                // backgroundColor: '#fff',
               
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Image source={require('../Images/AnimatedLogo.gif')}
                    style={{width:50,height:50,marginTop:this.props.top?this.props.top:null}}
                    resizeMode={'contain'}
                />
            </View>
        );

    }
}
export default Spinner;
    //    <UIActivityIndicator color={this.props.color?this.props.color:g.Bold_blue} size={28}  style = {{ marginTop : 10 }}/>
