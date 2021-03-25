import React, { Component } from 'react';
import { UIActivityIndicator } from 'react-native-indicators';
import g from '../Gloabal';

class Spinner extends Component {

    render() {
        return (
        <UIActivityIndicator color={this.props.color?this.props.color:g.Bold_blue} size={28}  style = {{ marginTop : 10 }}/>
        );

    }
}
export default  Spinner ;
