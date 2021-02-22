import styles from '../LoginScreen/style';
import React, { Component } from 'react';
import {
    Text, View, TextInput,
    TouchableOpacity, Platform,
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


import { connect } from 'react-redux'
import { Get_City } from '../../Actions/getCityAction';
import { Get_Country } from '../../Actions/getCountryAction';
import CheckBox from 'react-native-check-box'

const Jobs = [
    "طبيب",
    "محاسب",
    "مهندس",
    "مبرمج",
    "اخرى",
];


const sex = [{ name: g.MALE, id: 1 }, { name: g.FAMLE, id: 2 }]
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
            Jobname: Jobs[0],
            showJobs: false,

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
            isChecked: false
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
        await AsyncStorage.setItem('Jobname', this.state.Jobname)
        await AsyncStorage.setItem('region', String(this.state.regionId))
        await AsyncStorage.setItem('address', this.state.address)
        await AsyncStorage.setItem('isChecked', String(this.state.isChecked))





    }
    async componentDidMount() {
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
                            }}
                            placeholderTextColor={g.Light_Gray}
                            style={[styles.input]} />
                    </View>
                </View>

                {/**email */}
                <View>
                    <Text style={[styles.username, { marginTop: hp('2%') }]}>
                        {g.EMAIL}
                    </Text>

                    <View style={[styles.viewInput]}>

                        <TextInput
                            placeholder={g.EMAIL}
                            keyboardType={'email-address'}
                            onChangeText={(email) => {
                                this.setState({
                                    email: email,
                                })

                            }}
                            onEndEditing={async () => {
                                await AsyncStorage.setItem('email', this.state.email)
                            }}
                            placeholderTextColor={g.Light_Gray}
                            style={[styles.input]} />
                    </View>
                </View>

                {/**pass */}
                <View>

                    <Text style={[styles.username, { marginTop: hp('2%') }]}>
                        {g.PASSWORD}
                    </Text>

                    <View style={[styles.viewInput, { flexDirection: 'row' }]}>

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

                                await this.setState({
                                    password: password,
                                    show: true
                                })
                                await AsyncStorage.setItem('password', this.state.password)
                            }}
                            placeholderTextColor={g.Light_Gray}
                            style={[styles.input, { width: wp('65%') }]} />
                    </View>



                    {/***confirm pass */}
                    <Text style={[styles.username, { marginTop: hp('2%') }]}>
                        {g.CONFIRM_PASS}
                    </Text>

                    <View style={[styles.viewInput, { flexDirection: 'row' }]}>

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

                                await this.setState({
                                    confirmPassword: confirmPassword,
                                    showConfirm: true
                                })
                                await AsyncStorage.setItem('confirmPassword', this.state.confirmPassword)

                            }}
                            placeholderTextColor={g.Light_Gray}
                            style={[styles.input, { width: wp('65%') }]} />
                    </View>
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
                    <View style={{ marginTop: 10, }}>
                        <CalendarPicker
                            months={months}
                            weekdays={days}
                            previousTitle={'السابق'}
                            nextTitle={'التالي'}
                            selectMonthTitle={'الشهر'}
                            selectYearTitle={'السنة'}
                            textStyle={{
                                fontFamily: g.Regular
                            }}
                            previousTitleStyle={{
                                fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null,
                            }}
                            nextTitleStyle={{
                                fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null,
                            }}

                            onDateChange={async (date) => {
                                var date = new Date(date)
                                var dateFormat = moment(date).format('YYYY-MM-DD')
                                var dateFormat2 = moment(date).format('DD MMMM YYYY')
                                await AsyncStorage.setItem('date', dateFormat)

                                this.setState({
                                    dateInAr: this.arabicDate(dateFormat2),
                                    showClender: false
                                })
                                //   
                            }}
                            selectedDayColor={g.Blue}
                            height={300}
                            width={g.windowWidth - 85}
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
                            <View style={[styleSignUp.dropDownView, {
                                marginTop: -15,
                                borderBottomLeftRadius: 10,
                                borderBottomRightRadius: 10,
                                height: 80
                            }]}>
                                <FlatList
                                    style={{ height: 65, padding: 10, }}
                                    data={sex}
                                    renderItem={({ item, index }) => (
                                        <View >
                                            <TouchableOpacity onPress={async () => {
                                                this.setState({
                                                    sex: item.name,
                                                    gender: item.id,
                                                    showSex: false
                                                })
                                                await AsyncStorage.setItem('sex', String(item.id))
                                            }}>
                                                <Text style={[styleSignUp.dropDownTxt, {
                                                    fontSize: 12,
                                                }]}>{item.name}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                />
                            </View>
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
                                    onChangeText={(mobile) => {
                                        this.setState({
                                            mobile: mobile,
                                        })

                                    }}
                                    onEndEditing={async () => {
                                        await AsyncStorage.setItem('mobile', this.state.mobile)
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

                        {/*****job name*/}
                        <View>
                            <Text style={[styles.username, { marginTop: hp('2%') }]}>
                                {g.JOP}
                            </Text>
                            <View style={styleSignUp.dropDownView}>
                                <Text style={styleSignUp.dropDownTxt}>{this.state.Jobname}</Text>
                                <Icon name={this.state.showJobs ? "arrow-drop-up" : "arrow-drop-down"} type="MaterialIcons"
                                    style={styleSignUp.dropDownIcon}
                                    onPress={() => {
                                        this.setState({
                                            showJobs: !this.state.showJobs
                                        })
                                    }}
                                />
                            </View>
                        </View>

                        {this.state.showJobs ?
                            <View style={[styleSignUp.dropDownView, {
                                marginTop: -15,
                                borderBottomLeftRadius: 10,
                                borderBottomRightRadius: 10,
                                height: 120
                            }]}>
                                <FlatList
                                    //    showsVerticalScrollIndicator={false}
                                    ListFooterComponent={() => <Text>{ }</Text>}

                                    style={{ padding: 10, }}
                                    data={Jobs}
                                    renderItem={({ item, index }) => (
                                        <View >
                                            <TouchableOpacity onPress={async () => {
                                                this.setState({
                                                    Jobname: item,
                                                    showJobs: false
                                                })
                                                await AsyncStorage.setItem('Jobname', item)
                                            }}>
                                                <Text style={[styleSignUp.dropDownTxt, {
                                                    fontSize: 12,
                                                    //    color: g.Light_Gray,
                                                    textAlign: 'right'
                                                }]}>{item}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                />
                            </View>
                            : null}


                        {/*****job name*/}
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
                    <TouchableOpacity style={[styles.btn, { marginTop: hp('3') }]}
                        disabled={this.state.loader}
                        onPress={async () => {
                            this.props.navigation.navigate('ThankUScreen')
                        }}>
                        <Text style={[styles.txt_btn,]}>
                            {g.COMPLETE_PROFILE}</Text>
                    </TouchableOpacity>
                    : null
                }
            </View>
        );
    }
}
const mapStateToProps = state => {
    return {

        countries: state.countries.countries,
        cities: state.cities.cities,
    }
}
export default connect(mapStateToProps, { Get_Country, Get_City })(withNavigation(UserData));

