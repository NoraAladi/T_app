import styleLogin from '../LoginScreen/style';
import React, { Component } from 'react';
import {
    Text, View, ScrollView,
    TouchableOpacity, Platform,
    Modal, KeyboardAvoidingView, FlatList, Dimensions
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

import { newRegister } from '../../Actions/newRegister_action';
import { connect } from 'react-redux'
import Toast, { DURATION } from 'react-native-easy-toast'

import moment from 'moment';
class newUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            tabSelected_1: true,
            tabSelected_2: false,
            heightWithScroll: g.windowHeight,
            Diseases: [],
            selected: false

        };
    }

    /*
 async getKeysData(keys){
      const stores = await AsyncStorage.multiGet(keys);
      return stores.map(([key, value]) => ({[key]: value}))
    }
    
    getKeysData(['key1', 'key2', 'key3'])
     .then((response)=>{ console.log(response)})
     
     /*
     Respose will be in below form 
     response = [
      {key1: 'DATAOF key1'},
      {key2: {"DATA OF KEY2"}}
      {key3: 'DATAOF key1'}
    */


    componentDidMount() {
        const { navigation } = this.props;
        navigation.addListener('willFoucs', () => {
            console.log("willFocus runs") // calling it here to make sure it is logged at every time screen is focused after initial start
        });
    }

    async getKeysData(keys) {
        const stores = await AsyncStorage.multiGet(keys);
        return stores.map(([key, value]) => ({ [key]: value }))
    }

    async UserDataValidation() {

        this.setState({
            //    loader: true
        })
        await this.getKeysData([
            'sonName', 'date',
            'relation', 'jobName'])
            .then(async (response) => {
                console.log(response)
                alert(response[0].sonName +
                    response[1].date +
                    response[2].relation +
                    response[3].jobName)
                //await call Api
                //  await this.props.newRegister(
                //      response[0].sonName,
                //     new Date(response[1].date),
                //      response[2].relation,
                //      response[3].jobName
                //  )
                this.toast.show('تمت الاضافة بنجاح ', 1000);

            })

        // this.setState({
        //     loader: false,
        //     tabSelected_1: false,
        //     tabSelected_2: true,
        // })

    }

    async MedicalDataValidation() {

        this.setState({
            loader: true
        })
        setTimeout(() => {
            this.setState({
                loader: false
            })
            this.props.navigation.replace('ThankUScreen')

        }, 3000);

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
                                <UserData />
                                : this.state.tabSelected_2 ?
                                    <MedicalData handlePress={this.handlePress} />

                                    : null
                        }

                        <TouchableOpacity style={[styleLogin.btn, { marginTop: hp('3') }]}
                            disabled={this.state.loader}
                            onPress={async () => {
                              //  await this.nextTap()
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
                        style={{ backgroundColor: '#000' }}
                        position='bottom'
                        positionValue={180}
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
        newRegister: state.newRegister.newRegister,
    }
}

export default connect(mapStateToProps, { newRegister })(withNavigation(newUser));
