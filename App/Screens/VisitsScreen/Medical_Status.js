import VisitsStyle from './VisitsStyle';
import styleLogin from '../LoginScreen/style';

import React, { Component } from 'react';
import {
    Text, View, ScrollView, Image, Dimensions, FlatList,
    TouchableOpacity, Platform,
    ImageBackground, I18nManager, KeyboardAvoidingView, Modal as ModalReactNative
    , TouchableWithoutFeedback
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import i18n from '../../i18n';
import ToggleSwitch from 'toggle-switch-react-native'
import DataHidden from './DataHidden';
import Modal from 'react-native-modalbox';
import ModalVaccinations from "./ModalVaccinations";

const images = [require('../../Images/img2.png'),
require('../../Images/img3.png'), require('../../Images/img4.png'),
require('../../Images/img5.png'), require('../../Images/img1.png'),
require('../../Images/img6.png'),
require('../../Images/img7.png'), require('../../Images/img8.png'),
require('../../Images/img9.png'), require('../../Images/img10.png'),
require('../../Images/img11.png'),]

const { width, height } = Dimensions.get("window");

class Visit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false,
            ModalAlert: false,
            modal: false
        }
    }

    render() {
        return (

            <View>
                <View style={VisitsStyle.header}>
                    <Text style={[VisitsStyle.title, { color: 'black', paddingVertical: 13, }]}>
                        {g.HIDE_MY_DATA}
                    </Text>

                    <ToggleSwitch
                        animationSpeed={100}
                        isOn={this.state.toggle}
                        onColor="#4CD964"
                        offColor={g.Light_Gray}
                        size="meduim"
                        onToggle={async (isOn) => {
                            console.log("changed to : ", isOn)
                            if (isOn) {
                                await this.setState({
                                    ModalAlert: true,
                                })
                            }
                            else {
                                this.setState({
                                    toggle: false
                                })
                            }

                        }}
                    />
                </View>
                {this.state.toggle ? <DataHidden /> :
                    <View style={{ height: hp('80%') }} >
                        <FlatList
                            key={(item) => { item.id }}
                            showsVerticalScrollIndicator={false}
                            nestedScrollEnabled
                            data={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
                            renderItem={({ item, index }) => (
                                <View style={VisitsStyle.card}>
                                    <Image source={images[index % images.length]}
                                        style={VisitsStyle.img} />
                                    {
                                        images[index % images.length] == 16 ?
                                            <View >
                                                <Text style={VisitsStyle.title}>
                                                    الأدوية المصروفة في الثلاث شهور الماضية
                                        </Text>
                                                <TouchableOpacity style={VisitsStyle.btn}>
                                                    <Text style={{
fontFamily: Platform.OS == "android" ?  g.Bold  : g.Regular , fontWeight : Platform.OS == "ios" ? "800": null ,                                                         marginTop: -5, color: g.Blue,
                                                        fontSize: 18
                                                    }}> {i18n.t(g.OFFER_BTN)} </Text>
                                                </TouchableOpacity>
                                            </View>
                                            :
                                            images[index % images.length] == 17 ?
                                                <View >
                                                    <Text style={VisitsStyle.title}>
                                                        التطعيمات
                                            </Text>
                                                    <TouchableOpacity style={VisitsStyle.btn}
                                                        onPress={() => {
                                                            this.setState({
                                                                modal: !this.state.modal
                                                            })
                                                        }}
                                                    >
                                                        <Text style={VisitsStyle.offer}> {i18n.t(g.OFFER_BTN)} </Text>
                                                    </TouchableOpacity>
                                                </View>
                                                :
                                                <View style={{ flexDirection: 'column' }}>
                                                    <Text style={VisitsStyle.title}>
                                                        الأمراض المزمنة </Text>
                                                    <Text style={VisitsStyle.txt}>
                                                        ارتفاع ضغط الدم
                                                        ارتفاع مستوي السكر في الدم داء السكري
                                  </Text>
                                                </View>
                                    }
                                </View>
                            )} />
                    </View>
                }

                <ModalReactNative
                    //   animationType="slide"
                    transparent={true}

                    visible={this.state.ModalAlert}
                >

                    <View style={{
                        flex: 1,
                        backgroundColor: '#00000090',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <View
                            elevation={4}
                            style={{
                                width: g.windowWidth - 80,
                                height: g.windowHeight / 3,
                                borderRadius: 10,
                                backgroundColor: 'white',
                                alignItems: 'center',
                                justifyContent: 'center',

                            }}>
                            <ScrollView>
                                <Image
                                    style={{
                                        width: 50, height: 50,
                                        marginRight: 'auto',
                                        marginLeft: 'auto', marginTop: 25,
                                    }}
                                    resizeMode='contain'
                                    source={require('../../Images/caution.png')} />

                                <Text style={{
fontFamily: Platform.OS == "android" ?  g.Bold  : g.Regular , fontWeight : Platform.OS == "ios" ? "800": null ,                                    fontSize: 16,
                                    textAlign: 'center',
                                }}>
                                    {g.HIDE_DATA}
                                </Text>
                                <Text style={{
                                    fontFamily: g.Regular, fontSize: 14,
                                    textAlign: 'center', width: g.windowWidth - 100,
                                }}>
                                    {g.DESC_HIDE}
                                </Text>
                            </ScrollView>

                            <View
                                elevation={5}
                                style={{
                                    width: g.windowWidth - 80,
                                    height: 60,
                                    justifyContent: 'space-around',
                                    flexDirection: 'row-reverse', alignItems: 'center',
                                    paddingHorizontal: 20,

                                }}>
                                <Text
                                    onPress={() => {
                                        this.setState({
                                            ModalAlert: false,
                                            toggle: true
                                        })
                                    }}
                                    style={{
                                        fontFamily: Platform.OS == "android" ?  g.Bold  : g.Regular , fontWeight : Platform.OS == "ios" ? "800": null ,                                         fontSize: 16,
                                        textAlign: 'center',
                                        width: (g.windowWidth - 80) / 2,
                                        color: '#E02020'
                                    }}>
                                    {g.CONTINUE}
                                </Text>
                                <View style={{ height: 35, width: 2, backgroundColor: g.Light_Gray }} />
                                <Text
                                    onPress={() => {
                                        this.setState({
                                            ModalAlert: false
                                        })
                                    }}

                                    style={{
                                        fontFamily: Platform.OS == "android" ?  g.Bold  : g.Regular , fontWeight : Platform.OS == "ios" ? "800": null ,                                         fontSize: 16,
                                        textAlign: 'center',
                                        width: (g.windowWidth - 80) / 2,
                                        color: g.Blue
                                    }}>
                                    رجوع
                                </Text>
                            </View>

                        </View>

                    </View>
                </ModalReactNative>


                <Modal
                    isOpen={this.state.modal}
                    swipeToClose={true}
                    backButtonClose={true}
                    coverScreen={true}
                    style={{
                        width: g.windowWidth,
                        height: g.windowHeight,
                        backgroundColor: '#00000020',
                    }}>

                    <View>
                        <View style={{
                            backgroundColor: g.white, height: g.windowHeight - 80,
                            borderTopLeftRadius: 35, borderTopRightRadius: 35,
                            marginTop: g.windowHeight - (g.windowHeight - 80),
                        }}>
                            <View
                                onStartShouldSetResponder={() => {
                                    this.setState({
                                        modal: !this.state.modal
                                    })
                                }}

                                style={{
                                    height: 5, backgroundColor: g.Light_Gray, width: 100,
                                    marginTop: 15, marginRight: 'auto', marginLeft: 'auto'
                                    , borderRadius: 10
                                }} />
                            {/*close bottom sheet*/}
                            <View style={{
                                flexDirection: 'row-reverse',
                                paddingHorizontal: 25, width: g.windowWidth,
                                justifyContent: 'space-between'
                            }}>
                                <Text style={[styleLogin.login, {
                                    marginRight: 0, marginTop: 15,
                                    fontSize: 20
                                }]}>
                                    {g.Vaccinations}
                                </Text>
                                <Icon name='close' type='Ionicons'
                                    style={{ fontSize: 22, marginTop: 15, }}
                                    onPress={() => {
                                        this.setState({
                                            modal: !this.state.modal
                                        })
                                    }}
                                />
                            </View>
                            <ModalVaccinations />
                        </View>
                    </View>

                </Modal>

            </View >
        );

    }
}
export default withNavigation(Visit);
