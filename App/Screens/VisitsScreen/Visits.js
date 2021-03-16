import headerStyle from '../DealsScreen/style';

import React, { Component } from 'react';
import {
    Text, View, ScrollView,
    TouchableOpacity, Platform, Dimensions, Image

} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import g from '../../Gloabal';
import AsyncStorage from '@react-native-community/async-storage';
import {

    UIActivityIndicator,
} from 'react-native-indicators';
import UserFooter from '../../Navigation/UserFooter';
import Medical_Status from './Medical_Status';
import Tretment from './Tretment';
import Reportes from './Reportes';
import Modal from 'react-native-modalbox';
import ModalAddUser from '../../Navigation/ModalAddUser';
class Visits extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            tabSelected_1: true,
            tabSelected_2: false,
            tabSelected_3: false,
            heightWithScroll: g.windowHeight,
            elevation: true,
            modal: false,
            Flag: false,
            refreshKey: false,
            personalPhoto: ''



        };
        AsyncStorage.getItem('patientCode').then(val => {
            this.setState({
                code: val
            })
        })

        AsyncStorage.getItem('patientName').then(val => {
            this.setState({
                name: val
            })
        })

        AsyncStorage.getItem('personalPhoto').then(val => {
            if (val != 'null') {
                this.setState({
                    personalPhoto: val
                })
            }


        })
    }

    _close_model() {
        this.setState({
            Flag: false
        })
    }

    refreshKey = () => {
        this.setState({
            refreshKey: !this.state.refreshKey
        })
    }


    componentDidMount() {
        this.props.navigation.addListener('willFoucs', () => {
            console.log("willFocus runs") // calling it here to make sure it is logged at every time screen is focused after initial start
        });
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


    setData = (name, code, personalPhoto) => {
        this.setState({
            name: name,
            code: code,
            personalPhoto: personalPhoto
        })
    }
    render() {

        return (
            <View style={{ flex: 1, zIndex: -1, }}>

                <View style={[headerStyle.container, {
                    flexDirection: 'column', zIndex: -1,
                    elevation: this.state.elevation ? 3 : 0
                }]}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: g.windowWidth,
                        paddingHorizontal: 10
                    }}>
                        <View style={{ flexDirection: 'row', marginTop: 20, }}>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    Flag: true
                                })

                            }}>
                                <Icon name="arrow-drop-down" type="MaterialIcons"
                                    style={headerStyle.arrow} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => {
                                this.props.navigation.navigate('ProfileScreen')
                            }}>
                                <Image
                                    key={this.state.personalPhoto}
                                    source={this.state.personalPhoto ? { uri: this.state.personalPhoto } : require('../../Images/noUser.png')}
                                    style={headerStyle.userimg} />
                                <View style={headerStyle.viewHeader}>
                                    <Text style={[headerStyle.username, { textAlign: 'left' }]}> {' ' + this.state.name} </Text>
                                    <Text style={headerStyle.code}>{this.state.code}  </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <Text style={[headerStyle.offer, {
                            marginTop: 'auto',
                            marginBottom: 'auto',
                            marginLeft: 0,
                        }]}>{g.MEDICALLOG}</Text>
                    </View>


                    <View style={{
                        width: g.windowWidth,
                        flexDirection: 'row-reverse',
                        justifyContent: 'space-around',
                        marginTop: 5,
                        paddingHorizontal: 10,

                    }}>
                        <View
                            style={{ justifyContent: 'center', alignItems: 'center' }}
                            onStartShouldSetResponder={async () => {
                                await AsyncStorage.setItem('Tab', 'USER_DATA')
                                this.setState({
                                    tabSelected_1: true,
                                    tabSelected_2: false,
                                    tabSelected_3: false,
                                })
                            }}>
                            <Text style={{
                                width: g.windowWidth / 3,
                                height: Platform.OS == "ios" ? 40 : null,
                                paddingVertical: 5,
                                textAlign: 'center',
                                fontSize: 14,
                                fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null, marginTop: 3,
                                borderBottomColor: this.state.tabSelected_1 ? g.Blue : g.Light_Gray,
                                borderBottomWidth: this.state.tabSelected_1 ? 3 : 0,
                                color: this.state.tabSelected_1 ? g.Blue : 'black'
                            }}>{g.MEDICAL_STATUS}</Text>
                        </View>



                        <View
                            style={{ justifyContent: 'center', alignItems: 'center' }}
                            onStartShouldSetResponder={async () => {
                                await AsyncStorage.setItem('Tab', 'MEDICAL_DATA')
                                this.setState({
                                    tabSelected_1: false,
                                    tabSelected_2: true,
                                    tabSelected_3: false,
                                })
                            }}>

                            <Text style={{
                                width: g.windowWidth / 3,
                                paddingVertical: 5,
                                textAlign: 'center',
                                height: Platform.OS == "ios" ? 40 : null,
                                fontSize: 14,
                                fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null, marginTop: 3,
                                borderBottomColor: this.state.tabSelected_2 ? g.Blue : g.Light_Gray,
                                borderBottomWidth: this.state.tabSelected_2 ? 3 : 0,
                                color: this.state.tabSelected_2 ? g.Blue : 'black'

                            }}>{g.Disclosures}</Text>
                        </View>

                        <View
                            style={{ justifyContent: 'center', alignItems: 'center' }}
                            onStartShouldSetResponder={async () => {
                                await AsyncStorage.setItem('Tab', 'MEDICAL_DATA')
                                this.setState({
                                    tabSelected_1: false,
                                    tabSelected_2: false,
                                    tabSelected_3: true,
                                })
                            }}>

                            <Text style={{
                                width: g.windowWidth / 3,
                                paddingVertical: 5,
                                textAlign: 'center',
                                fontSize: 14,
                                height: Platform.OS == "ios" ? 40 : null,

                                fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null, marginTop: 3,
                                borderBottomColor: this.state.tabSelected_3 ? g.Blue : g.Light_Gray,
                                borderBottomWidth: this.state.tabSelected_3 ? 3 : 0,
                                color: this.state.tabSelected_3 ? g.Blue : 'black'

                            }}>{g.REPORTES}</Text>
                        </View>
                    </View>





                </View>

                <ScrollView
                    onContentSizeChange={(width, height) => {
                        this.scrollListReftop.scrollTo({ x: 0, y: 0, animated: true })
                        this.find_dimesions(width, height)
                    }}
                    ref={(ref) => { this.scrollListReftop = ref; }}
                    showsVerticalScrollIndicator={false}>

                    <View style={{ zIndex: -1, }}>



                        {
                            this.state.tabSelected_1 ?
                                <Medical_Status key={this.state.refreshKey} />
                                : this.state.tabSelected_2 ?
                                    <Tretment key={this.state.refreshKey} />
                                    : this.state.tabSelected_3 ?
                                        <Reportes key={this.state.refreshKey} />
                                        : null
                        }
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

                </ScrollView>
                <UserFooter tab={2} />
                {
                    this.state.Flag ?
                        <ModalAddUser
                            refreshKey={this.refreshKey}
                            setData={this.setData}
                            closeModel={() => this._close_model()} /> : null
                }
            </View>
        );

    }
}
export default withNavigation(Visits);
