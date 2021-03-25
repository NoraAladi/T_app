import VisitsStyle from './VisitsStyle';
import styleLogin from '../LoginScreen/style';
import ModalReportes from './ModalReportes';

import style from '../DealsScreen/style';
import React, { Component } from 'react';
import {
    Text, View, FlatList, TouchableOpacity
    , TouchableWithoutFeedback, Platform
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import Modal from 'react-native-modalbox';

import { connect } from 'react-redux'
import Spinner from '../../Navigation/Spinner'
import { Get_Reportes } from '../../Actions/_get_reportes';
import moment from 'moment'
import { get_reportDetails } from '../../Actions/get_reportDetails';
import { ScrollView } from 'react-native-gesture-handler';

const colors = [g.Date1, g.Date1, g.Date1
    , g.Date2, g.Date2, g.Date3, g.Date4, g.Date4, g.Date4]

class Reportes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab_1: true,
            tab_2: false,
            modal: false,
            date: moment().format('DD-MM-YYYY'),
            reportes: [],
            isRefresh: false,
            typeOfReport: '',
            loading: true

        }

    }

    async componentDidMount() {

        await this.props.Get_Reportes(1, this.state.tab_1)
        await this.setState({
            reportes: this.props.reportes,
            loading: false
        })

    }

    async onRefresh() {
        this.setState({ isRefresh: true, })
        await this.props.Get_Reportes(1, true)
        await this.setState({
            reportes: this.props.reportes,
            isRefresh: false,
            tab_1: true,
            tab_2: false,
        })
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
                        onPress={async () => {
                            this.setState({
                                tab_1: true,
                                tab_2: false,
                                loading: true
                            })
                            await this.props.Get_Reportes(1, true)
                            await this.setState({
                                reportes: this.props.reportes,
                                loading: false
                            })
                        }}
                        style={[
                            style.img_view,
                            {
                                borderWidth: .5, borderRadius: 20,
                                borderColor: this.state.tab_1 ? '#0070FF' : g.Light_Gray,
                                transform: Platform.OS == "android" ? [{ rotateY: '180deg' }] : [{ rotateY: '0deg' }],
                                backgroundColor: this.state.tab_1 ? '#0070FF10' : 'white'
                            },
                        ]}>

                        <Text style={[style.title2, {
                            fontSize: 13, width: 100, height: undefined, marginTop: 0,
                            color: this.state.tab_1 ? g.Blue : g.Light_Gray

                        }]}>
                            {'بطلب طبيب'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={async () => {
                            await this.setState({
                                tab_2: true,
                                tab_1: false,
                                loading: true
                            })
                            await this.props.Get_Reportes(1, false)
                            await this.setState({
                                reportes: this.props.reportes,
                                loading: false
                            })
                        }}
                        style={[
                            style.img_view,
                            {
                                borderColor: this.state.tab_2 ? '#0070FF' : g.Light_Gray,
                                borderWidth: .5, borderRadius: 20,
                                transform: Platform.OS == "android" ? [{ rotateY: '180deg' }] : [{ rotateY: '0deg' }], backgroundColor: this.state.tab_2 ? '#0070FF10' : 'white'
                            },
                        ]}>

                        <Text style={[style.title2, {
                            fontSize: 13, width: 100, height: undefined, marginTop: 0,
                            color: this.state.tab_2 ? g.Blue : g.Light_Gray
                        }]}>
                            {'شخصي'}
                        </Text>
                    </TouchableOpacity>

                </View>
                {
                    this.state.loading ?
                        <View style={{ marginTop: hp('35%') }} >
                            <Spinner />
                        </View>

                        :
                        this.state.reportes == ''
                            ?
                            <Text style={style.no_data}>
                                {g.NO_DATA}
                            </Text>
                            :
                            <View style={{ height: hp('80%') }} >
                                <FlatList
                                    key={(item) => { item.id }}
                                    onRefresh={() => this.onRefresh()}
                                    refreshing={this.state.isRefresh}
                                    showsVerticalScrollIndicator={false}
                                    nestedScrollEnabled
                                    data={this.state.reportes}
                                    extraData={this.state}
                                    renderItem={({ item, index }) => (
                                        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                                            <TouchableWithoutFeedback
                                                onPress={async () => {
                                                    await this.props.get_reportDetails(item.reportType, item.reportIds,this.state.tab_1)
                                                    //   this.props.handlePress()
                                                    this.setState({
                                                        typeOfReport: item.reportType,
                                                        date: moment(item.clinicVisitDate).format('YYYY-MM-DD'),
                                                        modal: !this.state.modal
                                                    })
                                                }}>
                                                <View style={[VisitsStyle.card, {
                                                    width: wp('60%'), height: hp('13%'),
                                                    justifyContent: 'space-between', alignItems: 'center'
                                                }]}>
                                                    <Icon name="left" type="AntDesign"
                                                        style={[VisitsStyle.arrow, { fontSize: 18, }]}

                                                    />
                                                    <View style={{
                                                        width: 200,
                                                        padding: 10,
                                                        paddingHorizontal: 34,

                                                    }}>
                                                        <Text style={{
                                                            textAlign: 'right',
                                                            fontFamily: g.Regular,
                                                            color: g.Blue,
                                                            marginBottom: 5,
                                                        }}
                                                            numberOfLines={2}
                                                        >
                                                            {item.reportNames} </Text>

                                                        {this.state.tab_1 ?
                                                            <Text style={{
                                                                textAlign: 'right',
                                                                fontFamily: g.Regular,
                                                                fontSize: 12,
                                                                color: g.Light_Gray,
                                                            }}>

                                                                {item.doctorTitle + ' '} {item.doctorName}

                                                            </Text>
                                                            : null}
                                                    </View>

                                                </View>
                                            </TouchableWithoutFeedback>
                                            <View
                                                style={[VisitsStyle.date,
                                                {
                                                    backgroundColor: colors[index % colors.length],
                                                    justifyContent: 'space-between',
                                                    height: hp('14')
                                                }]}>

                                                <View
                                                    elevation={4}

                                                    style={{
                                                        flexDirection: 'column'
                                                        , alignItems: 'center',
                                                    }}>
                                                    <View style={{
                                                        backgroundColor: g.Blue, width: wp('15%'),
                                                        //  height:30,
                                                        borderTopLeftRadius: 10, borderTopRightRadius: 10
                                                    }}>
                                                        <Text style={[VisitsStyle.date_txt, {
                                                            color: 'white',
                                                            height: undefined, padding: 3
                                                        }]}>{item.reportType == 'RAD' ? 'أشعة' : 'تحليل'}</Text>
                                                    </View>
                                                    <Text style={VisitsStyle.month}>{moment(item.clinicVisitDate).format('DD')} </Text>
                                                    <Text style={[VisitsStyle.month]}>{moment(item.clinicVisitDate).format('MMM')}
                                                    </Text>
                                                    <Text style={VisitsStyle.month}>{moment(item.clinicVisitDate).format('yy')}</Text>
                                                </View>

                                            </View>
                                            <View style={{ height: '13%' }}>
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
                                                        marginLeft: 2,
                                                        height: hp('10'),
                                                        color: g.Light_Gray


                                                    }}>|{'\n'}|{'\n'}|{'\n'}|{'\n'}{'\n'}|{'\n'}</Text>

                                                </View>
                                            </View>
                                        </View>
                                    )} />
                            </View>
                }
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
                            backgroundColor: g.white, height: g.windowHeight - 50,
                            borderTopLeftRadius: 35, borderTopRightRadius: 35,
                            marginTop: g.windowHeight - (g.windowHeight - 50),
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
                            <ScrollView>
                                <ModalReportes reportDetails={this.props.reportDetails}
                                    date={this.state.date}
                                    typeOfReport={this.state.typeOfReport}
                                    walkon={this.state.tab_1}
                                />
                            </ScrollView>
                        </View>
                    </View>

                </Modal>
            </View>
        );

    }
}

const mapStateToProps = state => {
    return {
        loading: state.report.loading,
        reportes: state.report.reportes,
        reportDetails: state.reportDetails.reportDetails,

        user: state.auth.user,

    }
}

export default connect(mapStateToProps, { Get_Reportes, get_reportDetails })(withNavigation(Reportes));

