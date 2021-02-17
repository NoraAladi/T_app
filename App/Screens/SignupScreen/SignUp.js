import styleLogin from '../LoginScreen/style';
import React, { Component } from 'react';
import {
    Text, View, ScrollView, TextInput,
    TouchableOpacity, Platform, ImageBackground,
    I18nManager, Modal, KeyboardAvoidingView, FlatList, Dimensions
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
import BottomSheet from 'reanimated-bottom-sheet';
import CreatPassword from './CreatPassword';

import { sign_up } from '../../Actions/signupAction';
import { connect } from 'react-redux'


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            tabSelected_1: true,
            tabSelected_2: false,
            heightWithScroll: g.windowHeight,
            Diseases: [],
            selected: false ,

            user_data_arr : []
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
            loader: true
        })
        await this.getKeysData([
            'fullName' , 'email',
            'password' , 'confirmPassword' , 'date',
            'sex', 'mobile', 'job', 'Jobname',
            'country', 'address' , 
            ])
            .then( async (response) => { 
                console.log( response )
                
                await this.props.sign_up(
                    response[0].fullName , response[1].email ,
                    response[2].password , response[3].confirmPassword , 
                    response[4].date ,  response[5].sex  ,
                    response[6].mobile , response[7].job ,
                    response[8].Jobname , response[9].country ,
                    response[10].address ,
                     
                )   
               // alert(JSON.stringify( response))
               await this.setState({
                    loader: false,
                     tabSelected_1: false,
                     tabSelected_2: true,
                })
            })
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
    async removeItem(item)
    {
        await this.state.Diseases.splice(this.state.Diseases.indexOf(item), 1)
        return this.state.Diseases

    }
    renderContent = () => (
        <View
            style={{
                backgroundColor: '#00000020',
                height: this.state.heightWithScroll,
            }}
        >

            <View style={{
                backgroundColor: g.white, height: 525,
                marginTop: this.state.heightWithScroll - 525,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                width: g.windowWidth,
                // elevation: 3
            }}>
                <View style={{
                    flexDirection: 'row-reverse',
                    paddingHorizontal: 25, width: g.windowWidth,
                    justifyContent: 'space-between'
                }}>
                    <Text style={[styleLogin.login, { marginRight: 0, marginTop: 15, }]}>
                        {g.DISEASE}
                    </Text>
                    <Icon name='close' type='Ionicons'
                        style={{ fontSize: 22, marginTop: 15, }}
                        onPress={() => {
                            this.sheetRef.current.snapTo(0)
                        }}
                    />
                </View>
                <Text style={[styleLogin.username, {
                    marginTop: 0, marginRight: 0,
                    flexDirection: 'row-reverse', paddingHorizontal: 25
                }]}>
                    {g.SELECT_MORE}
                </Text>
                <FlatList
                    extraData={this.state}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    style={{
                        padding: 16, transform: [{ rotateY: '180deg' }]
                    }}
                    data={['سكر', 'ضغط', 'قلب', 'سرطان', 'جلدية', 'مخ واعصاب', 'امراض الكبد', 'الانسحاب الرئوي', 'الذبحة الصدرية', 'متلازمات خارج الهرمية',]}
                    renderItem={({ item, index }) => (
                        <View >
                            <TouchableOpacity onPress={async () => {

                                //   await this.state.Diseases.push(item)
                                // if (!this.state.Diseases.includes(item)) {
                                //     await this.setState({
                                //         Diseases: [...this.state.Diseases, item],
                                //     })
                                // }
                                // else {
                                //     await this.setState({
                                //         Diseases: await this.removeItem(item),
                                //     })  
                                // }
                            }}>
                                <View style={{
                                    height: 40,
                                    margin: 4, borderRadius: 20,
                                    alignItems: 'center', justifyContent: 'center',
                                    backgroundColor: this.state.Diseases.includes(item) ? g.Blue : g.Light_Gray
                                }}>

                                    <Text style={{
                                        fontSize: 12,
                                        color: g.white,
                                        textAlign: 'center',
                                        transform: [{ rotateY: '180deg' }],
                                        padding: 15,
                                        fontFamily: Platform.OS == "android" ?  g.Bold  : g.Regular , fontWeight : Platform.OS == "ios" ? "800": null ,                                    }}>{item}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        </View>
    );

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
    sheetRef = React.createRef()

    handlePress = () => {
        this.sheetRef.current.snapTo(1)
    }
    render() {

        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : 'position'}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : -270}>
                <ScrollView
                    onContentSizeChange={(width, height) => {
                        if (this.state.tabSelected_2) {
                            this.scrollListReftop.scrollTo({ x: 0, y: 0, animated: true })
                         }

                        this.find_dimesions(width, height)
                    }}
                    ref={(ref) => { this.scrollListReftop = ref; }}
                    showsVerticalScrollIndicator={false}>

                    <BottomSheet
                        ref={this.sheetRef}
                        snapPoints={[-2000, this.state.heightWithScroll,]}
                        enabledContentGestureInteraction={true}
                        enabledInnerScrolling={true}
                        enabledContentTapInteraction={false}
                        renderContent={this.renderContent}
                    />

                    <View style={{ zIndex: -1, }}>
                        <View style={{
                            flexDirection: 'row', paddingHorizontal: 25,
                            justifyContent: 'space-between',
                            marginTop : Platform.OS == "ios" ? hp('5%') : null ,
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
                                    backgroundColor: this.state.tabSelected_2  ? 'red' : g.Light_Gray,
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
                                    backgroundColor:  g.Light_Gray,
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
                                <UserData haveCode={false}/>
                                : this.state.tabSelected_2 ?
                                    <MedicalData handlePress={this.handlePress} />
                                    
                                        : null
                        }
                        
                        <TouchableOpacity style={[styleLogin.btn, { marginTop: hp('3') }]}
                            disabled={this.state.loader}
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
                            visible={this.props.loading}
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
                </ScrollView>
            </KeyboardAvoidingView>
        );

    }
}

const mapStateToProps = state => {
    return {
        error: state.register.error,
        loading: state.register.loading,
        user: state.register.user,
        message: state.register.message,
    }
}

export default connect(mapStateToProps, { sign_up })(withNavigation(SignUp));
