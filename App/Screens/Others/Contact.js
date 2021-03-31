import styles from './style';
import styleSignUp from '../SignupScreen/styleSignUp';
import React, { Component } from 'react';
import {
    Text, View, TextInput,
    TouchableOpacity, FlatList, Keyboard
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';

import { Get_supportTypes } from '../../Actions/get_Support_Types_Action';
import { contact_us } from '../../Actions/contactUS_action';

import { connect } from 'react-redux'
import HeaderNav from '../../Navigation/HeaderNav';
import Spinner from '../../Navigation/Spinner'

import Toast from 'react-native-easy-toast'
import ScrollPicker from "react-native-wheel-scrollview-picker";

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SupportTypesName: 'اختر نوع الدعم',
            SupportTypesID: 0,
            ShowTypes: false,
            message: '',
            SupportTypesArray: []

        };
    }
    async componentDidMount() {
        await this.props.Get_supportTypes()
        this.setState({
            // SupportTypesName: this.props.supportTypes[0].supportCaseTypeNameAR,
            // SupportTypesID: this.props.supportTypes[0].id,
        })
        this.props.supportTypes.map(item => {
            this.state.SupportTypesArray.push(item.supportCaseTypeNameAR)
        })
        console.log(JSON.stringify(this.state.SupportTypesArray));
    }

    async send() {
        Keyboard.dismiss()
        await this.props.contact_us(this.state.SupportTypesID, this.state.message)
        this.toast.show(this.props.contactResponse.message, 10000);
    }
    render() {
        return (
            <View>
                <HeaderNav title={g.CONTACT} />

                <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                    {/***SupportTypes***/}
                    <View>
                        <Text style={[styles.txt, { marginTop: hp('2%'), color: g.Gray }]}>
                            {g.SupportTypes}
                        </Text>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => {
                                this.setState({
                                    ShowTypes: !this.state.ShowTypes
                                })
                            }}>
                            <View style={styleSignUp.dropDownView}>
                                <Text style={styleSignUp.dropDownTxt}>{this.state.SupportTypesName}</Text>
                                <Icon name={this.state.ShowTypes ? "arrow-drop-up" : "arrow-drop-down"} type="MaterialIcons"
                                    style={styleSignUp.dropDownIcon}

                                />
                            </View>
                        </TouchableOpacity>
                    </View>

                    {this.state.ShowTypes ?
                        <View style={{ height: 150 }}>
                            <ScrollPicker
                                dataSource={this.state.SupportTypesArray}
                                selectedIndex={this.state.SupportTypesID}
                                itemHeight={40}
                                wrapperHeight={150}
                                highlightColor={g.Light_Gray}
                                onValueChange={async (data, selectedIndex) => {
                                    this.setState({
                                        SupportTypesName: data,
                                        SupportTypesID: this.props.supportTypes[selectedIndex].id,
                                        //      ShowTypes: false
                                    })
                                }}
                            />
                        </View>
                        : null}


                    <View>
                        <Text style={[styles.txt, { marginTop: hp('2%'), color: g.Gray }]}>
                            {g.MESSAGE}
                        </Text>

                        <View style={[styles.viewInput, { height: hp('12') }]}>

                            <TextInput
                                multiline
                                placeholder={g.WRITE_HERE}
                                onChangeText={(message) => {
                                    this.setState({
                                        message: message,
                                    })

                                }}

                                placeholderTextColor={g.Light_Gray}
                                style={[styles.input, { textAlignVertical: 'top' }]} />
                        </View>
                    </View>


                    <TouchableOpacity style={[styles.btn, {
                        backgroundColor: this.state.SupportTypesID == 0 || this.state.message == '' ? g.Light_Gray : g.Bold_blue,
                        marginTop: hp('5')
                    }]}
                        onPress={() => { this.send() }}
                        disabled={this.state.SupportTypesID == 0 || this.state.message == '' ? true : false}
                    >
                        <Text style={[styles.txt_btn]}>
                            {g.SEND}</Text>
                    </TouchableOpacity>

                </View>
                {this.props.loading ?
                    <View style={{ marginTop: '5%' }}>
                        <Spinner />
                    </View>
                    : null}
                <Toast
                    ref={(toast) => this.toast = toast}
                    style={{ backgroundColor: g.toast }}
                    positionValue={g.windowHeight/2-100}
                    fadeInDuration={120}
                    fadeOutDuration={1000}
                    textStyle={{ color: '#000', fontFamily: g.Regular,fontSize: 16, }}
                />

            </View>
        );

    }
}
const mapStateToProps = state => {
    return {
        supportTypes: state.supportTypes.supportTypes,

        loading: state.contactResponse.loading,
        contactResponse: state.contactResponse.contactResponse,


    }
}
export default connect(mapStateToProps, { Get_supportTypes, contact_us })(withNavigation(Contact));
