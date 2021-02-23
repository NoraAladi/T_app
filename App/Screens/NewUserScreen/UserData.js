import styles from '../LoginScreen/style';
import React, { Component } from 'react';
import {
    Text, View, TextInput,
    TouchableOpacity, Platform
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import AsyncStorage from '@react-native-community/async-storage';
import styleNewUser from './styleNewUser';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import { FlatList } from 'react-native-gesture-handler';
import { ArabicNumbers } from 'react-native-arabic-numbers';

import { Get_Relation } from '../../Actions/get_Relation';
import { connect } from 'react-redux'

var months = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
var monthsEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var days = ["اﻷحد", "اﻷثنين", "الثلاثاء", "اﻷربعاء", "الخميس", "الجمعة", "السبت"];



class UserData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            sonName: '',
            jobName: '',
            showClender: false,
            showRelation: false,
            relationName: '',
            relationId: 0,
            dateInAr: this.arabicDate(moment().format('DD MMMM YYYY')),


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
    setDefault() {
        AsyncStorage.setItem('sonName', this.state.sonName)
        AsyncStorage.setItem('date', String(moment().format('YYYY-MM-DD')))
        AsyncStorage.setItem('relation', String(this.state.relationId))
        AsyncStorage.setItem('jobName', this.state.jobName)

    }
    async componentDidMount() {
        await this.props.Get_Relation()
        await this.setState({
            relationName: this.props.relation[0].typeNameAR,
            relationId: this.props.relation[0].id,
        })
     //   alert(this.state.relationId)
        this.setDefault()

    }
    render() {
        return (
            <View>
                <Text style={[styles.login, { marginTop: hp('2') }]}>
                    {g.USER_DATA}
                </Text>




                {/**relation */}
                <View>
                    <Text style={[styles.username, { marginTop: hp('2%') }]}>
                        {g.RELATION}
                    </Text>
                    <View style={styleNewUser.dropDownView}>
                        <Text style={styleNewUser.dropDownTxt}>{this.state.relationName}</Text>
                        <Icon name={this.state.showRelation ? "arrow-drop-up" : "arrow-drop-down"} type="MaterialIcons"
                            style={styleNewUser.dropDownIcon}
                            onPress={() => {
                                this.setState({
                                    showRelation: !this.state.showRelation
                                })
                            }}
                        />
                    </View>
                </View>

                {this.state.showRelation ?
                    <View style={[styleNewUser.dropDownView, {
                        marginTop: -15,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        height: 100
                    }]}>
                        <FlatList
                            ListFooterComponent={() => <Text>{ }</Text>}
                            style={{ padding: 7, }}
                            data={this.props.relation}
                            renderItem={({ item, index }) => (
                                <View >
                                    <TouchableOpacity onPress={async () => {
                                        this.setState({
                                            relationName: item.typeNameAR,
                                            relationId: item.id,
                                            showRelation: false
                                        })
                                        await AsyncStorage.setItem('relation', item.id)
                                    }}>
                                        <Text style={[styleNewUser.dropDownTxt, {
                                            fontSize: 12,
                                            // color: g.Light_Gray,
                                        }]}>{item.typeNameAR}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    </View>
                    : null}




                {/**son */}
                <View>
                    <Text style={[styles.username, { marginTop: hp('2%') }]}>
                        {g.SON}
                    </Text>

                    <View style={[styles.viewInput]}>

                        <TextInput
                            placeholder={g.FULL_NAME}
                            onChangeText={(sonName) => {
                                this.setState({
                                    sonName: sonName,
                                })

                            }}
                            onEndEditing={async () => {
                                await AsyncStorage.setItem('sonName', this.state.sonName)
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
                    <View style={styleNewUser.dropDownView}>
                        <Text style={styleNewUser.dropDownTxt}>{this.state.dateInAr}</Text>
                        <Icon name={this.state.showClender ? "arrow-drop-up" : "arrow-drop-down"} type="MaterialIcons"
                            style={styleNewUser.dropDownIcon}
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

                {/**son */}
                <View>
                    <Text style={[styles.username, { marginTop: hp('2%') }]}>
                        {g.JOB_FOUND}
                    </Text>

                    <View style={[styles.viewInput]}>

                        <TextInput
                            placeholder={g.JOP}
                            onChangeText={(jobName) => {
                                this.setState({
                                    jobName: jobName,
                                })

                            }}
                            onEndEditing={async () => {
                                await AsyncStorage.setItem('jobName', this.state.jobName)
                            }}
                            placeholderTextColor={g.Light_Gray}
                            style={[styles.input]} />
                    </View>
                </View>





            </View>
        );

    }
}
const mapStateToProps = state => {
    return {
        relation: state.relation.relation,
    }
}

export default connect(mapStateToProps, { Get_Relation })(withNavigation(UserData));
