import styleLogin from '../LoginScreen/style';
import headerStyle from '../DealsScreen/style';
import React, { Component } from 'react';
import {
    Text, View, ScrollView, TextInput,
    TouchableOpacity, Platform, ImageBackground,
    I18nManager, Modal, KeyboardAvoidingView, FlatList, Dimensions, Image
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import AsyncStorage from '@react-native-community/async-storage';
import {

    UIActivityIndicator,
} from 'react-native-indicators';

import VisitsStyle from './VisitsStyle';
import { ArabicNumbers } from 'react-native-arabic-numbers';
import ModalSearch from './ModalSearch';
import { connect } from 'react-redux'
import Spinner from '../../Navigation/Spinner'
import { Get_visit_Details } from '../../Actions/_get_visit_details';


class ModalTreatments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details_component: true,
            search_component: false
        };
    }
    componentDidMount() {
        this.props.Get_visit_Details(this.props.clinicId)
    }

    closeModal = () => {
        this.props.closeModal()
    }

    backModal = () => {
        this.setState({
            details_component: true,
            search_component: false
        })
    }
    render() {
        return (
            <View >
                {
                    this.props.loading_details ?
                        <View style={{ marginTop: hp('35%') }} >
                            <Spinner />
                        </View>


                        :
                        this.props.visit_details == '' ?
                            <Text style={style.no_data}>
                                {g.NO_DATA}
                            </Text>
                            :
                            <View>

                                {this.state.details_component ?
                                    <View style={{ height: '100%' }}>
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
                                                {g.DETECTION_DETAILS}
                                            </Text>
                                            <Icon name='close' type='Ionicons'
                                                style={{ fontSize: 22, marginTop: 15, }}
                                                onPress={() => {
                                                    this.props.closeModal()
                                                }}
                                            />
                                        </View>
                                        <ScrollView nestedScrollEnabled
                                            showsVerticalScrollIndicator={false}

                                        >
                                            <TouchableOpacity activeOpacity={1} >
                                                {/**content */}
                                                <View style={{ marginLeft: 'auto', paddingHorizontal: 40, marginTop: 10 }}>
                                                    {/**light title */}
                                                    <Text style={[VisitsStyle.txt, {
                                                        fontSize: 12, color: g.Light_Gray,
                                                    }]}>
                                                        {g.Detection_Date}
                                                    </Text>
                                                    {/**Dark Details */}
                                                    <Text style={[VisitsStyle.txt, {}]}
                                                    >
                                                        {this.props.visit_details.date.split('T')[0]}
                                                    </Text>
                                                </View>

                                                {/**line */}
                                                <View style={{
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    width: g.windowWidth
                                                }}>
                                                    <View style={{
                                                        backgroundColor: g.Light_Gray, width: g.windowWidth - 80, height: 1,
                                                        marginTop: 10, marginBottom: 10,
                                                    }} />
                                                </View>


                                                {/**light title */}
                                                <Text style={[VisitsStyle.txt, {
                                                    fontSize: 12, color: g.Light_Gray, marginLeft: 'auto', paddingHorizontal: 40,
                                                }]}>
                                                    {g.Physician}
                                                </Text>

                                                <View style={{
                                                    flexDirection: 'row-reverse', marginTop: 5, paddingHorizontal: 40,
                                                    justifyContent: 'center'
                                                }}>
                                                    <Image source={require('../../Images/user.png')}
                                                        style={{ width: 55, height: 55, borderRadius: 25 }}
                                                    />

                                                    <View style={{ paddingHorizontal: 20 }}>
                                                        {/**Dark Details */}
                                                        <Text style={[VisitsStyle.txt, { fontSize: 16 }]}>
                                                          {this.props.visit_details.doctor.fullNameAr}

                        </Text>
                                                        <Text style={[VisitsStyle.txt, { fontSize: 12, fontFamily: g.Regular }]}>
                                                        {this.props.visit_details.doctor.speciality.specialityNameAr}    
                        </Text>
                                                    </View>
                                                </View>
                                                {/**line */}
                                                <View style={{
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    width: g.windowWidth
                                                }}>
                                                    <View style={{
                                                        backgroundColor: g.Light_Gray, width: g.windowWidth - 80, height: 1,
                                                        marginTop: 10, marginBottom: 10,
                                                    }} />
                                                </View>

                                                <View style={{ marginLeft: 'auto', paddingHorizontal: 40 }}>
                                                    {/**light title */}
                                                    <Text style={[VisitsStyle.txt, {
                                                        fontSize: 12, color: g.Light_Gray,
                                                    }]}>
                                                        {g.PATIENT_COMPLAIN}
                                                    </Text>
                                                    {/**Dark Details */}
                                                    <Text style={[VisitsStyle.txt, {}]}
                                                    >
                                                        {this.props.visit_details.complain}
                            </Text>
                                                </View>

                                                {/**line */}
                                                <View style={{
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    width: g.windowWidth
                                                }}>
                                                    <View style={{
                                                        backgroundColor: g.Light_Gray, width: g.windowWidth - 80, height: 1,
                                                        marginTop: 10, marginBottom: 10,
                                                    }} />
                                                </View>




                                                <View style={{ marginLeft: 'auto', paddingHorizontal: 40 }}>
                                                    {/**light title */}
                                                    <Text style={[VisitsStyle.txt, {
                                                        fontSize: 12, color: g.Light_Gray,
                                                    }]}>
                                                        {g.DIAGNOSIS}
                                                    </Text>
                                                    {/**Dark Details */}
                                                    <Text style={[VisitsStyle.txt, {}]}
                                                    >
                                                      {this.props.visit_details.diagnosis}
                            </Text>
                                                </View>

                                                {/**line */}
                                                <View style={{
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    width: g.windowWidth
                                                }}>
                                                    <View style={{
                                                        backgroundColor: g.Light_Gray, width: g.windowWidth - 80, height: 1,
                                                        marginTop: 10, marginBottom: 10,
                                                    }} />
                                                </View>



                                                <View style={{ marginLeft: 'auto', paddingHorizontal: 40 }}>
                                                    {/**light title */}
                                                    <Text style={[VisitsStyle.txt, {
                                                        fontSize: 12, color: g.Light_Gray,
                                                    }]}>
                                                        {g.DIAGNOSIS}
                                                    </Text>
                                                    {/**Dark Details */}
                                                    <Text style={[VisitsStyle.txt, {}]}
                                                    >
                                                      {this.props.visit_details.prescriptionMedicine}  
                            </Text>
                                                </View>


                                                <TouchableOpacity style={[styleLogin.btn, { marginTop: hp('3') }]}
                                                    onPress={async () => {
                                                        this.setState({
                                                            details_component: false,
                                                            search_component: true
                                                        })
                                                    }}>
                                                    <Text style={[styleLogin.txt_btn,]}>
                                                        {g.PRESCRIPTION_EXCHANGE}</Text>
                                                </TouchableOpacity>

                                                <View style={{ height: 80 }}></View>
                                            </TouchableOpacity>
                                        </ScrollView>
                                    </View>
                                    :

                                    <ModalSearch backModal={this.backModal} closeModal={this.closeModal} />

                                }
                            </View>
                }
            </View>

        );
    }
}

const mapStateToProps = state => {
    return {
        loading_details: state.visit_detail.loading_details,
        visit_details: state.visit_detail.visit_details,
    }
}

export default connect(mapStateToProps, { Get_visit_Details })(withNavigation(ModalTreatments));


