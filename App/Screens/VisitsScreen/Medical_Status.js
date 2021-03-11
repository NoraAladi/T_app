import VisitsStyle from './VisitsStyle';
import styleLogin from '../LoginScreen/style';

import React, { Component } from 'react';
import {
    Text, View, ScrollView, Image, Dimensions, FlatList,
    TouchableOpacity, Platform,
    Modal as ModalReactNative

} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import ToggleSwitch from 'toggle-switch-react-native'
import DataHidden from './DataHidden';
import Modal from 'react-native-modalbox';
import ModalVaccinations from "./ModalVaccinations";
import { connect } from 'react-redux'
import Spinner from '../../Navigation/Spinner'
import { Get_GenericHealthProfile } from '../../Actions/GenericHealthProfile_Action';
import { getHealthStatus } from '../../Actions/getStatus';
import { putHealthStatus } from '../../Actions/putStatus';


import RenderCard from './renderCard';
import AsyncStorage from '@react-native-community/async-storage';


const images = [require('../../Images/img2.png'),
require('../../Images/img3.png'),
require('../../Images/img4.png'),
require('../../Images/img5.png'),
require('../../Images/img1.png'),
require('../../Images/img6.png'),
require('../../Images/img7.png'), require('../../Images/img8.png'),
require('../../Images/img9.png'), require('../../Images/img10.png'),
require('../../Images/img11.png'),]


class Visit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false,
            ModalAlert: false,
            modal: false,
            GenericHealthProfile: [],
            HealthProfileCIMedecines: [],
            HealthProfileChronicDiseases: [],
            HealthProfilePrescribedMedicines: [],

            ChildVaccination: [],
            ChildGrowthChart: [],

            loader: true,
            typeModal: true
        }


    }
    async componentDidMount() {

        await this.props.getHealthStatus()
        this.setState({ toggle: this.props.healthStatus })

        const id = await AsyncStorage.getItem('dependentId')
        await this.props.Get_GenericHealthProfile('GenericHealthProfile')
        await this.setState({ GenericHealthProfile: this.props.GenericHealthProfile })

        await this.props.Get_GenericHealthProfile('HealthProfileCIMedecines')
        await this.setState({ HealthProfileCIMedecines: this.props.GenericHealthProfile })

        await this.props.Get_GenericHealthProfile('HealthProfileChronicDiseases')
        await this.setState({ HealthProfileChronicDiseases: this.props.GenericHealthProfile })

        await this.props.Get_GenericHealthProfile('HealthProfilePrescribedMedicines')
        await this.setState({ HealthProfilePrescribedMedicines: this.props.GenericHealthProfile })

        await this.props.Get_GenericHealthProfile(`ChildVaccination`)
        await this.setState({ ChildVaccination: this.props.GenericHealthProfile })

        await this.props.Get_GenericHealthProfile(`ChildGrowthChart`)
        await this.setState({ ChildGrowthChart: this.props.GenericHealthProfile })

        await this.setState({
            loader: false
        })
    }
    openModal = (type) => {
        this.setState({
            modal: true,
            typeModal: type
        })

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
                                await this.props.putHealthStatus(!this.props.healthStatus)
                                //   alert(this.props.status)
                                   if (this.props.status == 200) {
                                       await this.props.getHealthStatus()
                                       this.setState({
                                           toggle: this.props.healthStatus
                                       }) 
                                   }
                            }

                        }}
                    />
                </View>
                {this.state.toggle ? <DataHidden /> :
                    this.state.loader ?
                        <View style={{ marginTop: hp('35') }}>
                            <Spinner />
                        </View>
                        :

                        <ScrollView >
                            <RenderCard
                                title={'الامراض المزمنة'}
                                show={'no'}
                                data={this.state.HealthProfileChronicDiseases}
                                image={images[0]}
                            />
                            <RenderCard
                                title={'الادوية الممنوعة'}
                                show={'no'}
                                data={this.state.HealthProfileCIMedecines}
                                image={images[1]}
                            />

                            <RenderCard
                                title={'عمليات جراحية'}
                                show={'no'}
                                data={this.state.GenericHealthProfile.surgicalProcedures}
                                image={images[2]}
                            />

                            <RenderCard
                                title={'الاجراءات الغير جراحية'}
                                show={'no'}
                                data={this.state.GenericHealthProfile.nonInvasiveProcedures}
                                image={images[3]}
                            />

                            <RenderCard
                                title={'الحساسية'}
                                show={'no'}
                                data={this.state.GenericHealthProfile.allergies}
                                image={images[4]}
                            />

                            <RenderCard
                                title={'الامراض الوراثية'}
                                show={'no'}
                                data={this.state.GenericHealthProfile.genetics}
                                image={images[5]}
                            />


                            <RenderCard
                                title={'تاريخ العائلة'}
                                show={'no'}
                                data={this.state.GenericHealthProfile.familyHistory}
                                image={images[6]}
                            />

                            <RenderCard
                                title={'الأدوية المصروفة في الثلاث شهور الماضية'}
                                show={'yes'}
                                data={this.state.HealthProfilePrescribedMedicines}
                                image={images[7]}
                                openModal={this.openModal}

                            />

                            <RenderCard
                                title={'التطعيمات'}
                                show={'yes'}
                                data={this.state.GenericHealthProfile.vaccinations}
                                image={images[8]}
                                openModal={this.openModal}
                            />

                            <RenderCard
                                title={'حامل'}
                                show={'no'}
                                data={this.state.GenericHealthProfile.pregnant == false ? 'لا' : 'نعم'}
                                image={images[9]}
                            />

                            <RenderCard
                                title={'مرضع'}
                                show={'no'}
                                data={this.state.GenericHealthProfile.breastFeeding == false ? 'لا' : 'نعم'}
                                image={images[10]}
                            />
                        </ScrollView>
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
                                    fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null, fontSize: 16,
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
                                    onPress={async () => {
                                        //callApi    
                                        await this.props.putHealthStatus(!this.props.healthStatus)
                                     //   alert(this.props.status)
                                        if (this.props.status == 200) {
                                            await this.props.getHealthStatus()
                                            this.setState({
                                                ModalAlert: false,
                                                toggle: this.props.healthStatus
                                            }) 
                                        }

                                    }}
                                    style={{
                                        fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null, fontSize: 16,
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
                                        fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null, fontSize: 16,
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
                    onClosed={() => {
                        this.setState({ modal: false })
                    }}
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
                                    {this.state.typeModal ? g.Vaccinations : 'الادوية المصروفة'}
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
                            {this.state.typeModal ?
                                <ModalVaccinations
                                    vaccine={this.state.ChildVaccination}
                                    ChildGrowth={this.state.ChildGrowthChart}
                                />
                                :
                                <Text style={[styleLogin.login, {
                                    marginTop: 15, textAlign: 'center',
                                    fontSize: 16, color: g.Gray, marginRight: 0,
                                }]}>لا يوجد بيانات</Text>}

                        </View>
                    </View>

                </Modal>

            </View >
        );

    }
}
const mapStateToProps = state => {
    return {
        GenericHealthProfile: state.GenericHealthProfile.GenericHealthProfile,
        healthStatus: state.healthStatus.healthStatus,
        status: state.editStatus.status
    }
}

export default connect(mapStateToProps, { Get_GenericHealthProfile, getHealthStatus, putHealthStatus })(withNavigation(Visit));

