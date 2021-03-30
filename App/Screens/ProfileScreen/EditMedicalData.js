import styles from '../LoginScreen/style';

import React, { Component } from 'react';
import {
    Text, View, TextInput,
    TouchableOpacity, ScrollView
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import styleSignUp from '../SignupScreen/styleSignUp';
import RadioForm from 'react-native-simple-radio-button';
import HeaderNav from '../../Navigation/HeaderNav';
import AsyncStorage from '@react-native-community/async-storage';

import Spinner from '../../Navigation/Spinner'
import { Get_USER_INFO } from '../../Actions/_get_userInfo';
import { Edit_MedicalData } from '../../Actions/EditMedicalData';
import { connect } from 'react-redux'

import Toast, { DURATION } from 'react-native-easy-toast'

var radio_props_one = [
    { label: g.YES, value: 0 },
    { label: g.NO, value: 1 }
];
var radio_props_two = [
    { label: g.YES, value: 0 },
    { label: g.NO, value: 1 }
];
var radio_props_three = [
    { label: g.YES, value: 0 },
    { label: g.NO, value: 1 }
];
var id = 0
class EditMedicalData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weight: 0,
            height: 0,

            smoking: radio_props_one[1].value,
            married: radio_props_two[1].value,
            pregnant: radio_props_three[1].value,
            breastFeeding: 1,

            healthProfile: {},

            loader: false,
            tabSelected_1: true,
            tabSelected_2: false,
            tabSelected_3: false,
            heightWithScroll: g.windowHeight,
            Diseases: [],
            selected: false,
            elevation: 2, loading: true,
        };
        AsyncStorage.getItem('genderLoginId').then(async (val) => {
            await this.setState({ gender: val })
        })
    }

    async componentDidMount() {
        id = await AsyncStorage.getItem('LOGIN_ID')
        await this.props.Get_USER_INFO()
        await this.setState({
            weight: this.props.user_i.weight,
            height: this.props.user_i.height,
            smoking: this.props.user_i.smoker ? 0 : 1,
            married: this.props.user_i.married ? 0 : 1,
            pregnant: this.props.user_i.healthProfile.pregnant ? 0 : 1,
            breastFeeding: this.props.user_i.healthProfile.breastFeeding ? 0 : 1,

            healthProfile: {
                id: parseInt(id),
                pregnant: this.props.user_i.healthProfile.pregnant,
                breastFeeding: this.props.user_i.healthProfile.breastFeeding,

            }
        })
        this.setState({
            loading: false
        })
    }



    render() {
        return (
            <View style={{ zIndex: -1 }}>
                <HeaderNav title={g.EDIT_MEDICAL} />


                {
                    this.state.loading ?
                        <View style={{ marginTop: hp('35%') }} >
                            <Spinner />
                        </View>

                        :
                        <ScrollView style={{ height: hp('85') }}>
                            <View>

                                {/**weight */}
                                <View>
                                    <Text style={[styles.username, { marginTop: hp('2%') }]}>
                                        {g.WEIGHT}
                                    </Text>

                                    <View style={[styles.viewInput]}>

                                        <TextInput
                                            defaultValue={this.state.weight}
                                            placeholder={this.state.weight + ' KG'}
                                            keyboardType={'number-pad'}
                                            onChangeText={(weight) => {
                                                this.setState({
                                                    weight: weight,
                                                })

                                            }}

                                            placeholderTextColor={g.Light_Gray}
                                            style={[styles.input]} />
                                    </View>
                                </View>

                                {/**height */}
                                <View>
                                    <Text style={[styles.username, { marginTop: hp('2%') }]}>
                                        {g.HEIGHT}
                                    </Text>

                                    <View style={[styles.viewInput]}>

                                        <TextInput
                                            defaultValue={this.state.height}
                                            placeholder={this.state.height + ' KG'}
                                            keyboardType={'number-pad'}
                                            onChangeText={(height) => {
                                                this.setState({
                                                    height: height,
                                                })

                                            }}
                                            onEndEditing={async () => {

                                            }}
                                            placeholderTextColor={g.Light_Gray}
                                            style={[styles.input]} />
                                    </View>
                                </View>



                                {/*****Smoking */}
                                <View>
                                    <Text style={[styles.login, { marginTop: hp('2'), fontSize: 18, }]}>
                                        {g.U_SMOKING}
                                    </Text>

                                    <View style={{
                                        flexDirection: 'row',
                                        transform: [{ rotate: '180deg' }],
                                        paddingHorizontal: 40,
                                        marginTop: 10,
                                    }}>
                                        <RadioForm
                                            radio_props={radio_props_one}
                                            initial={this.state.smoking}
                                            formHorizontal={true}
                                            labelHorizontal={true}
                                            buttonSize={11}
                                            labelStyle={[styleSignUp.dropDownTxt,
                                            {
                                                transform: [{
                                                    rotate: '180deg',
                                                }],
                                                paddingHorizontal: 10,


                                            }]}
                                            selectedButtonColor={'red'}
                                            buttonColor={'#000'}
                                            animation={false}
                                            onPress={async (value) => {
                                                this.setState({ smoking: value })
                                            }}
                                        />
                                    </View>
                                </View>

                                {/***Married */}
                                <View>
                                    <Text style={[styles.login, { marginTop: hp('2'), fontSize: 18, }]}>
                                        {g.U_MARRIED}
                                    </Text>

                                    <View style={{
                                        flexDirection: 'row',
                                        transform: [{ rotate: '180deg' }],
                                        paddingHorizontal: 40,
                                        marginTop: 10,
                                    }}>
                                        <RadioForm
                                            animation={true}

                                            radio_props={radio_props_two}
                                            initial={this.state.married}
                                            formHorizontal={true}
                                            labelHorizontal={true}
                                            buttonSize={11}
                                            labelStyle={[styleSignUp.dropDownTxt,
                                            {
                                                transform: [{
                                                    rotate: '180deg',
                                                }],
                                                paddingHorizontal: 10,

                                            }]}
                                            selectedButtonColor={'red'}
                                            buttonColor={'#000'}
                                            animation={false}
                                            onPress={async (value) => {
                                                this.setState({ married: value })
                                            }}
                                        />
                                    </View>
                                </View>
                                
                                {this.state.gender == 2 ?
                                    <View>
                                        <View>
                                            <Text style={[styles.login, { marginTop: hp('2'), fontSize: 18, }]}>
                                                {g.pregnant}
                                            </Text>

                                            <View style={{
                                                flexDirection: 'row',
                                                transform: [{ rotate: '180deg' }],
                                                paddingHorizontal: 40,
                                                marginTop: 10,
                                            }}>
                                                <RadioForm
                                                    radio_props={radio_props_three}
                                                    initial={this.state.pregnant}
                                                    formHorizontal={true}
                                                    labelHorizontal={true}
                                                    buttonSize={11}
                                                    labelStyle={[styleSignUp.dropDownTxt,
                                                    {
                                                        transform: [{
                                                            rotate: '180deg',
                                                        }],
                                                        paddingHorizontal: 10,


                                                    }]}
                                                    selectedButtonColor={'red'}
                                                    buttonColor={'#000'}
                                                    animation={false}
                                                    onPress={async (value) => {
                                                        await this.setState({
                                                            pregnant: value,
                                                            healthProfile: {
                                                                id: parseInt(id),
                                                                pregnant: value == 0 ? true : false,
                                                                breastFeeding: this.state.breastFeeding == 0 ? true : false,

                                                            }
                                                        })
                                                        //                                            alert(JSON.stringify(this.state.healthProfile))
                                                    }}
                                                />
                                            </View>
                                        </View>

                                        <View>
                                            <Text style={[styles.login, { marginTop: hp('2'), fontSize: 18, }]}>
                                                {'هل انت مرضع ؟'}
                                            </Text>

                                            <View style={{
                                                flexDirection: 'row',
                                                transform: [{ rotate: '180deg' }],
                                                paddingHorizontal: 40,
                                                marginTop: 10,
                                            }}>
                                                <RadioForm
                                                    radio_props={radio_props_three}
                                                    initial={this.state.breastFeeding}
                                                    formHorizontal={true}
                                                    labelHorizontal={true}
                                                    buttonSize={11}
                                                    labelStyle={[styleSignUp.dropDownTxt,
                                                    {
                                                        transform: [{
                                                            rotate: '180deg',
                                                        }],
                                                        paddingHorizontal: 10,


                                                    }]}
                                                    selectedButtonColor={'red'}
                                                    buttonColor={'#000'}
                                                    animation={false}
                                                    onPress={async (value) => {
                                                        await this.setState({
                                                            breastFeeding: value,
                                                            healthProfile: {
                                                                id: parseInt(id),
                                                                pregnant: this.state.pregnant == 0 ? true : false,
                                                                breastFeeding: value == 0 ? true : false,

                                                            }
                                                        })
                                                        //                                            alert(JSON.stringify(this.state.healthProfile))
                                                    }}
                                                />
                                            </View>
                                        </View>

                                    </View>

                                    : null}


                                <TouchableOpacity style={[styles.btn, { marginTop: hp('6') }]}
                                    onPress={async () => {
                                        await this.props.Edit_MedicalData(
                                            this.state.height,
                                            this.state.weight,
                                            this.state.married == 0 ? true : false,
                                            this.state.smoking == 0 ? true : false,
                                            this.state.healthProfile,

                                        )
                                        if (this.props.status == 200) {
                                            this.toast.show('تم تعديل البيانات الطبية بنجاح', 5000);
                                        }
                                        else {
                                            this.toast.show('البيانات غير صحيحة ', 5000);

                                        }

                                    }}
                                >
                                    <Text style={[styles.txt_btn,]}>
                                        {g.SAVE}</Text>
                                </TouchableOpacity>

                            </View>
                        </ScrollView>
                }
                <Toast
                    ref={(toast) => this.toast = toast}
                    style={{ backgroundColor: '#000' }}
                    position='center'
                    fadeInDuration={120}
                    fadeOutDuration={1000}
                    textStyle={{ color: 'white', fontFamily: g.Regular }}
                />

            </View>
        );

    }
}

const mapStateToProps = state => {
    return {
        loading: state.user_info.loading,
        user_i: state.user_info.user_i,
        status: state.editMedicalData.status
    }
}
export default connect(mapStateToProps, { Get_USER_INFO, Edit_MedicalData })(withNavigation(EditMedicalData));

