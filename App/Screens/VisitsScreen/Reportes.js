import VisitsStyle from './VisitsStyle';
import styleLogin from '../LoginScreen/style';
import ModalReportes from './ModalReportes';

import style from '../DealsScreen/style';
import React, { Component } from 'react';
import {
    Text, View, FlatList, TouchableOpacity
    , TouchableWithoutFeedback, 
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import Modal from 'react-native-modalbox';

const colors = [g.Date1, g.Date1, g.Date1
    , g.Date2, g.Date2, g.Date3, g.Date4, g.Date4, g.Date4]

class Reportes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab_1: true,
            tab_2: false,
            modal: false
        }

    }

    render() {

        return (
            <View>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row-reverse',
                    marginTop: 15, marginBottom: 15,
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                tab_1: true,
                                tab_2: false
                            })
                        }}
                        style={[
                            style.img_view,
                            {
                                borderWidth: .5, borderRadius: 20,
                                borderColor: this.state.tab_1 ? '#0070FF' : g.Light_Gray, transform: [{ rotateY: '180deg' }],
                                backgroundColor: this.state.tab_1 ? '#0070FF10' : 'white'
                            },
                        ]}>

                        <Text style={[style.title2, {
                            fontSize: 13, width: 110,
                            color: this.state.tab_1 ? g.Blue : g.Light_Gray

                        }]}>
                            {g.REQUESTDOCTOR}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                tab_2: true,
                                tab_1: false
                            })
                        }}
                        style={[
                            style.img_view,
                            {
                                width: 150,
                                borderColor: this.state.tab_2 ? '#0070FF' : g.Light_Gray,
                                borderWidth: .5, borderRadius: 20,
                                transform: [{ rotateY: '180deg' }],
                                backgroundColor: this.state.tab_2 ? '#0070FF10' : 'white'
                            },
                        ]}>

                        <Text style={[style.title2, {
                            fontSize: 13, width: 150,
                            color: this.state.tab_2 ? g.Blue : g.Light_Gray


                        }]}>
                            {g.WITHOUTDOCTOR}
                        </Text>
                    </TouchableOpacity>

                </View>
                <View style={{ height: hp('80%') }} >
                    <FlatList
                        key={(item) => { item.id }}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled
                        data={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
                        renderItem={({ item, index }) => (
                            <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                       //   this.props.handlePress()
                                       this.setState({
                                        modal: !this.state.modal
                                    })
                                    }}>
                                    <View style={[VisitsStyle.card, {
                                        width: wp('60%'), height: hp('13%'),
                                        alignItems: 'center'
                                    }]}>
                                        <Icon name="left" type="AntDesign"
                                            style={[VisitsStyle.arrow, { fontSize: 18, }]}

                                        />
                                        <View style={{
                                            flexDirection: 'column', marginLeft: 'auto'
                                        }}>
                                            <Text style={VisitsStyle.doctor_name}>
                                                CRP,CBC Urine ESR </Text>
                                            <Text style={[VisitsStyle.txt, { fontSize: 12 }]}>
                                                معمل المختبر
                                  </Text>

                                            <Text style={[VisitsStyle.txt, {
                                                fontSize: 12, color: g.Light_Gray,
                                            }]}>
                                                د. محمد سعدون
                                  </Text>
                                        </View>

                                    </View>
                                </TouchableWithoutFeedback>
                                <View
                                    style={[VisitsStyle.date,
                                    {
                                        backgroundColor: colors[index % colors.length],
                                        height: hp('13')
                                    }]}>

                                    <View
                                        elevation={4}

                                        style={{
                                            flexDirection: 'column', justifyContent: 'center'
                                            , alignItems: 'center', padding: 5
                                        }}>
                                        <View style={{
                                            backgroundColor:
                                                g.Blue, width: wp('15%'), flex: 1, marginTop: -5,
                                            borderTopLeftRadius: 10, borderTopRightRadius: 10
                                        }}>
                                            <Text style={[VisitsStyle.date_txt, {
                                                color: 'white',
                                                height: 100, padding: 0
                                            }]}>تحليل</Text>
                                        </View>
                                        <Text style={VisitsStyle.date_txt}>0 </Text>
                                        <Text style={VisitsStyle.month}> ديسمبر
                                 </Text>
                                        <Text style={VisitsStyle.month}>٢٠٢٠</Text>
                                    </View>

                                </View>
                                <View>
                                    <View style={{
                                        height: 20, width: 20, alignItems: 'center',
                                        margin: 11, padding: 5,

                                        borderRadius: 60, backgroundColor: g.Light_Gray
                                    }}>
                                        <View style={{
                                            height: 10, width: 10,
                                            borderRadius: 60, backgroundColor: g.Gray
                                        }} />
                                    </View>

                                    <View style={{
                                        flexDirection: 'column', justifyContent: 'center'
                                        , alignItems: 'center',
                                        height: hp('7'),
                                        marginTop: 0
                                    }}>


                                        <Text style={{
                                            width: 2, lineHeight: 10,
                                            transform: [{ rotate: '180deg' }],
                                            marginTop: 0,
                                            height: hp('10'),


                                        }}>|{'\n'}|{'\n'}|{'\n'}|{'\n'}{'\n'}|{'\n'}</Text>

                                    </View>
                                </View>
                            </View>
                        )} />
                </View>
                {/*** Modal Reports*/}

                <Modal
                    //      transparent={true}
                    isOpen={this.state.modal}
                    swipeToClose={true}
                    backButtonClose={true}
                    coverScreen={true}
                    style={{

                        width: g.windowWidth,
                        height: g.windowHeight,
                        backgroundColor: '#00000020',
                    }}
                >

                        <View>
                            <View style={{
                                backgroundColor: g.white, height: g.windowHeight - 250,
                                borderTopLeftRadius: 35, borderTopRightRadius: 35,
                                marginTop: g.windowHeight - (g.windowHeight - 250),
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
                                        {g.DETAILS_OF_REPORT}
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
                                <ModalReportes />
                            </View>
                        </View>

                </Modal>
            </View>
        );

    }
}
export default withNavigation(Reportes);
