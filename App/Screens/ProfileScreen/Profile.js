import styles from './style';
import React, { Component } from 'react';
import {
    Text, View, ScrollView, RefreshControl,
    TouchableOpacity, Platform, Image, fetch

} from 'react-native';
import { withNavigation, NavigationActions, StackActions } from "react-navigation"
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';

import { connect } from 'react-redux'
import Spinner from '../../Navigation/Spinner'
import { Get_mini_Profile } from '../../Actions/_get_mini_profile';
import ActionSheet from 'react-native-actionsheet'
import ImagePicker from 'react-native-image-crop-picker';

import axios from 'axios';
import FitImage from 'react-native-fit-image';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: false,
            uploadImage: {},
            refresh: false
        };
    }

    async _logOut() {
        try {
            const Token = await AsyncStorage.getItem('app_Token');
            const refreshToken = await AsyncStorage.getItem('refreshToken');

            let response = await axios({
                method: 'POST',
                url: `${g.BASE_URL}/api/Accounts/Logout`,
                headers:
                {
                    'Authorization': `Bearer ${Token}`,
                    'accept': '*/*',
                    'Content-Type': 'application/json-patch+json',
                    'authorizationKey': g.authorizationKey,

                },
                data:
                {
                    token: refreshToken,
                },
            })
            console.log('---- LOG OUT ----');
            console.log(response.data);
            await AsyncStorage.removeItem('app_Token')
            await AsyncStorage.removeItem('countryIdKey')
            await AsyncStorage.removeItem('cityIdKey')


            this.navigateToScreen()

        } catch (error) {
            console.log(error);
        }

    }
    navigateToScreen = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({
                routeName: 'HomeScreen',      // name of the screen you want to navigate
                params: {
                    logout_: true,
                }
            })],
        });
        this.props.navigation.dispatch(resetAction);


    }

    _On_addImg = () => {
        this.ActionSheet.show()

    };



    _take_img_camera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            this._on_selectImg(image);
        });
    };

    _take_img_gallery = () => {
        ImagePicker.openPicker({
            compressImageMaxWidth: 500,
            compressImageMaxHeight: 500,
            compressImageQuality: 0.7,
            includeBase64: true,
            cropping: true,
            //   multiple: true,
        }).then((image) => {
            this._on_selectImg(image);
        });
    };



    _on_selectImg = async (image) => {
        console.log(image);
        let item = {
            uri: image.path,
            name: `image-${Math.floor(Math.random() * 20)}`,
            type: image.mime,
        }
        this.setState({
            uploadImage: item,
            refresh: true
        })
        console.log(this.state.uploadImage);
        /////////////////////////////////
        var data = new FormData();
        data.append('file', item);
        const Token = await AsyncStorage.getItem('app_Token');
        /////////////////////////////////
        try {
            let response = await axios.post(`${g.BASE_URL}/api/PatientProfile/UploadAttachment`
                , data,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data; ',
                        'authorizationKey': g.authorizationKey,
                        'Authorization': `Bearer ${Token}`,
                    }
                })

            console.log('---- Image Uploaded ----');
            console.log(response);
            await this.onRefresh()


        } catch (error) {
            console.log(error);
        }
    }


    async componentDidMount() {
        await this.props.Get_mini_Profile()
        this.setState({ image: true })
    }
    async onRefresh() {
        await this.props.Get_mini_Profile()
        this.setState({ image: true, refresh: false })
        AsyncStorage.setItem('personalPhoto', String(this.props.mini.personalPhoto))
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#f3f7fd' }}>

                <TouchableOpacity
                    onPress={() => { this._On_addImg() }}
                    style={{
                        zIndex: 1,
                        position: 'absolute', width: 80, height: 100, top: '19%', right: '40%'
                    }} />


                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    //  title={<Text style={{color: '#000', fontSize: 18}}>Select A Photo</Text>}
                    options={['التقط صورة', 'اختر من المعرض', 'إلغاء']}
                    cancelButtonIndex={2}
                    destructiveButtonIndex={2}
                    onPress={(index) => {
                        if (index == 0)
                            this._take_img_camera();
                        if (index == 1)
                            this._take_img_gallery();
                    }}
                />
                <TouchableOpacity
                    style={styles.view1}
                    onPress={() => {
                        this.props.navigation.pop()
                    }}>

                    <Icon name='arrowdown' type='AntDesign' style={{
                        color: g.white,
                        fontSize: 24,
                    }} />
                </TouchableOpacity>
                <ScrollView style={{ marginTop: Platform.OS == "android" ? hp('-10%') : hp('-15%') }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refresh}
                            onRefresh={() => { this.onRefresh() }}
                        />
                    }>

                    <Image style={{ width: g.windowWidth, height: g.windowHeight / 3 }}
                        resizeMode="cover"
                        source={require('../../Images/nice.jpg')}
                    />



                    <LinearGradient colors={['#c1ccde', '#e4e8ed', '#f2f5f7', '#fff']}
                        style={styles.linearGradient}>

                        <View style={{
                            justifyContent: 'center', alignItems: 'center',
                        }}>
                            <TouchableOpacity onPress={() => {
                                this._On_addImg()
                            }}>
                                <FitImage style={{
                                    borderRadius: wp('50'),
                                    width: 80, height: 80,
                                    overflow: 'hidden',
                                    marginTop: Platform.OS == "android" ? -55 : 0
                                }}
                                    resizeMode="stretch"
                                    source={this.state.image && this.props.mini.personalPhoto ? { uri: this.props.mini.personalPhoto } : require('../../Images/noUser.png')}
                                />

                                <Image style={[{ marginTop: -15, marginLeft: 44 }]}
                                    source={require('../../Images/camIcon.png')}
                                />
                            </TouchableOpacity>
                            <Text style={[styles.txtBold, { fontSize: 16, marginTop: -5, }]}>{this.props.mini.fullNameAr}</Text>
                            <Text style={[styles.txtBold, { fontSize: 12, marginTop: -5, }]}>{this.props.mini.code}</Text>
                        </View>

                        {
                            this.props.loading ?
                                <View style={{ marginBottom: hp('5%') }} >
                                    <Spinner />
                                </View>

                                :
                                <View>
                                    <Text style={[styles.txt, { color: g.Gray, fontSize: 12 }]}>
                                        {'الاسم كاملا'}
                                    </Text>

                                    <Text style={[styles.txt, { fontSize: 16, marginTop: -5, }]}>
                                        {this.props.mini.fullNameAr}
                                    </Text>

                                    <Text style={[styles.txt, { color: g.Gray, fontSize: 12 }]}>
                                        {g.EMAIL}
                                    </Text>

                                    <Text style={[styles.txt, { fontSize: 16, marginTop: -5, }]}>
                                        {this.props.mini.email} {'\n'}

                                    </Text>
                                </View>
                        }
                    </LinearGradient>


                    {/**content */}
                    <View>
                        <TouchableOpacity activeOpacity={.8}
                            onPress={() => {
                                this.props.navigation.navigate('EditProfileScreen')
                            }}
                        >
                            <View
                                style={[styles.card, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                <Text style={styles.txtBold}>
                                    {g.EDIT_PROFILE}
                                </Text>

                                <Icon name='left' type='AntDesign' style={styles.icon} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={.8}
                            onPress={() => {
                                this.props.navigation.navigate('EditMedicalScreen')
                            }}
                        >
                            <View
                                style={[styles.card, { justifyContent: 'space-between', alignItems: 'center' }]}
                            >
                                <Text style={styles.txtBold}>
                                    {g.EDIT_MEDICAL}
                                </Text>
                                <Icon name='left' type='AntDesign' style={styles.icon} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={.8}
                            onPress={() => {
                                this.props.navigation.navigate('EditPassScreen')
                            }}
                        >
                            <View
                                style={[styles.card, { justifyContent: 'space-between', alignItems: 'center' }]} >
                                <Text style={styles.txtBold}>
                                    {g.EDIT_PASS}
                                </Text>

                                <Icon name='left' type='AntDesign' style={styles.icon} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={.8}
                            onPress={() => {
                                this.props.navigation.navigate('UserManagementScreen')
                            }}
                        >
                            <View
                                style={[styles.card, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                <Text style={styles.txtBold}>
                                    {g.USER_MANAGEMENT}
                                </Text>

                                <Icon name='left' type='AntDesign' style={styles.icon} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={[styles.btn,
                    {
                        flexDirection: 'row-reverse',
                        marginTop: hp('3'), marginBottom: hp('3'),
                        backgroundColor: '#FFDBDB80', width: wp('90')
                    }]}

                        onPress={async () => {
                            this._logOut()
                        }}
                    >
                        <Icon name='log-out' type='Entypo' style={[styles.icon, { color: '#E02020', padding: 10, marginTop: 5, }]} />
                        <Text style={[styles.txt_btn, { color: '#E02020' }]}>
                            {g.LOGOUT}</Text>
                    </TouchableOpacity>

                </ScrollView>

            </View>
        );

    }
}

const mapStateToProps = state => {
    return {
        loading: state.mini_profile.loading,
        mini: state.mini_profile.mini,
    }
}

export default connect(mapStateToProps, { Get_mini_Profile })(withNavigation(Profile));

