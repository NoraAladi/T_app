import styles from './style';
import React, { Component } from 'react';
import {
    Text, View, ScrollView,
    TouchableOpacity, Platform, Image,

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

import axios from 'axios';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {

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

    componentDidMount() {
        this.props.Get_mini_Profile()
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#f3f7fd' }}>
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
                <ScrollView style={{ marginTop: Platform.OS == "android" ? hp('-10%') : hp('-15%') }}>
                    <Image style={{ width: g.windowWidth, height: g.windowHeight / 3 }}
                        resizeMode="cover"
                        source={require('../../Images/nice.jpg')}
                    />



                    <LinearGradient colors={['#c1ccde', '#e4e8ed', '#f2f5f7', '#fff']}
                        style={styles.linearGradient}>

                        <View style={{
                            justifyContent: 'center', alignItems: 'center',
                        }}>

                            <Image style={[styles.img, {
                                borderRadius: wp('50'),
                                marginTop: Platform.OS == "android" ? -55 : 0
                            }]}
                                resizeMode="contain"
                                source={require('../../Images/user.png')}
                            />

                            <Image style={[{ marginTop: -15, marginLeft: 44 }]}
                                source={require('../../Images/camIcon.png')}
                            />
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

