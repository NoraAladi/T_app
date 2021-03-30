import styles from '../LoginScreen/style';
import React, { Component } from 'react';
import {
    Text, View, ScrollView, TextInput,
    TouchableOpacity, Platform, KeyboardAvoidingView
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import styleSignUp from '../SignupScreen/styleSignUp';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import { FlatList } from 'react-native-gesture-handler';
import { ArabicNumbers } from 'react-native-arabic-numbers';
import RadioForm from 'react-native-simple-radio-button';
import HeaderNav from '../../Navigation/HeaderNav';

import { connect } from 'react-redux'
import Spinner from '../../Navigation/Spinner'
import { Get_USER_DATA } from '../../Actions/_get_user_data';
import { Get_City } from '../../Actions/getCityAction';
import { Get_Country } from '../../Actions/getCountryAction';
import { Edit_UserData } from '../../Actions/EditUserData';

import Toast, { DURATION } from 'react-native-easy-toast'
import DatePicker from 'react-native-date-picker'
import ScrollPicker from "react-native-wheel-scrollview-picker";

import AsyncStorage from '@react-native-community/async-storage';



const Jobs = [
    "طبيب",
    "محاسب",
    "مهندس",
    "مبرمج",
    "اخرى",

];
const countries = ['القاهرة',
    'الاسكندرية',
    'الجيزة',
    'حلوان',
    'السويس'
]
const region = ['السلام',
    'مدينة نصر',
    'الهرم',
    'مصر الجديدة',
    'السيدة عائشة',
    'المهندسين'

]

const sex = [g.MALE, g.FAMLE]

var months = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
var monthsEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var days = ["اﻷحد", "اﻷثنين", "الثلاثاء", "اﻷربعاء", "الخميس", "الجمعة", "السبت"];

var radio_props = [
    { label: g.INSIDE, value: 9 },
    { label: g.OUTSIDE, value: 8 }
];



class EditUserData extends Component {
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
            sexID: 0,
            dateInAr: this.arabicDate(moment().format('DD MMMM YYYY')),
            Jobname: Jobs[0],
            showJobs: false,
            country: countries[0],
            showCountry: false,
            region: region[0],
            showRegion: false,
            countryID: 0,
            regionID: 0,
            realDate: '',
            countryNameArray: [],
            cityNameArray: [],
         

        };
    }


    async componentDidMount() {
        if (this.props.navigation.getParam('id')) {
            await this.props.Get_USER_DATA(this.props.navigation.getParam('id'))
        }
        else {
            const ID = await AsyncStorage.getItem('LOGIN_ID')
            await this.props.Get_USER_DATA(ID)
        }
        AsyncStorage.getItem('userAddress').then(val => {
            this.setState({ address: val })
        })

        await this.setState({
            fullName: this.props.user_d.fullNameAr,
            email: this.props.user_d.email,
            mobile: this.props.user_d.mobileNumber,

            realDate: this.props.user_d.dateofBirth.split('T')[0],
            dateInAr: this.arabicDate(moment(this.props.user_d.dateofBirth.split('T')[0]).format('DD MMMM YYYY')),
            Jobname: this.props.user_d.profession,
            country: this.props.user_d.location.city.governate.nameAr,
            region: this.props.user_d.location.city.cityNameAr,
            countryID: this.props.user_d.location.city.governate.id,

            regionID: this.props.user_d.location.city.id,
            sexID: this.props.user_d.gender,
            sex: this.props.user_d.gender == 1 ? g.MALE : g.FAMLE
        })
        await this.props.Get_Country()
        await this.props.Get_City(this.state.countryID)

        this.props.countries.map(item => {
            this.state.countryNameArray.push(item.nameAr)
        })

        this.props.cities.map(item => {
            this.state.cityNameArray.push(item.cityNameAr)

        })

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

    render() {
        return (
            <View>
                <HeaderNav title={g.EDIT_PROFILE} />
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : 'position'}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 64 : -(g.windowHeight)}>

                    {
                        this.props.loading ?
                            <View style={{ marginTop: hp('35%') }} >
                                <Spinner />
                            </View>

                            :

                            <ScrollView
                                style={{ height: Platform.OS == "android" ? '92%' : '85%' }}
                                showsVerticalScrollIndicator={false}
                            >



                                {/**full name */}
                                <View>
                                    <Text style={[styles.username, { marginTop: hp('2%') }]}>
                                        {g.FULL_NAME}
                                    </Text>

                                    <View style={[styles.viewInput]}>

                                        <TextInput
                                            defaultValue={this.state.fullName}
                                            placeholder={this.state.fullName}
                                            keyboardType={'default'}
                                            onChangeText={(fullName) => {
                                                this.setState({
                                                    fullName: fullName,
                                                })

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
                                            defaultValue={this.state.email}
                                            placeholder={this.state.email}
                                            keyboardType={'email-address'}
                                            onChangeText={(email) => {
                                                this.setState({
                                                    email: email,
                                                })

                                            }}

                                            placeholderTextColor={g.Light_Gray}
                                            style={[styles.input]} />
                                    </View>
                                </View>

                                {/**Date */}
                                <View>
                                    <Text style={[styles.username, { marginTop: hp('2%') }]}>
                                        {g.DATE}
                                    </Text>
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        onPress={() => {
                                            this.setState({
                                                showClender: !this.state.showClender
                                            })
                                        }}>
                                        <View style={styleSignUp.dropDownView}>
                                            <Text style={styleSignUp.dropDownTxt}>{this.state.dateInAr}</Text>
                                            <Icon name={this.state.showClender ? "arrow-drop-up" : "arrow-drop-down"} type="MaterialIcons"
                                                style={styleSignUp.dropDownIcon}

                                            />
                                        </View>
                                    </TouchableOpacity>
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

                                                this.setState({
                                                    dateInAr: this.arabicDate(dateFormat2),
                                                    //showClender: false,
                                                    realDate: dateFormat
                                                })
                                                //   
                                            }}
                                        />
                                    </View>
                                    : null}

                                {/**sex */}
                                <View>
                                    <Text style={[styles.username, { marginTop: hp('2%') }]}>
                                        {g.SEX}
                                    </Text>
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        onPress={() => {
                                            this.setState({
                                                showSex: !this.state.showSex
                                            })
                                        }}>


                                        <View style={styleSignUp.dropDownView}>
                                            <Text style={styleSignUp.dropDownTxt}>{this.state.sex}</Text>
                                            <Icon name={this.state.showSex ? "arrow-drop-up" : "arrow-drop-down"} type="MaterialIcons"
                                                style={styleSignUp.dropDownIcon}

                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                {this.state.showSex ?
                                    <ScrollPicker
                                        style={{ backgroundColor: 'red', }}
                                        ref={(sp) => { this.sp = sp }}
                                        dataSource={sex}
                                        selectedIndex={1 - 3}
                                        itemHeight={40}
                                        wrapperHeight={100}
                                        highlightColor={g.Light_Gray}
                                        onValueChange={async (data, selectedIndex) => {
                                            this.setState({
                                                sexID: selectedIndex == 0 ? 1 : 0,
                                                sex: data,
                                                //   showSex: false
                                            })

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
                                            onChangeText={(mobile) => {
                                                this.setState({
                                                    mobile: mobile,
                                                })

                                            }}
                                            defaultValue={this.state.mobile}
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
                                                this.setState({
                                                    JobType: radio_props[value].label,
                                                })
                                            }}
                                        />
                                    </View>
                                </View>


                                {/*****job country*/}
                                <View>
                                    <Text style={[styles.username, { marginTop: hp('2%') }]}>
                                        {g.COUNTRY}
                                    </Text>
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        onPress={() => {
                                            this.setState({
                                                showCountry: !this.state.showCountry
                                            })
                                        }}>

                                        <View style={styleSignUp.dropDownView}>
                                            <Text style={styleSignUp.dropDownTxt}>{this.state.country}</Text>
                                            <Icon name={this.state.showCountry ? "arrow-drop-up" : "arrow-drop-down"} type="MaterialIcons"
                                                style={styleSignUp.dropDownIcon}

                                            />
                                        </View>
                                    </TouchableOpacity>

                                </View>

                                {this.state.showCountry ?
                                    <ScrollPicker
                                        ref={(sp) => { this.sp = sp }}
                                        dataSource={this.state.countryNameArray}
                                        selectedIndex={this.state.countryID == 0 ? -1 : this.state.countryID - 1}
                                        itemHeight={40}
                                        wrapperHeight={100}
                                        highlightColor={g.Light_Gray}
                                        onValueChange={async (data, selectedIndex) => {

                                            this.setState({
                                                countryID: this.props.countries[selectedIndex].id,
                                                country: data,
                                            })
                                            await this.props.Get_City(this.props.countries[selectedIndex].id)
                                            this.setState({
                                                region: this.props.cities[0].cityNameAr,
                                                cityNameArray: [],
                                                regionID: this.props.cities[0].id
                                            })
                                            this.props.cities.map(item => {
                                                this.state.cityNameArray.push(item.cityNameAr)
                                            })


                                        }}
                                    />

                                    : null}

                                {/*****region*/}
                                <View>
                                    <Text style={[styles.username, { marginTop: hp('2%') }]}>
                                        {g.REGION}
                                    </Text>
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        onPress={() => {
                                            this.setState({
                                                showRegion: !this.state.showRegion
                                            })
                                        }}
                                    >

                                        <View style={styleSignUp.dropDownView}>
                                            <Text style={styleSignUp.dropDownTxt}>{this.state.region}</Text>
                                            <Icon name={this.state.showRegion ? "arrow-drop-up" : "arrow-drop-down"} type="MaterialIcons"
                                                style={styleSignUp.dropDownIcon}

                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                {this.state.showRegion ?
                                    <ScrollPicker
                                        ref={(sp) => { this.sp = sp }}
                                        dataSource={this.state.cityNameArray}
                                        selectedIndex={1 - 2}
                                        itemHeight={40}
                                        wrapperHeight={100}
                                        highlightColor={g.Light_Gray}
                                        onValueChange={async (data, selectedIndex) => {
                                            this.setState({
                                                regionID: this.props.cities[selectedIndex].id,
                                                region: data,
                                            })

                                        }}
                                    />

                                    : null}



                                {/**address */}
                                <View>
                                    <Text style={[styles.username, { marginTop: hp('2%') }]}>
                                        {g.ADDRESS}
                                    </Text>

                                    <View style={[styles.viewInput]}>

                                        <TextInput
                                            defaultValue={this.state.address}
                                            placeholder={this.state.address}
                                            keyboardType={'default'}
                                            onChangeText={(address) => {
                                                this.setState({
                                                    address: address,
                                                })
                                            }}

                                            placeholderTextColor={g.Light_Gray}
                                            style={[styles.input]} />
                                    </View>
                                </View>
                                <TouchableOpacity style={[styles.btn, { marginTop: hp('10') }]}
                                    onPress={async () => {
                                        await this.props.Edit_UserData(
                                            this.state.fullName,
                                            this.state.realDate,
                                            this.state.sexID,
                                            this.state.mobile,
                                            this.state.Jobname,
                                            //jobFieldId
                                            8,
                                            this.state.regionID,
                                            this.state.address,
                                            this.state.email,
                                        )
                                        if (this.props.status == 200) {
                                            AsyncStorage.setItem('userAddress', String(this.state.address))
                                            this.toast.show('تم تعديل البيانات الشخصية بنجاح', 4000);
                                        }
                                        else {
                                            this.toast.show('يجب إختيار المنطقة التابع لها ', 4000);

                                        }

                                    }}
                                >
                                    <Text style={[styles.txt_btn,]}>
                                        {g.SAVE}</Text>
                                </TouchableOpacity>


                            </ScrollView>

                    }
                </KeyboardAvoidingView>
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
        loading: state.user_data.loading,
        user_d: state.user_data.user_d,
        countries: state.countries.countries,
        cities: state.cities.cities,

        status: state.editStatusUserData.status,
        Edit_loading: state.editStatusUserData.Edit_loading,


    }
}
export default connect(mapStateToProps, { Get_USER_DATA, Get_Country, Get_City, Edit_UserData })(withNavigation(EditUserData));

