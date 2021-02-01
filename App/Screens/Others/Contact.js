import styles from './style';
import React, { Component } from 'react';
import {
    Text, View, ScrollView, TextInput,
    TouchableOpacity, Platform, ImageBackground, Image,
    I18nManager, Modal, KeyboardAvoidingView, FlatList, Dimensions, VirtualizedList
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import AsyncStorage from '@react-native-community/async-storage';
import {

    UIActivityIndicator,
} from 'react-native-indicators';
import Header from '../DealsScreen/header';
import HeaderNav from '../../Navigation/HeaderNav';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <HeaderNav title={g.CONTACT} />

                <View style={{ zIndex: -1, alignItems: 'center', justifyContent: 'center', }}>
                <View>
                    <Text style={[styles.txt, { marginTop: hp('2%'),color:g.Gray }]}>
                        {g.FULL_NAME}
                    </Text>

                    <View style={[styles.viewInput]}>

                        <TextInput
                            placeholder={g.FULL_NAME}
                            onChangeText={(fullName) => {
                                this.setState({
                                    fullName: fullName,
                                })

                            }}
                            
                            placeholderTextColor={g.Light_Gray}
                            style={[styles.input]} />
                    </View>
                </View>

                <View>
                    <Text style={[styles.txt, { marginTop: hp('2%'),color:g.Gray }]}>
                        {g.MOBILE}
                    </Text>

                    <View style={[styles.viewInput]}>

                        <TextInput
                            placeholder={g.MOBILE}
                            keyboardType={'number-pad'}
                            onChangeText={(phone) => {
                                this.setState({
                                    phone: phone,
                                })

                            }}
                            
                            placeholderTextColor={g.Light_Gray}
                            style={[styles.input]} />
                    </View>
                </View>

                    
                <View>
                    <Text style={[styles.txt, { marginTop: hp('2%'),color:g.Gray }]}>
                        {g.MESSAGE}
                    </Text>

                    <View style={[styles.viewInput,{height:hp('12')}]}>

                            <TextInput
                                multiline
                            placeholder={g.WRITE_HERE}
                            onChangeText={(message) => {
                                this.setState({
                                    message: message,
                                })

                            }}
                            
                            placeholderTextColor={g.Light_Gray}
                            style={[styles.input,{textAlignVertical:'top'}]} />
                    </View>
                    </View>
                    

                    <TouchableOpacity style={[styles.btn, { marginTop:hp('25') }]}
                           >
                            <Text style={[styles.txt_btn,]}>
                                { g.SEND}</Text>
                        </TouchableOpacity>

                </View>
            </View>
        );

    }
}
export default withNavigation(Contact);
