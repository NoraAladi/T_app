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
import { Get_Dependant_Personal } from '../../Actions/getDependant_Personal_Action';

import { connect } from 'react-redux'
import Spinner from '../../Navigation/Spinner'
import ScrollPicker from "react-native-wheel-scrollview-picker";
import DatePicker from 'react-native-date-picker'

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
            relationName: 'اختر صلة القرابة',
            relationId: -1,
            dateInAr: 'اختر تاريخ الميلاد',
            loading: true,
            realDate: moment().format('YYYY-MM-DD'),
            relationNameArray: []


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
        AsyncStorage.setItem('date', String(this.state.realDate))
        AsyncStorage.setItem('relation', String(this.state.relationId))
        AsyncStorage.setItem('jobName', this.state.jobName)

    }
    async componentDidMount() {
        await this.props.Get_Relation()
        this.props.relation.map(item => {
            this.state.relationNameArray.push(item.typeNameAR)
        })

        //   alert(this.state.relationId)
        if (this.props.dependentCode) {
            //call get Api
            await this.props.Get_Dependant_Personal('dependentCode', this.props.dependentCode)

            await this.setState({
                sonName: this.props.dependantPersonal.fullNameAr,
                realDate: moment(this.props.dependantPersonal.dateofBirth).format('YYYY-MM-DD'),
                dateInAr: this.arabicDate(moment(this.props.dependantPersonal.dateofBirth).format('DD MMMM YYYY')),
                jobName: this.props.dependantPersonal.profession,
                relationId: this.props.dependantPersonal.relativeType.id,
                relationName: this.props.dependantPersonal.relativeType.typeNameAR,

            })

            this.props.setID(this.props.dependantPersonal.id)
        }

        else if (this.props.dependentId) {
            //call get Api
            await this.props.Get_Dependant_Personal('dependentId', this.props.dependentId)
            await this.setState({
                sonName: this.props.dependantPersonal.fullNameAr,
                realDate: moment(this.props.dependantPersonal.dateofBirth).format('YYYY-MM-DD'),
                dateInAr: this.arabicDate(moment(this.props.dependantPersonal.dateofBirth).format('DD MMMM YYYY')),
                jobName: this.props.dependantPersonal.profession,
                relationId: this.props.dependantPersonal.relativeType.id,
                relationName: this.props.dependantPersonal.relativeType.typeNameAR,

            })
            this.props.setID(this.props.dependantPersonal.id)

        }

        else {
            await this.setState({
              //  relationName: this.props.relation[0].typeNameAR,
                //relationId: this.props.relation[0].id,
            })
        }

        this.setState({
            loading: false
        })
        this.setDefault()

    }
    render() {
        return (
            <>
                {
                    // this.state.loading && this.props.dependentCode ||
                    //     this.state.loading && this.props.dependentId ?
                    false ?
                        <View style={{ marginTop: hp('35'), }} >
                            <Spinner />
                        </View>

                        :
                        <View>
                            <Text style={[styles.login, { marginTop: hp('2') }]}>
                                {g.USER_DATA}
                            </Text>




                            {/**relation */}
                            <View>
                                <Text style={[styles.username, { marginTop: hp('2%') }]}>
                                    {g.RELATION}
                                </Text>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => {
                                        this.setState({
                                            showRelation: !this.state.showRelation
                                        })
                                    }}>
                                    <View style={styleNewUser.dropDownView}>
                                        <Text style={styleNewUser.dropDownTxt}>{this.state.relationName}</Text>
                                        <Icon name={this.state.showRelation ? "arrow-drop-up" : "arrow-drop-down"} type="MaterialIcons"
                                            style={styleNewUser.dropDownIcon}

                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>

                            {this.state.showRelation ?

                                <ScrollPicker
                                    ref={(sp) => { this.sp = sp }}
                                    dataSource={this.state.relationNameArray}
                                    selectedIndex={1-3}
                                    itemHeight={40}
                                    wrapperHeight={100}
                                    highlightColor={g.Light_Gray}
                                    onValueChange={async (data, selectedIndex) => {
                                        this.setState({
                                            relationName: data,
                                            relationId: this.props.relation[selectedIndex].id,
                                        })
                                        await AsyncStorage.setItem('relation', String(this.props.relation[selectedIndex].id))

                                    }}
                                />

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
                                        style={[styles.input]}
                                        defaultValue={this.state.sonName}
                                    />
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
                                    <View style={styleNewUser.dropDownView}>
                                        <Text style={styleNewUser.dropDownTxt}>{this.state.dateInAr}</Text>
                                        <Icon name={this.state.showClender ? "arrow-drop-up" : "arrow-drop-down"} type="MaterialIcons"
                                            style={styleNewUser.dropDownIcon}

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
                                            await AsyncStorage.setItem('date', dateFormat)

                                            this.setState({
                                                dateInAr: this.arabicDate(dateFormat2),
                                                //  showClender: false
                                            })
                                            //   
                                        }}
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
                                        style={[styles.input]}
                                        defaultValue={this.state.jobName}

                                    />
                                </View>
                            </View>





                        </View>
                }
            </>
        );

    }
}
const mapStateToProps = state => {
    return {
        relation: state.relation.relation,
        dependantPersonal: state.dependantPersonal.dependantPersonal
    }
}

export default connect(mapStateToProps, { Get_Relation, Get_Dependant_Personal })(withNavigation(UserData));
