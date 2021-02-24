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

const sex = [{
    'id': 1,
    'type': g.MALE
}, {
    'id': 0,
    'type': g.FAMLE
}]
var months = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
var monthsEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var days = ["اﻷحد", "اﻷثنين", "الثلاثاء", "اﻷربعاء", "الخميس", "الجمعة", "السبت"];

var radio_props = [
    { label: g.INSIDE, value: 0 },
    { label: g.OUTSIDE, value: 1 }
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
            realDate: ''

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


        this.setState({
            fullName: this.props.user_d.fullNameAr,
            email: this.props.user_d.email,
            mobile: this.props.user_d.mobileNumber,
            address: this.props.user_d.location.city.cityNameAr,
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
        await this.props.Get_City(1)



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

                                                this.setState({
                                                    dateInAr: this.arabicDate(dateFormat2),
                                                    showClender: false,
                                                    realDate: dateFormat
                                                })
                                                //   
                                            }}
                                            selectedDayColor={g.Blue}
                                            height={300}
                                            width={g.windowWidth - 85}
                                        />
                                    </View>
                                    : null}

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
                                                            sexID: item.id,
                                                            sex: item.type,
                                                            showSex: false
                                                        })
                                                    }}>
                                                        <Text style={[styleSignUp.dropDownTxt, {
                                                            fontSize: 12,
                                                            //     color: g.Light_Gray,
                                                        }]}>{item.type}</Text>
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
                                                this.setState({ JobType: radio_props[value].label })
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
                                            // showsVerticalScrollIndicator={false}
                                            style={{ padding: 10, }}
                                            ListFooterComponent={() => <Text>{ }</Text>}
                                            data={Jobs}
                                            renderItem={({ item, index }) => (
                                                <View >
                                                    <TouchableOpacity onPress={async () => {
                                                        this.setState({
                                                            Jobname: item,
                                                            showJobs: false
                                                        })
                                                    }}>
                                                        <Text style={[styleSignUp.dropDownTxt, {
                                                            fontSize: 12,
                                                            //  color: g.Light_Gray,
                                                            textAlign: 'right'
                                                        }]}>{item}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )}
                                        />
                                    </View>
                                    : null}


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
                                            ListFooterComponent={() => <Text>{ }</Text>}
                                            style={{ padding: 10, }}
                                            data={this.props.countries}
                                            renderItem={({ item, index }) => (
                                                <View >
                                                    <TouchableOpacity onPress={async () => {
                                                        this.setState({
                                                            countryID: item.id,
                                                            country: item.nameAr,
                                                            showCountry: false
                                                        })
                                                        await this.props.Get_City(item.id)
                                                        this.setState({
                                                            region: this.props.cities[0].cityNameAr
                                                        })
                                                    }}>
                                                        <Text style={[styleSignUp.dropDownTxt, {
                                                            fontSize: 12,
                                                            //    color: g.Light_Gray,
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
                                            ListFooterComponent={() => <Text>{ }</Text>}
                                            style={{ padding: 10, }}
                                            data={this.props.cities}
                                            renderItem={({ item, index }) => (
                                                <View >
                                                    <TouchableOpacity onPress={async () => {
                                                        this.setState({
                                                            regionID: item.id,
                                                            region: item.cityNameAr,
                                                            showRegion: false
                                                        })
                                                    }}>
                                                        <Text style={[styleSignUp.dropDownTxt, {
                                                            fontSize: 12,
                                                            //color: g.Light_Gray,
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
                                            1,
                                            this.state.regionID,
                                            this.state.address,
                                            this.state.email,
                                        )
                                        //  alert(this.props.status)
                                        if (this.props.status == 200) {
                                            this.toast.show('تم تعديل البيانات الشخصية بنجاح', 1000);
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
                    position='bottom'
                    positionValue={180}
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

        status: state.editStatus.status,
        Edit_loading: state.editStatus.Edit_loading,


    }
}
export default connect(mapStateToProps, { Get_USER_DATA, Get_Country, Get_City, Edit_UserData })(withNavigation(EditUserData));

