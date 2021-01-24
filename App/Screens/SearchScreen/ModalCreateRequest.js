import style from './style';

import React, { Component } from 'react';
import {
    Text, View, ScrollView, TextInput,
    TouchableOpacity, Platform, ImageBackground,
    I18nManager, Modal, KeyboardAvoidingView, FlatList, Dimensions, Image, _View
} from 'react-native';
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import AsyncStorage from '@react-native-community/async-storage';
import {

    UIActivityIndicator,
} from 'react-native-indicators';
import CheckBox from 'react-native-check-box'

export default class ModalCreateRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
            isChecked: false
        };
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView nestedScrollEnabled>
                    <TouchableOpacity activeOpacity={1} >
                        <ScrollView   >
                            <Text style={[style.username1, { marginTop: hp('2%') }]}>
                                {g.NAME_TYPE}
                            </Text>
                            <View style={style.viewInput}>
                                <Text
                                    numberOfLines={1}
                                    style={style.input1}>OxyContin: 500 MG FILM COATED TABLET, 500 MG</Text>
                            </View>

                            <View style={{
                                flexDirection: 'row-reverse',
                            }} >
                                <Text style={[style.username1, { marginTop: hp('2.5%') }]}>
                                    {g.QUANTITY}
                                </Text>
                                {/**Box counter */}
                                <View style={{ padding: 10, }}>
                                    <View style={{
                                        flexDirection: 'row-reverse',
                                        width: 135, height: 45,
                                        borderRadius: 5, borderWidth: 1,
                                        borderColor: g.Blue,
                                        justifyContent: 'space-around',
                                    }} >

                                        {/**minues */}

                                        <View style={{
                                            alignItems: 'center', justifyContent: 'center',
                                            borderLeftColor: g.Blue, borderLeftWidth: 1, width: 45
                                        }} >
                                            <TouchableOpacity onPress={() => {
                                                if (this.state.quantity != 1) {
                                                    this.setState({
                                                        quantity: this.state.quantity - 1
                                                    })
                                                }

                                            }}>
                                                <Icon name='minus' type='AntDesign'
                                                    style={{ fontSize: 20, color: g.Blue }} />
                                            </TouchableOpacity>
                                        </View>

                                        {/**value */}
                                        <View style={{
                                            alignItems: 'center', justifyContent: 'center',
                                            width: 45
                                        }} >
                                            <Text style={{ fontSize: 18 }}>
                                                {this.state.quantity}
                                            </Text>
                                        </View>

                                        {/**plus */}
                                        <View style={{
                                            alignItems: 'center', justifyContent: 'center',
                                            borderRightColor: g.Blue, borderRightWidth: 1, width: 45
                                        }} >
                                            <TouchableOpacity onPress={() => {
                                                this.setState({
                                                    quantity: this.state.quantity + 1
                                                })
                                            }}>
                                                <Icon name='plus' type='AntDesign'
                                                    style={{ fontSize: 20, color: g.Blue }} />
                                            </TouchableOpacity>
                                        </View>


                                    </View>
                                </View>
                            </View>

                            <Text style={[style.username1, style.add, { fontFamily: g.Bold }]}>
                                {g.ADD}
                            </Text>

                            <View />

                            <View style={{ padding: 30, }}>
                                <CheckBox
                                    onClick={() => {
                                        this.setState({
                                            isChecked: !this.state.isChecked
                                        })
                                    }}
                                    isChecked={this.state.isChecked}
                                    checkBoxColor={g.Light_Gray}
                                    checkedCheckBoxColor={g.Light_Gray}
                                    leftText={g.CHECK_BOX_TEXT}
                                    leftTextStyle={[style.input1, { textAlign: 'right', marginTop: -5 }]}
                                />
                            </View>
                            <Text style={[style.username1, { marginTop: hp('2%') }]}>
                                {g.NOTES}
                            </Text>

                            <View style={style.view5}>
                                <TextInput
                                    placeholder={g.WRITE_HERE}
                                    placeholderTextColor={g.Light_Gray}
                                    style={style.input} />
                            </View>

                            <TouchableOpacity style={style.btn} onPress={() => {
                               

                            }}>
                                <Text style={style.txt_btn}>{g.SEND_REQUEST}</Text>
                            </TouchableOpacity>
                        </ScrollView>



                        <View style={{ height: 50 }}></View>
                    </TouchableOpacity>
                </ScrollView>
            </View>

        );
    }
}
