import style from './style';
import React, { Component } from 'react';
import {
    View, Image, Text, TouchableOpacity
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import ModalAddUser from '../../Navigation/ModalAddUser';
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage';


class header extends Component {
    constructor() {
        super()
        this.state = {
            Flag: false,
            
        }
        AsyncStorage.getItem('user').then(val => {
             this.setState({
                name: JSON.parse(val).patient.fullNameAr,
                code: JSON.parse(val).patient.code
            })
        })
    }

    _close_model() {
        this.setState({
            Flag: false,
        })
    }
    
    render() {
        return (
            <View
                style={style.container}>

                <View
                    style={style.flag}>
                    <TouchableOpacity onPress={() => {
                        this.setState({
                            Flag: true
                        })
                    }}>

                        <Icon name="arrow-drop-down" type="MaterialIcons"
                            style={style.arrow} />

                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => {
                        this.props.navigation.navigate('ProfileScreen')
                    }}>
                        <Image source={require('../../Images/profile.png')}
                            style={style.userimg} />
                        <View style={style.view1}>
                            <Text style={[style.username,{textAlign:'left'}]}> {' '+this.state.name} </Text>
                            <Text style={style.code}>{this.state.code}  </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {this.props.title == 'لوجو' ?
                    <Image source={require('../../Images/logo.png')}
                        style={style.imageLogo}
                    />
                    :
                    <Text style={style.offer}>{this.props.title}</Text>
                }
                {
                    this.state.Flag ?
                        <ModalAddUser closeModel={() => this._close_model()} /> : null
                }
            </View>

        );

    }
}


const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps)(withNavigation(header));

