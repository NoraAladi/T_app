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
import FitImage from 'react-native-fit-image';


class header extends Component {
    constructor() {
        super()
        this.state = {
            Flag: false,
            personalPhoto: ''

        }
        AsyncStorage.getItem('patientCode').then(val => {
            this.setState({
                code: val
            })
        })

        AsyncStorage.getItem('patientName').then(val => {
            this.setState({
                name: val
            })
        })




    }

    _close_model() {
        this.setState({
            Flag: false,
        })
    }

    setData = (name, code, personalPhoto) => {
        this.setState({
            name: name,
            code: code,
            personalPhoto: personalPhoto
        })
    }
    componentDidMount() {
        
        this.props.navigation.addListener('willFocus', () => {
            AsyncStorage.getItem('personalPhoto').then(val => {
                if (val != 'null') {
                    this.setState({
                        personalPhoto: val
                    })
                }
            })
        });
        AsyncStorage.getItem('personalPhoto').then(val => {
            if (val != 'null') {
                this.setState({
                    personalPhoto: val
                })
            }
        })
    }
    render() {
        return (
            <View
                style={[style.container, {
                    justifyContent: 'space-between', width: '100%',
                    paddingHorizontal: 25,
                    paddingBottom: 15,
                    paddingTop:10
                }]}>

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
                    <TouchableOpacity style={{ flexDirection: 'row-reverse', alignItems: 'center' }} onPress={() => {
                        this.props.navigation.navigate('ProfileScreen')
                    }}>
                        <FitImage
                            key={this.state.personalPhoto}
                            source={this.state.personalPhoto ?
                                { uri: this.state.personalPhoto } : require('../../Images/noUser.png')}
                            style={[style.userimg, { overflow: 'hidden', borderRadius: 25 }]} />
                        <View style={style.viewHeader}>
                            <Text style={[style.username, { textAlign: 'left' }]}> {' ' + this.state.name} </Text>
                            <Text style={style.code}>{this.state.code}  </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {this.props.title == 'لوجو' ?
                    <FitImage source={require('../../Images/logo.png')}
                        style={{ width: 90, height: 55 }}
                        resizeMode='center'
                    />
                    :
                    <Text style={[style.offer,{marginLeft:0}]}>{this.props.title}</Text>
                }
                {
                    this.state.Flag ?
                        <ModalAddUser closeModel={() => this._close_model()}
                            setData={this.setData}
                        /> : null
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

