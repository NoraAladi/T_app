import styleLogin from '../LoginScreen/style';
import React, { Component } from 'react';
import {
    Text, View, ScrollView,
    TouchableOpacity, Platform,
    Modal, KeyboardAvoidingView, Dimensions
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import UserData from './UserData';
import AsyncStorage from '@react-native-community/async-storage';
import {

    UIActivityIndicator,
} from 'react-native-indicators';
import MedicalData from '../SignupScreen/MedicalData';

import { new_Register } from '../../Actions/newRegister_action';
import { Put_DependentPersonal } from '../../Actions/Put_DependentPersonal_Action';

import { completeRegisterDependent } from '../../Actions/completeregister_newDependent_Action';
import { Put_DependentHealth } from '../../Actions/Put_DependentHealth_Action';


import { connect } from 'react-redux'
import Toast, { DURATION } from 'react-native-easy-toast'

class newUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            tabSelected_1: true,
            tabSelected_2: false,
            heightWithScroll: g.windowHeight,
            Diseases: [],
            selected: false,

            newUserID: 120,
            healthProfile: {},
            editID: 0,
            activeBtn: false,

            relationId: -1,
        };
    }
    componentDidMount() {

        AsyncStorage.multiRemove([
            'fullName', 'email',
            'password', 'confirmPassword', 'date',
            'sex', 'mobile', 'job', 'Jobname',
            'address', 'region', 'isChecked',
            'weight', 'height',
            'smoking', 'married', 'pregnant'
        ])
    }

    setID = (id) => {
        this.setState({
            editID: id
        })
    }
    activeBtn = (bol) => {
        this.setState({
            activeBtn: bol
        })
    }
    async getKeysData(keys) {
        const stores = await AsyncStorage.multiGet(keys);
        return stores.map(([key, value]) => ({ [key]: value }))
    }

    async UserDataValidation() {
        this.setState({
            loader: true
        })
        await this.getKeysData([
            'sonName', 'date',
            'relation', 'jobName'])
            .then(async (response) => {
                console.log(response)
                this.setState({ relationId: parseInt(response[2].relation) })
                if (this.props.navigation.getParam('edit') == 'edit' ||
                    this.props.navigation.getParam('patientCode')
                ) {
                    await this.props.Put_DependentPersonal(
                        this.state.editID,
                        //  this.props.dependantPersonal,
                        response[0].sonName,
                        response[1].date,
                        response[3].jobName,
                        parseInt(response[2].relation),
                    )
                    if (this.props.putPersonalResponse.status == 200)
                        this.toast.show('تم التعديل بيانات المستخدم بنجاح ', 2000);
                    setTimeout(() => {
                        this.setState({
                            loader: false,
                            tabSelected_1: false,
                            tabSelected_2: true,
                        })
                    }, 2000);

                }
                else {
                    await this.props.new_Register(
                        response[0].sonName,
                        response[1].date,
                        response[3].jobName,
                        parseInt(response[2].relation),
                    )
                    //      this.toast.show('تمت الاضافة بنجاح ', 1000);
                    if (this.props.newRegisterStatus == 200) {
                        this.setState({
                            newUserID: this.props.newRegister.id
                        })

                        this.toast.show('تم إنشاء المستخدم بنجاح ', 2000);
                        setTimeout(() => {
                            this.setState({
                                loader: false,
                                tabSelected_1: false,
                                tabSelected_2: true,
                            })
                        }, 2000);

                    }
                    else {
                        this.toast.show('يجب إدخال البيانات بشكل سليم', 2000);
                        setTimeout(() => {
                            this.setState({
                                loader: false,

                            })
                        }, 2000);
                    }

                }
            })



    }

    async MedicalDataValidation() {

        await this.getKeysData([
            'weight', 'height',
            'smoking', 'married', 'pregnant', 'breastFeeding'
        ])
            .then(async (response) => {
                console.log(response)

                await this.setState({
                    healthProfile: {
                        id: this.props.navigation.getParam('edit') ||
                            this.props.navigation.getParam('patientCode') ?
                            this.state.editID :
                            this.state.newUserID,
                        pregnant: response[4].pregnant == '0' ? true : false,
                        breastFeeding: response[5].pregnant == '0' ? true : false,

                    }
                })
                if (this.props.navigation.getParam('edit') ||
                    this.props.navigation.getParam('patientCode')) {
                    await this.props.Put_DependentHealth(
                        this.state.editID,
                        //this.props.navigation.getParam('dependentId'),
                        response[1].height,
                        response[0].weight,
                        response[2].smoking == '0' ? true : false,
                        response[3].married == '0' ? true : false,
                        this.state.healthProfile
                    )
                    if (this.props.putHealthResponse.status == 200) {
                        this.toast.show('تم تسجيل البيانات الطبية بنجاح', 2000);
                        setTimeout(() => {
                            this.props.navigation.replace('UserManagementScreen')
                        }, 2000);
                    }
                    else {
                        this.toast.show('حدث مشكلة ، حاول مرة اخرى', 10000);
                    }
                }

                else {
                    await this.props.completeRegisterDependent(
                        parseInt(this.state.newUserID),
                        response[0].weight,
                        response[1].height,
                        response[2].smoking == '0' ? true : false,
                        response[3].married == '0' ? true : false,
                        this.state.healthProfile

                    )
                    if (this.props.status == 200) {
                        //alert(this.props.id)

                        this.toast.show('تم تسجيل البيانات الطبية بنجاح', 3000);
                        setTimeout(() => {
                            this.props.navigation.replace('UserManagementScreen')
                        }, 3000);
                    }
                    else {
                        this.toast.show('حدث مشكلة ، حاول مرة اخرى', 3000);
                    }
                }
            })

    }



    async nextTap() {
        if (this.state.tabSelected_1) {
            await this.UserDataValidation()
            return;
        }
        if (this.state.tabSelected_2) {
            await this.MedicalDataValidation()
            return;
        }


    }


    find_dimesions(width, height) {
        const deviceHeight = Dimensions.get("window").height;
        const deviceWidth = Dimensions.get("window").width;
        this.setState({
            heightWithScroll: height
        })
        console.log(" view width:" + width + "  " + "view height:" + height);
        console.log(
            "device width:" + deviceWidth + "  " + " device height:" + deviceHeight
        );
    }

    render() {

        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : 'position'}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : -220}>
                <ScrollView
                    onContentSizeChange={(width, height) => {
                        if (this.state.tabSelected_2) {
                            this.scrollListReftop.scrollTo({ x: 0, y: 0, animated: true })
                        }

                        this.find_dimesions(width, height)
                    }}
                    ref={(ref) => { this.scrollListReftop = ref; }}
                    showsVerticalScrollIndicator={false}>


                    <View style={{ zIndex: -1, }}>
                        <View style={{
                            flexDirection: 'row', paddingHorizontal: 25,
                            justifyContent: 'space-between'
                        }}>

                            <Text style={[styleLogin.change, { marginLeft: wp('22%'), fontSize: 18, }]}>
                                {this.props.navigation.getParam('edit') ? 'تعديل بيانات المستخدم' : g.SIGNUP}
                            </Text>
                            <Icon name="arrowright" type="AntDesign"
                                onPress={() => {
                                    this.props.navigation.pop()
                                }}
                                style={[styleLogin.arrow, { marginLeft: -40 }]} />
                        </View>

                        <View style={{
                            width: wp('55'),
                            flexDirection: 'row-reverse',
                            justifyContent: 'space-around',
                            marginTop: 25,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}>
                            <View
                                style={{ justifyContent: 'center', alignItems: 'center' }}
                            >
                                <View style={{
                                    width: 90,
                                    backgroundColor: this.state.tabSelected_2 ? 'red' : g.Light_Gray,
                                    borderRadius: 3,
                                    height: 4,
                                }} />
                                <Text style={{
                                    fontSize: 12,
                                    fontFamily: g.Regular,
                                    marginTop: 3,
                                    color: this.state.tabSelected_1 || this.state.tabSelected_2 ? 'red' : g.Light_Gray
                                }}>{g.USER_DATA}</Text>
                            </View>

                            <View
                                style={{ justifyContent: 'center', alignItems: 'center' }}
                            >
                                <View style={{
                                    width: 90,
                                    backgroundColor: g.Light_Gray,
                                    borderRadius: 3,
                                    height: 4,
                                }} />
                                <Text style={{
                                    fontSize: 12,
                                    fontFamily: g.Regular,
                                    marginTop: 3,
                                    color: this.state.tabSelected_2 ? 'red' : g.Light_Gray
                                }}>{g.MEDICAL_DATA}</Text>
                            </View>



                        </View>

                        {
                            this.state.tabSelected_1 ?
                                <UserData
                                    activeBtn={this.activeBtn}
                                    setID={this.setID}
                                    dependentId={this.props.navigation.getParam('dependentId')}
                                    dependentCode={this.props.navigation.getParam('patientCode')}
                                />
                                : this.state.tabSelected_2 ?
                                    <MedicalData
                                        relationId={this.state.relationId}
                                        dependentId={this.props.navigation.getParam('dependentId')}
                                        dependentCode={this.props.navigation.getParam('patientCode')}
                                    />

                                    : null
                        }

                        <TouchableOpacity style={[styleLogin.btn, {
                            marginTop: hp('3'),
                            backgroundColor: this.state.activeBtn ? g.Bold_blue : g.Light_Gray
                        }]}
                            disabled={this.state.loader || !this.state.activeBtn}
                            onPress={async () => {
                                await this.nextTap()
                            }}>
                            <Text style={[styleLogin.txt_btn,]}>
                                {this.state.tabSelected_2 ? g.COMPLETE_PROFILE : g.NEXT}</Text>
                        </TouchableOpacity>
                        <View style={{ height: 50 }} />

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.loader}
                        >
                            <View
                                style={{
                                    position: 'absolute',
                                    width: g.windowWidth,
                                    height: g.windowHeight,
                                }}>
                                <UIActivityIndicator color={g.Bold_blue} size={28}
                                />
                            </View>
                        </Modal>


                    </View>
                    <Toast
                        ref={(toast) => this.toast = toast}
                        style={{ backgroundColor: g.toast }}
                        position='center'
                        fadeInDuration={120}
                        fadeOutDuration={1000}
                        textStyle={{ color: '#000', fontFamily: g.Regular, fontSize: 16, }}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        );

    }
}
const mapStateToProps = state => {
    return {
        newRegister: state.newRegister.newRegister,
        loading: state.newRegister.loading,
        newRegisterStatus: state.newRegister.newRegisterStatus,

        userDependent_completed: state.userDependent_completed.newRegister,
        loading1: state.userDependent_completed.loading,
        status: state.userDependent_completed.status,

        putHealthResponse: state.putHealthResponse.putHealthResponse,

        putPersonalResponse: state.putPersonalResponse.putPersonalResponse,

        dependantPersonal: state.dependantPersonal.dependantPersonal

    }
}

export default connect(mapStateToProps, { new_Register, completeRegisterDependent, Put_DependentHealth, Put_DependentPersonal })(withNavigation(newUser));
