import VisitsStyle from './VisitsStyle';
import React, { Component } from 'react';
import {
    Text, View, FlatList, TouchableOpacity,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import Modal from 'react-native-modalbox';
import ModalTreatments from './ModalTreatments';
import moment from 'moment'
import { connect } from 'react-redux'
import Spinner from '../../Navigation/Spinner'
import { Get_visit } from '../../Actions/_get_visit';
import { Get_visit_Details } from '../../Actions/_get_visit_details';
import AsyncStorage from '@react-native-community/async-storage';


const colors = [g.Date1, g.Date1, g.Date1
    , g.Date2, g.Date2, g.Date3, g.Date4, g.Date4, g.Date4]

class Tretment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false, clinicId: 0,
            visit: [],
            isRefresh: false
        }
    }

    closeModal = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    async componentDidMount() {
        await this.props.Get_visit(1)
        this.setState({
            visit: this.props.visit
        })

    }
    async onRefresh() {
        this.setState({ isRefresh: true, })
        await this.props.Get_visit(1)
        await this.setState({
            visit: this.props.visit,
            isRefresh: false
        })
    }

    render() {
        return (

            <View>
                {
                    this.props.loading ?
                        <View style={{ marginTop: hp('35%') }} >
                            <Spinner />
                        </View>

                        :
                        this.state.visit == '' ?
                            <Text style={VisitsStyle.no_data}>
                                {g.NO_DATA}
                            </Text>
                            :
                            <View style={{ height: hp('80%') }} >
                                <FlatList
                                    onRefresh={() => this.onRefresh()}
                                    refreshing={this.state.isRefresh}
                                    key={(item) => { item.id }}
                                    showsVerticalScrollIndicator={false}
                                    nestedScrollEnabled
                                    data={this.state.visit}
                                    renderItem={({ item, index }) => (
                                        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                                            <TouchableOpacity activeOpacity={1}
                                                onPress={() => {
                                                    this.setState({
                                                        modal: !this.state.modal
                                                    })
                                                    this.setState({
                                                        clinicId: item.clinicVisitId
                                                    })
                                                    AsyncStorage.setItem('clinicId', String(item.clinicVisitId))

                                                }}
                                            >
                                                <View style={[VisitsStyle.card, {
                                                    width: wp('60%'), height: hp('12%'),
                                                    alignItems: 'center'
                                                }]}>
                                                    <Icon name="left" type="AntDesign"
                                                        style={[VisitsStyle.arrow, { fontSize: 18 }]} />
                                                    <View style={{ flexDirection: 'column', marginLeft: 'auto' }}>
                                                        <Text style={VisitsStyle.doctor_name}>
                                                            {item.titleAr+' '+item.doctorNameAr}</Text>
                                                        <Text style={[VisitsStyle.txt, { fontSize: 12 }]}>
                                                            {item.titlePreSpecialityAR+' '+item.doctorSpecilityAr}
                                                        </Text>
                                                    </View>

                                                </View>
                                            </TouchableOpacity>
                                            <View
                                                style={[VisitsStyle.date, { backgroundColor: colors[index % colors.length] }]}>

                                                <View
                                                    elevation={4}

                                                    style={{
                                                        flexDirection: 'column', justifyContent: 'center'
                                                        , alignItems: 'center',
                                                    }}>
                                                    <Text style={VisitsStyle.date_txt}>{
                                                        moment(item.date).format('DD')}</Text>
                                                    <Text style={VisitsStyle.month}>
                                                        {moment(item.date).format('MMM')}
                                                    </Text>
                                                    <Text style={VisitsStyle.month}>{moment(item.date).format('yy')}</Text>
                                                </View>

                                            </View>
                                            <View style={{height:'12%'}}>
                                                <View style={{
                                                    height: 20, width: 20, alignItems: 'center',
                                                    margin: 11, padding: 5,
                                                    borderRadius: 60, backgroundColor: g.Light_Gray,
                                                }}>
                                                    <View style={{
                                                        height: 10, width: 10,
                                                        borderRadius: 60, backgroundColor: g.Gray
                                                    }} />
                                                </View>

                                                <View style={{
                                                    flexDirection: 'column', justifyContent: 'center'
                                                    , alignItems: 'center',
                                                    //height: hp('4'),
                                                    marginTop: 0
                                                }}>


                                                    <Text style={{
                                                        width: 2, lineHeight: 7,
                                                        marginLeft:3,
                                                        transform: [{ rotate: '180deg' }]

                                                    }}>|{'\n'}|{'\n'}|{'\n'}|</Text>

                                                </View>
                                            </View>
                                        </View>
                                    )} />
                            </View>

                }
                <Modal
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
                            backgroundColor: g.white, height: g.windowHeight - 80,
                            borderTopLeftRadius: 35, borderTopRightRadius: 35,
                            marginTop: g.windowHeight - (g.windowHeight - 80),
                        }}>
                            <View

                                style={{
                                    height: 5, backgroundColor: g.Light_Gray, width: 100,
                                    marginTop: 15, marginRight: 'auto', marginLeft: 'auto'
                                    , borderRadius: 10
                                }} />

                            <ModalTreatments clinicId={this.state.clinicId} closeModal={this.closeModal} />
                        </View>
                    </View>

                </Modal>
            </View>
        );

    }
}

const mapStateToProps = state => {
    return {
        loading: state.visits.loading,
        visit: state.visits.visit,

        user: state.auth.user,

    }
}

export default connect(mapStateToProps, { Get_visit, Get_visit_Details })(withNavigation(Tretment));


