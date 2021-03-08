import styles from '../LoginScreen/style';
import React, { Component } from 'react';
import {
    Text, View, TextInput,
    TouchableOpacity, Platform, ScrollView,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import AsyncStorage from '@react-native-community/async-storage';
import styleSignUp from './styleSignUp';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import { FlatList } from 'react-native-gesture-handler';
import { ArabicNumbers } from 'react-native-arabic-numbers';
import RadioForm from 'react-native-simple-radio-button';
import Spinner from '../../Navigation/Spinner'


import { connect } from 'react-redux'
import { Get_City } from '../../Actions/getCityAction';
import { Get_Country } from '../../Actions/getCountryAction';
import { Get_MicroInfo } from '../../Actions/get_MicroInfo_Action';
import { Put_MicroInfo } from '../../Actions/Put_MicroInfo_Action';

import Toast from 'react-native-easy-toast'
import CheckBox from 'react-native-check-box'

import DatePicker from 'react-native-date-picker'

import { Picker } from 'react-native-wheel-pick';
import ScrollPicker from "react-native-wheel-scrollview-picker";


const sex = [g.MALE, g.FAMLE]
var months = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
var monthsEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var days = ["اﻷحد", "اﻷثنين", "الثلاثاء", "اﻷربعاء", "الخميس", "الجمعة", "السبت"];


var radio_props = [
    { label: g.INSIDE, value: 0 },
    { label: g.OUTSIDE, value: 1 }
];


class UserData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            fullName: '',
            email: '',
            mobile: '',
            address: '',
            showClender: false,

            showSex: false,
            sex: g.MALE,
            gender: 1,

            dateInAr: this.arabicDate(moment().format('DD MMMM YYYY')),
            realDate: moment().format('YYYY-MM-DD'),

            country: '',
            countryID: 1,
            showCountry: false,

            region: '',
            regionId: 1,
            showRegion: false,


            show: true,
            showConfirm: true,
            password: '',
            confirmPassword: '',
            isChecked: false,

            emailError: false,
            passError: false,
            confirmPassError: false,
        };
    }

    arabicDate(date) {
        for (let index = 0; index < monthsEn.length; index++) {
            if (date.includes(monthsEn[index])) {
                date = ArabicNumbers(date.replace(monthsEn[index], months[index]))
                return date;
            }
        }
        return date
    }
    async setDefault() {
        await AsyncStorage.setItem('fullName', this.state.fullName)
        await AsyncStorage.setItem('email', this.state.email)
        await AsyncStorage.setItem('password', this.state.password)
        await AsyncStorage.setItem('confirmPassword', this.state.confirmPassword)
        await AsyncStorage.setItem('date', String(moment().format('YYYY-MM-DD')))
        await AsyncStorage.setItem('sex', String(this.state.gender))
        await AsyncStorage.setItem('mobile', this.state.mobile)
        await AsyncStorage.setItem('job', String(9))
        await AsyncStorage.setItem('region', String(this.state.regionId))
        await AsyncStorage.setItem('address', this.state.address)
        await AsyncStorage.setItem('isChecked', String(this.state.isChecked))

    }
    async componentDidMount() {
        if (this.props.haveCode) {
            //  alert(this.props.patientCode)
            await this.props.Get_MicroInfo(this.props.patientCode)
            //alert(JSON.stringify(this.props.microInfo))
            await this.setState({
                fullName: this.props.microInfo.fullNameAr,
                email: this.props.microInfo.email,
                dateInAr: this.arabicDate(moment(this.props.microInfo.dateofBirth).format('DD MMMM YYYY')),
                realDate: moment(this.props.microInfo.dateofBirth).format('YYYY-MM-DD')
            })
        }
        else {
            await this.props.Get_Country()
            await this.props.Get_City(1)
            this.setState({
                country: this.props.countries[0].nameAr,
                countryID: this.props.countries[0].id,

                region: this.props.cities[0].cityNameAr,
                regionId: this.props.cities[0].id,
            })
            await this.setDefault()
        }
    }

    async _Put_MicroInfo() {
        await this.props.Put_MicroInfo(
            this.props.microInfo.id,
            this.state.fullName,
            this.state.fullName,
            this.state.email,
            this.state.realDate,
            this.state.password,
            this.state.confirmPassword,
        )
        if (this.props.status == 200) {
            this.toast.show('تم استكمال الملف الشخصي بنجاح', 10000);
            setTimeout(() => {
                this.props.navigation.navigate('ThankUScreen')
            }, 1000);
        }
        else {
            this.toast.show('يجب إدخال جميع البيانات صحيحة', 10000);
        }

    }

    validateEmail = (text) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            console.log("Email is Not Correct");
            this.setState({ emailError: true })
            return false;
        }
        else {
            console.log("Email is Correct");
            this.setState({
                emailError: false,
                email: text
            })

        }
    }

    validatePass = async (text) => {
        console.log(text);
        if (text.length < 6) {
            console.log("pass <6");
            this.setState({ passError: true })
        }
        else {
            console.log("pass done");
            await this.setState({
                passError: false,
                password: text
            })

        }
    }

    validateConfirmPass = async (text) => {
        console.log(text);
        if (text != this.state.password) {
            console.log("don't match");
            this.setState({ confirmPassError: true })

        }
        else {
            console.log("pass done");
            await this.setState({
                confirmPassError: false,
                confirmPassword: text
            })

        }
    }
    activeBtn() {
        if (
            this.state.fullName != '' &&
            this.state.email != '' &&
            this.state.password != '' &&
            this.state.confirmPassword != '' &&
            this.state.dateInAr != '' &&
            this.state.sex != '' &&
            this.state.mobile != '' &&
            this.state.country != '' &&
            this.state.region != '' &&
            this.state.address != ''
        ) {
            this.props.empty()
            if (this.state.emailError ||
                this.state.passError ||
                this.state.confirmPassError) {
            }
            else {
                this.props.activeBtn()

            }
        }
        else {
            this.props.deactiveBtn()
        }

    }
    render() {
        return (
            <View>


                <Text style={[styles.login, { marginTop: hp('2') }]}>
                    {g.USER_DATA}
                </Text>

                {/**full name */}
                <View>
                    <Text style={[styles.username, { marginTop: hp('2%') }]}>
                        {g.FULL_NAME}
                    </Text>

                    <View style={[styles.viewInput]}>

                        <TextInput
                            placeholder={g.FULL_NAME}
                            keyboardType={'default'}
                            onChangeText={(fullName) => {
                                this.setState({
                                    fullName: fullName,
                                })

                            }}
                            onEndEditing={async () => {
                                await AsyncStorage.setItem('fullName', this.state.fullName)
                                this.activeBtn()
                            }}
                            placeholderTextColor={g.Light_Gray}
                            style={[styles.input]}
                            defaultValue={this.state.fullName}

                        />
                    </View>

                </View>

                {/**email */}
                <View>
                    <Text style={[styles.username, { marginTop: hp('2%') }]}>
                        {g.EMAIL}
                    </Text>

                    <View style={[styles.viewInput, { borderColor: this.state.emailError ? 'red' : g.Light_Gray }]}>

                        <TextInput
                            placeholder={g.EMAIL}
                            keyboardType={'email-address'}
                            onChangeText={(email) => {
                                this.setState({ email: email })
                                this.validateEmail(email)
                            }}
                            onEndEditing={async () => {
                                await AsyncStorage.setItem('email', this.state.email)
                                this.activeBtn()


                            }}
                            placeholderTextColor={g.Light_Gray}
                            style={[styles.input]}
                            defaultValue={this.state.email}
                        />
                    </View>
                    {this.state.emailError ?
                        <Text style={styleSignUp.error}>
                            {'* يجب إدخال الايميل بشكل سليم'}
                        </Text>
                        : null}
                </View>

                {/**pass */}
                <View>

                    <Text style={[styles.username, { marginTop: hp('2%') }]}>
                        {g.PASSWORD}
                    </Text>

                    <View style={[styles.viewInput, {
                        flexDirection: 'row',
                        borderColor: this.state.passError ? 'red' : g.Light_Gray
                    }]}>

                        <Icon name="eye-off-sharp" type="Ionicons"

                            onPress={() => {
                                this.setState({
                                    show: !this.state.show
                                })
                            }}
                            style={[styles.show, { marginLeft: wp('5%'), color: this.state.show ? g.Light_Gray : g.Bold_blue }]} />
                        <TextInput
                            placeholder={g.PASSWORD}
                            secureTextEntry={this.state.show}
                            keyboardType={'web-search'}
                            onChangeText={async (password) => {
                                await this.validatePass(password)
                                await this.setState({
                                    password: password,
                                    show: true
                                })
                                await AsyncStorage.setItem('password', this.state.password)
                                this.activeBtn()

                            }}
                            placeholderTextColor={g.Light_Gray}
                            style={[styles.input, { width: wp('65%') }]} />
                    </View>
                    {this.state.passError ?
                        <Text style={styleSignUp.error}>
                            {'*كلمة المرور لا تقل عن 6 احرف '}
                        </Text>
                        : null}


                    {/***confirm pass */}
                    <Text style={[styles.username, { marginTop: hp('2%') }]}>
                        {g.CONFIRM_PASS}
                    </Text>

                    <View style={[styles.viewInput,
                    {
                        flexDirection: 'row',
                        borderColor: this.state.confirmPassError ? 'red' : g.Light_Gray
                    }]}>

                        <Icon name="eye-off-sharp" type="Ionicons"

                            onPress={() => {
                                this.setState({
                                    showConfirm: !this.state.showConfirm
                                })
                            }}
                            style={[styles.show, { marginLeft: wp('5%'), color: this.state.showConfirm ? g.Light_Gray : g.Bold_blue }]} />
                        <TextInput
                            placeholder={g.CONFIRM_PASS}
                            secureTextEntry={this.state.showConfirm}
                            onChangeText={async (confirmPassword) => {
                                await this.validateConfirmPass(confirmPassword)
                                await this.setState({
                                    confirmPassword: confirmPassword,
                                    showConfirm: true
                                })
                                await AsyncStorage.setItem('confirmPassword', this.state.confirmPassword)
                                this.activeBtn()

                            }}
                            placeholderTextColor={g.Light_Gray}
                            style={[styles.input, { width: wp('65%') }]} />
                    </View>
                    {this.state.confirmPassError ?
                        <Text style={styleSignUp.error}>
                            {'* كلمة المرور غير متطابقة'}
                        </Text>
                        : null}
                </View>

                {/**Date */}
                <View>
                    <Text style={[styles.username, { marginTop: hp('2%') }]}>
                        {g.DATE}
                    </Text>
                    <View style={styleSignUp.dropDownView}>
                        <Text style={styleSignUp.dropDownTxt}>{this.state.dateInAr}</Text>
                        <Icon name={this.state.showClender ? "arrow-drop-up" : "arrow-drop-down"} type="MaterialIcons"
                            style={styleSignUp.dropDownIcon}
                            onPress={() => {
                                this.setState({
                                    showClender: !this.state.showClender
                                })
                            }}
                        />
                    </View>
                </View>




                {this.state.showClender ?
                    <View style={{
                        marginTop: 10,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}>
                        <DatePicker
                            androidVariant='nativeAndroid'
                            // onDateChange={setDate}
                            date={new Date(moment().format('YYYY-MM-DD'))}
                            mode={'date'}
                            maximumDate={new Date(moment().format('YYYY-MM-DD'))}
                            onDateChange={async (date) => {
                                var date = new Date(date)
                                var dateFormat = moment(date).format('YYYY-MM-DD')
                                var dateFormat2 = moment(date).format('DD MMMM YYYY')
                                await AsyncStorage.setItem('date', dateFormat)

                                this.setState({
                                    dateInAr: this.arabicDate(dateFormat2),
                                    realDate: dateFormat,
                                })
                                //   
                            }}
                        />
                    </View>
                    : null}

                {!this.props.haveCode ?
                    <>
                        {/**sex */}
                        <View>
                            <Text style={[styles.username, { marginTop: hp('2%') }]}>
                                {g.SEX}
                            </Text>
                            <View style={styleSignUp.dropDownView}>
                                <Text style={styleSignUp.dropDownTxt}>{this.state.sex}</Text>
                                <Icon name={this.state.showSex ? "arrow-drop-up" : "arrow-drop-down"} type="MaterialIcons"
                                    style={styleSignUp.dropDownIcon}
                                    onPress={() => {
                                        this.setState({
                                            showSex: !this.state.showSex
                                        })
                                    }}
                                />
                            </View>
                        </View>


                        {this.state.showSex ?
                            
                                <ScrollPicker
                                    style={{backgroundColor: 'red',}}
                                    ref={(sp) => { this.sp = sp }}
                                    dataSource={sex}
                                    selectedIndex={0}
                                    itemHeight={40}
                                    wrapperHeight={100}
                                    highlightColor={g.Light_Gray}
                                    onValueChange={async (data, selectedIndex) => {
                                        this.setState({
                                            sex: data,
                                            gender: selectedIndex,
                                        })
                                        await AsyncStorage.setItem('sex', String(selectedIndex))
                                    }}
                                />
                            : null}


                        {/**mobile*/}
                        <View>
                            <Text style={[styles.username, { marginTop: hp('2%') }]}>
                                {g.MOBILE}
                            </Text>

                            <View style={[styles.viewInput]}>

                                <TextInput
                                    placeholder={g.MOBILE}
                                    keyboardType={'number-pad'}
                                    maxLength={11}
                                    onChangeText={(mobile) => {
                                        this.setState({
                                            mobile: mobile,
                                        })

                                    }}
                                    onEndEditing={async () => {
                                        await AsyncStorage.setItem('mobile', this.state.mobile)
                                        this.activeBtn()

                                    }}
                                    placeholderTextColor={g.Light_Gray}
                                    style={[styles.input]} />
                            </View>
                        </View>

                        {/*****job */}
                        <View>
                            <Text style={[styles.login, { marginTop: hp('2'), fontSize: 18, }]}>
                                {g.JOP}
                            </Text>

                            <View style={{
                                flexDirection: 'row',
                                transform: [{ rotate: '180deg' }],
                                paddingHorizontal: 40,
                                marginTop: 10,
                            }}>
                                <RadioForm
                                    radio_props={radio_props}
                                    initial={0}
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
                                        await this.setState({ JobType: value == 0 ? 9 : 8 })
                                        await AsyncStorage.setItem('job', String(this.state.JobType))
                                    }}
                                />
                            </View>
                        </View>





                        {/*****job country*/}
                        <View>
                            <Text style={[styles.username, { marginTop: hp('2%') }]}>
                                {g.COUNTRY}
                            </Text>
                            <View style={styleSignUp.dropDownView}>
                                <Text style={styleSignUp.dropDownTxt}>{this.state.country}</Text>
                                <Icon name={this.state.showCountry ? "arrow-drop-up" : "arrow-drop-down"} type="MaterialIcons"
                                    style={styleSignUp.dropDownIcon}
                                    onPress={() => {
                                        this.setState({
                                            showCountry: !this.state.showCountry
                                        })
                                    }}
                                />
                            </View>
                        </View>

                        {this.state.showCountry ?
                            <View style={[styleSignUp.dropDownView, {
                                marginTop: -15,
                                borderBottomLeftRadius: 10,
                                borderBottomRightRadius: 10,
                                height: 120
                            }]}>
                                <FlatList
                                    //showsVerticalScrollIndicator={false}
                                    ListFooterComponent={() => <Text>{ }</Text>}
                                    style={{ padding: 10, }}
                                    data={this.props.countries}
                                    renderItem={({ item, index }) => (
                                        <View >
                                            <TouchableOpacity onPress={async () => {
                                                this.setState({
                                                    country: item.nameAr,
                                                    showCountry: false
                                                })
                                                await AsyncStorage.setItem('country', String(item.id))
                                                await this.props.Get_City(item.id)
                                                await this.setState({
                                                    region: this.props.cities[0].cityNameAr,
                                                    regionId: this.props.cities[0].id
                                                })
                                                await AsyncStorage.setItem('region', String(this.state.regionId))

                                            }}>
                                                <Text style={[styleSignUp.dropDownTxt, {
                                                    fontSize: 12,
                                                    textAlign: 'right'
                                                }]}>{item.nameAr}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                />
                            </View>
                            : null}

                        {/*****region*/}
                        <View>
                            <Text style={[styles.username, { marginTop: hp('2%') }]}>
                                {g.REGION}
                            </Text>
                            <View style={styleSignUp.dropDownView}>
                                <Text style={styleSignUp.dropDownTxt}>{this.state.region}</Text>
                                <Icon name={this.state.showRegion ? "arrow-drop-up" : "arrow-drop-down"} type="MaterialIcons"
                                    style={styleSignUp.dropDownIcon}
                                    onPress={() => {
                                        this.setState({
                                            showRegion: !this.state.showRegion
                                        })
                                    }}
                                />
                            </View>
                        </View>

                        {this.state.showRegion ?
                            <View style={[styleSignUp.dropDownView, {
                                marginTop: -15,
                                borderBottomLeftRadius: 10,
                                borderBottomRightRadius: 10,
                                height: 120
                            }]}>
                                <FlatList
                                    // showsVerticalScrollIndicator={false}
                                    ListFooterComponent={() => <Text>{ }</Text>}

                                    style={{ padding: 10, }}
                                    data={this.props.cities}
                                    renderItem={({ item, index }) => (
                                        <View >
                                            <TouchableOpacity onPress={async () => {
                                                this.setState({
                                                    region: item.cityNameAr,

                                                    showRegion: false
                                                })
                                                await AsyncStorage.setItem('region', String(item.id))
                                            }}>
                                                <Text style={[styleSignUp.dropDownTxt, {
                                                    fontSize: 12,
                                                    //   color: g.Light_Gray,
                                                    textAlign: 'right'
                                                }]}>{item.cityNameAr}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                />
                            </View>
                            : null}



                        {/**address */}
                        <View>
                            <Text style={[styles.username, { marginTop: hp('2%') }]}>
                                {g.ADDRESS}
                            </Text>

                            <View style={[styles.viewInput]}>

                                <TextInput
                                    placeholder={g.ADDRESS}
                                    keyboardType={'default'}
                                    onChangeText={(address) => {
                                        this.setState({
                                            address: address,
                                        })
                                    }}
                                    onEndEditing={async () => {
                                        await AsyncStorage.setItem('address', this.state.address)
                                        this.activeBtn()

                                    }}
                                    placeholderTextColor={g.Light_Gray}
                                    style={[styles.input]} />
                            </View>
                        </View>

                        {/**Terms */}
                        <View style={{ padding: 30, }}>
                            <CheckBox
                                onClick={async () => {
                                    await this.setState({
                                        isChecked: !this.state.isChecked
                                    })
                                    await AsyncStorage.setItem('isChecked', String(this.state.isChecked))

                                }}
                                isChecked={this.state.isChecked}
                                checkBoxColor={g.Light_Gray}
                                checkedCheckBoxColor={g.Light_Gray}
                                leftText='اوافق على الشروط والاحكام'
                                leftTextStyle={[styles.input1, { textAlign: 'right', marginTop: -5 }]}
                            />
                        </View>
                    </>
                    : null}

                {this.props.haveCode ?

                    this.props.put_loading ?
                        <View style={{ marginTop: hp('3') }}>
                            <Spinner />
                        </View> :
                        <TouchableOpacity style={[styles.btn, { marginTop: hp('3') }]}
                            disabled={this.state.loader}
                            onPress={async () => {
                                this._Put_MicroInfo()
                            }}>
                            <Text style={[styles.txt_btn,]}>
                                {g.COMPLETE_PROFILE}</Text>
                        </TouchableOpacity>
                    : null
                }

                <Toast
                    ref={(toast) => this.toast = toast}
                    style={{ backgroundColor: '#000' }}
                    //    position='center'
                    positionValue={200}
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

        countries: state.countries.countries,
        cities: state.cities.cities,

        microInfo: state.microInfo.microInfo,


        microInfo_updated: state.microInfo_updated.microInfo_updated,
        put_loading: state.microInfo_updated.put_loading,
        status: state.microInfo_updated.status,

    }
}
export default connect(mapStateToProps, { Get_Country, Get_City, Get_MicroInfo, Put_MicroInfo })(withNavigation(UserData));

