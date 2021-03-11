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
            isRefresh: false
        }

    }

    async componentDidMount() {
        await this.props.Get_Reportes(1)
        await this.setState({
            reportes: this.props.reportes
        })

    }

    async onRefresh() {
        this.setState({ isRefresh: true, })
        await this.props.Get_Reportes(1)
        await this.setState({
            reportes: this.props.reportes,
            isRefresh: false
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
                                borderColor: this.state.tab_1 ? '#0070FF' : g.Light_Gray,
                                transform: Platform.OS == "android" ? [{ rotateY: '180deg' }] : [{ rotateY: '0deg' }],
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
                                transform: Platform.OS == "android" ? [{ rotateY: '180deg' }] : [{ rotateY: '0deg' }], backgroundColor: this.state.tab_2 ? '#0070FF10' : 'white'
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
                {
                    this.props.loading ?
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
                                    renderItem={({ item, index }) => (
                                        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                                            <TouchableWithoutFeedback
                                                onPress={async () => {
                                                    await this.props.get_reportDetails(item.reportType, item.reportIds)
                                                    //   this.props.handlePress()
                                                    this.setState({
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
                                                        paddingHorizontal: 25,

                                                    }}>
                                                        <Text style={{
                                                            textAlign: 'right',
                                                            fontFamily: g.Regular,
                                                            color: g.Blue,
                                                            marginBottom: 5,
                                                        }}>
                                                            {item.reportNames} </Text>


                                                        <Text style={{
                                                            textAlign: 'right',
                                                            fontFamily: g.Regular,
                                                            fontSize: 12,
                                                            color: g.Light_Gray,
                                                        }}>

                                                            {item.doctorTitle + ' '} {item.doctorName}

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
                                                        }]}>{item.reportType == 'RAD' ? 'تحليل' : 'اشعة'}</Text>
                                                    </View>
                                                    <Text style={VisitsStyle.date_txt}>{moment(item.clinicVisitDate).format('DD')} </Text>
                                                    <Text style={[VisitsStyle.month, { marginRight: 10, }]}>  {moment(item.clinicVisitDate).format('MMM')}
                                                    </Text>
                                                    <Text style={VisitsStyle.month}>{moment(item.clinicVisitDate).format('yy')}</Text>
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
                            <ModalReportes reportDetails={this.props.reportDetails}
                                date={this.state.date}
                            />
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

