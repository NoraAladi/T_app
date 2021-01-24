import styleLogin from '../LoginScreen/style';
import headerStyle from '../DealsScreen/style';

import React, { Component } from 'react';
import {
    Text, View, ScrollView, TextInput,
    TouchableOpacity, Platform, ImageBackground,
    I18nManager, KeyboardAvoidingView, FlatList, Dimensions, Image

} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import AsyncStorage from '@react-native-community/async-storage';
import {

    UIActivityIndicator,
} from 'react-native-indicators';
import BottomSheet from 'reanimated-bottom-sheet';
import UserFooter from '../../Navigation/UserFooter';
import Medical_Status from './Medical_Status';
import Tretment from './Tretment';
import Reportes from './Reportes';
import VisitsStyle from './VisitsStyle';
import { ArabicNumbers } from 'react-native-arabic-numbers';
import Modal from 'react-native-modalbox';
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
            modal: false

        };
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


   
    render() {

        return (
            <View
                style={{ flex: 1, zIndex: -1, }}

            >
            
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
                            <Icon name="arrow-drop-down" type="MaterialIcons"
                                style={headerStyle.arrow} />
                            <Image source={require('../../Images/profile.png')}
                                style={headerStyle.userimg} />
                            <View style={headerStyle.view1}>
                                <Text style={headerStyle.username}> هشام مهدي </Text>
                                <Text style={headerStyle.code}>SA877832  </Text>
                            </View>
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
                                paddingVertical: 5,
                                textAlign: 'center',
                                fontSize: 14,
                                fontFamily: g.Bold,
                                marginTop: 3,
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
                                fontSize: 14,
                                fontFamily: g.Bold,
                                marginTop: 3,
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
                                fontFamily: g.Bold,
                                marginTop: 3,
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
                                <Medical_Status />
                                : this.state.tabSelected_2 ?
                                    <Tretment />
                                    : this.state.tabSelected_3 ?
                                        <Reportes />
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
            </View>
        );

    }
}
export default withNavigation(Visits);
