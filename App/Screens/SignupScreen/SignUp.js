import styleLogin from '../LoginScreen/style';
import styleSignUp from './styleSignUp';
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
import MedicalData from './MedicalData';

import { sign_up } from '../../Actions/signupAction';
import { completeRegister } from '../../Actions/completeregister_newpatient_Action';

import { connect } from 'react-redux'
import Toast from 'react-native-easy-toast'


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            tabSelected_1: true,
            tabSelected_2: false,
            heightWithScroll: g.windowHeight,
            Diseases: [],
            selected: false,
            user_data_arr: [],
            gender: 1,
            createdUser_ID: 114,
            healthProfile: {},
            active: false,
            empty: true
        };
    }

    empty = () => {
        this.setState({
            empty: false
        })
    }
    activeBtn = () => {
        this.setState({
            active: true,
        })
    }
    deactiveBtn = () => {
        this.setState({
            active: false
        })
    }
    componentDidMount() {
        AsyncStorage.multiRemove([
            'fullName', 'email',
            'password', 'confirmPassword', 'date',
            'gender', 'mobile', 'job', 'Jobname',
            'address', 'region', 'isChecked',
            'weight', 'height',
            'smoking', 'married', 'pregnant'
        ])
    }

    async getKeysData(keys) {
        const stores = await AsyncStorage.multiGet(keys);
        return stores.map(([key, value]) => ({ [key]: value }))
    }

    async UserDataValidation() {

        await this.getKeysData([
            'fullName', 'email',
            'password', 'confirmPassword', 'date',
            'gender', 'mobile', 'job', 'Jobname',
            'address', 'region', 'isChecked'
        ])
            .then(async (response) => {
                console.log(response)
                this.setState({
                    gender: parseInt(response[5].gender),
                })
                await this.props.sign_up(
                    response[0].fullName,
                    response[4].date,
                    parseInt(response[5].gender),
                    response[6].mobile,
                    response[8].Jobname,
                    parseInt(response[7].job),
                    parseInt(response[10].region),
                    response[9].address,
                    response[1].email,
                    response[2].password,
                    response[3].confirmPassword,
                    response[11].isChecked == 'false' ? false : true
                )

                if (this.props.status == 200) {
                    //alert(this.props.id)

                    this.setState({
                        createdUser_ID: this.props.id
                    })
                    this.toast.show(this.props.message, 3000);
                    setTimeout(() => {
                        this.setState({
                            tabSelected_1: false,
                            tabSelected_2: true,
                        })
                    }, 3000);
                }
                else {
                    if (this.props.message == "redirecttoverify") {
                        this.props.navigation.navigate('VerificationScreen',
                            {
                                'email': response[1].email,
                                'fromLoginScreen': 'true'
                            }
                        )
                    }
                    else
                        this.toast.show(this.props.message, 3000);
                }
            })
    }

    async MedicalDataValidation() {



        await this.getKeysData([
            'weight', 'height',
            'smoking', 'married', 'pregnant', 'email', 'breastFeeding'
        ])
            .then(async (response) => {
                console.log(response)
                await this.setState({
                    healthProfile: {
                        id: this.state.createdUser_ID,
                        pregnant: response[4].pregnant == '0' ? true : false,
                        breastFeeding: response[6].breastFeeding == '0' ? true : false,

                    }
                })

                await this.props.completeRegister(
                    this.state.createdUser_ID,
                    parseInt(response[1].height),
                    parseInt(response[0].weight),
                    parseInt(response[2].smoking) == '0' ? true : false,
                    parseInt(response[3].married) == '0' ? true : false,
                    this.state.healthProfile

                )
                if (this.props.statusComplete == 200) {
                    //alert(this.props.id)

                    this.toast.show('تم تسجيل البيانات الطبية بنجاح', 2000);
                    setTimeout(() => {
                        this.props.navigation.replace('VerificationScreen', {
                            'flag': 'signUp',
                            'email': response[5].email
                        })
                    }, 2000);
                }
                else {
                    this.toast.show('حدث مشكلة ، حاول مرة اخرى', 10000);
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
        console.log("device width:" + deviceWidth + "  " + " device height:" + deviceHeight);
    }
    render() {

        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : 'position'}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : -270}>
                <ScrollView
                    nestedScrollEnabled
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
                            justifyContent: 'space-between',
                            marginTop: Platform.OS == "ios" ? hp('5%') : null,
                        }}>
                            <View style={{ width: 25 }} />

                            <Text style={[styleLogin.change, { fontSize: 18, marginLeft: 0, }]}>
                                {g.SIGNUP}
                            </Text>
                            <Icon name="arrowright" type="AntDesign"
                                onPress={() => {
                                    this.props.navigation.pop()
                                }}
                                style={[styleLogin.arrow, { marginLeft: 0 }]} />
                        </View>

                        <View style={{
                            width: g.windowWidth,
                            flexDirection: 'row-reverse',
                            justifyContent: 'space-around',
                            marginTop: 25,
                            paddingHorizontal: 50,
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
                                <UserData haveCode={false} activeBtn={this.activeBtn} deactiveBtn={this.deactiveBtn} empty={this.empty} />
                                : this.state.tabSelected_2 ?
                                    <MedicalData handlePress={this.handlePress} gender={this.state.gender} />

                                    : null
                        }

                        <TouchableOpacity style={[styleLogin.btn, {
                            marginTop: hp('3'),
                            backgroundColor: this.state.active ? g.Bold_blue : g.Light_Gray
                        }]}
                            disabled={!this.state.active}
                            onPress={async () => {
                                await this.nextTap()
                            }}>
                            <Text style={[styleLogin.txt_btn,]}>
                                {this.state.tabSelected_2 ? g.COMPLETE_PROFILE : g.NEXT}</Text>
                        </TouchableOpacity>
                        {this.state.empty ?
                            <Text style={styleSignUp.error}>
                                {'* جميع البيانات مطلوبة'}
                            </Text>
                            : null}
                        <View style={{ height: 50 }} />

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.props.loading || this.props.complete_loading}
                        //visible={false}
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
                        style={{ backgroundColor: '#000' }}
                        //    position='center'
                        positionValue={this.state.tabSelected_1 ? -(g.windowHeight + 100) : 200}
                        fadeInDuration={120}
                        fadeOutDuration={1000}
                        textStyle={{ color: 'white', fontFamily: g.Regular }}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        );

    }
}

const mapStateToProps = state => {
    return {
        loading: state.register.loading,
        status: state.register.status,
        message: state.register.message,
        id: state.register.id,

        complete_loading: state.user_completed.complete_loading,
        statusComplete: state.user_completed.status,
        user_completed: state.user_completed.user_completed,

    }
}

export default connect(mapStateToProps, { sign_up, completeRegister })(withNavigation(SignUp));
