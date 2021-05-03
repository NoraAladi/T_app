
import React, { Component } from 'react';
import {
    Text, View, ScrollView,
    TouchableOpacity, Image, FlatList, VirtualizedList, Linking
} from 'react-native';
import g from '../../Gloabal';
import VisitsStyle from './VisitsStyle';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Icon } from 'native-base';
import FitImage from 'react-native-fit-image';

export default class ModalReportes extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
    }
    renderListHeader = () => {
        return (
            <ScrollView nestedScrollEnabled
                showsVerticalScrollIndicator={false}>
                <TouchableOpacity activeOpacity={1}>
                    <View>


                        <View style={{ marginLeft: 'auto', paddingHorizontal: 40, marginTop: 10 }}>
                            {/**light title */}
                            <Text style={[VisitsStyle.txt, {
                                fontSize: 12, color: g.Light_Gray,
                            }]}>
                                {g.ORDER_DATE}
                            </Text>
                            {/**Dark Details */}
                            <Text style={[VisitsStyle.txt, {}]}
                            >
                                {this.props.date}
                            </Text>
                        </View>
                        {/**line */}

                        {this.props.walkon ?
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
                            : null}

                        {/**light title */}
                        {this.props.walkon ?
                            <Text style={[VisitsStyle.txt, {
                                fontSize: 12, color: g.Light_Gray, marginLeft: 'auto', paddingHorizontal: 40,
                            }]}>
                                {g.Physician}
                            </Text>
                            : null}
                        {this.props.walkon ?
                            <View style={{
                                flexDirection: 'row-reverse',
                                marginTop: 5,
                                paddingHorizontal: 40,
                                justifyContent: 'center'
                            }}>
                                <View style={{
                                    width: 70, height: 70, borderColor: g.Light_Gray,
                                    borderWidth: .5, borderRadius: 35, alignItems: 'center',
                                    justifyContent: 'center', marginRight: 30
                                }}>
                                    <Image source={{ uri: this.props.reportDetails[0].clinicVisit.doctor.personalPhoto }}
                                        style={{ width: '100%', height: '100%', borderRadius: 35, overflow: 'hidden' }}
                                    />
                                </View>

                                <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                                    {/**Dark Details */}
                                    <Text style={[VisitsStyle.txt, { fontSize: 16 }]}>
                                        {this.props.reportDetails[0].clinicVisit.doctor.titleAr + '. ' +
                                            this.props.reportDetails[0].clinicVisit.doctor.fullNameAr}
                                    </Text>
                                    <Text style={[VisitsStyle.txt, { fontSize: 12, fontFamily: g.Regular }]}>
                                        {this.props.reportDetails[0].clinicVisit.doctor.titlePreSpecialityAR + ' ' +
                                            this.props.reportDetails[0].clinicVisit.doctor.speciality.specialityNameAr}
                                    </Text>
                                </View>
                            </View>

                            : null}

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





                        {/**الطبيب اللي تم زيارته */}
                        {/**light title */}
                        <Text style={[VisitsStyle.txt, {
                            fontSize: 12, color: g.Light_Gray, marginLeft: 'auto', paddingHorizontal: 40, width: undefined
                        }]}>
                            {this.props.typeOfReport == 'MIC' ? '  المعمل الذي قام بعمل التحاليل' : 'المركز الذي قام بعمل الاشعات'}
                        </Text>

                        <View style={{
                            flexDirection: 'row-reverse',
                            marginTop: 5,
                            paddingHorizontal: 40,
                            justifyContent: 'center'
                        }}>
                            {!this.props.reportDetails[0].microLab &&
                                !this.props.reportDetails[0].radiologyCenter
                                ? null :
                                <View style={{
                                    width: 70, height: 70, borderColor: g.Light_Gray,
                                    borderWidth: .5, borderRadius: 35, alignItems: 'center',
                                    justifyContent: 'center', marginRight: 30
                                }}>
                                    <Image source={{
                                        uri:
                                            !this.props.reportDetails[0].microLab &&
                                                !this.props.reportDetails[0].radiologyCenter
                                                ? '' :
                                                this.props.typeOfReport == 'MIC' ?
                                                    this.props.reportDetails[0].microLab.logo :
                                                    this.props.reportDetails[0].radiologyCenter.logo
                                    }}
                                        style={{ width: 69, height: 69, borderRadius: 35, overflow: 'hidden' }}
                                    />
                                </View>
                            }
                            {!this.props.reportDetails[0].microLab &&
                                !this.props.reportDetails[0].radiologyCenter

                                ?
                                <View style={{}}>
                                    <Text style={[VisitsStyle.txtx, { marginLeft: wp('55%') }]} >
                                        لا يوجد بيانات
                                    </Text>
                                </View>

                                : <View style={{ paddingHorizontal: 20 }}>
                                    {/**Dark Details */}
                                    <Text style={[VisitsStyle.txt, { fontSize: 16 }]}>
                                        {this.props.typeOfReport == 'MIC' ? this.props.reportDetails[0].microLab.nameAr :
                                            this.props.reportDetails[0].radiologyCenter.nameAr}
                                    </Text>

                                    <View style={{ flexDirection: 'row-reverse' }}>
                                        <Icon name='location' type='Ionicons' style={{ color: g.Gray, fontSize: 15, marginTop: 5, marginLeft: 5, }} />

                                        <Text style={[VisitsStyle.txt, { fontSize: 12, fontFamily: g.Regular }]}>

                                            {this.props.typeOfReport == 'MIC' ?
                                                this.props.reportDetails[0].microLab.locatoin.city.governate.nameAr + ' - ' +
                                                this.props.reportDetails[0].microLab.locatoin.city.cityNameAr + ' - ' +
                                                this.props.reportDetails[0].microLab.locatoin.street
                                                :
                                                this.props.reportDetails[0].radiologyCenter.locatoin.city.governate.nameAr + ' - ' +
                                                this.props.reportDetails[0].radiologyCenter.locatoin.city.cityNameAr + ' - ' +
                                                this.props.reportDetails[0].radiologyCenter.locatoin.street
                                            }
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => Linking.openURL(`tel:${this.props.reportDetails[0].microLab.phoneNumber}`)}
                                        style={{ flexDirection: 'row-reverse' }}>
                                        <Icon name='call' type='MaterialIcons' style={{ color: '#4FCE5D', fontSize: 15, marginTop: 5, marginLeft: 5, }} />

                                        <Text style={[VisitsStyle.txt, { fontSize: 12, fontFamily: g.Regular, color: g.Blue }]}>
                                            {
                                                this.props.typeOfReport == 'MIC' ?
                                                    this.props.reportDetails[0].microLab.phoneNumber :
                                                    this.props.reportDetails[0].radiologyCenter.phoneNumber
                                            }
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            }
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







                        {/**Recomand labs */}
                        {/**light title */}
                        {this.props.walkon ?
                            <Text style={[VisitsStyle.txt, {
                                fontSize: 12, color: g.Light_Gray, marginLeft: 'auto', paddingHorizontal: 40, width: undefined
                            }]}>
                                {this.props.typeOfReport == 'MIC' ? 'المعمل الموصى به من قبل الطبيب' : 'المركز الموصى به من قبل الطبيب'}
                            </Text>
                            : null}
                        {this.props.walkon ?
                            <View style={{
                                flexDirection: 'row-reverse',
                                marginTop: 5,
                                paddingHorizontal: 40,
                                justifyContent: 'center'
                            }}>
                                {!this.props.reportDetails[0].recommendedMicroLab &&
                                    !this.props.reportDetails[0].recommendedCenter

                                    ? null :
                                    <View style={{
                                        width: 70, height: 70, borderColor: g.Light_Gray,
                                        borderWidth: .5, borderRadius: 35, alignItems: 'center',
                                        justifyContent: 'center', marginRight: 30
                                    }}>
                                        <Image source={{

                                            uri:
                                                !this.props.reportDetails[0].recommendedMicroLab &&
                                                    !this.props.reportDetails[0].recommendedCenter
                                                    ? ''
                                                    : this.props.typeOfReport == 'MIC' ?
                                                        this.props.reportDetails[0].recommendedMicroLab.logo :
                                                        this.props.reportDetails[0].recommendedCenter.logo
                                        }}
                                            style={{ width: 69, height: 69, borderRadius: 35, overflow: 'hidden' }}
                                        />
                                    </View>
                                }
                                {!this.props.reportDetails[0].recommendedMicroLab &&
                                    !this.props.reportDetails[0].recommendedCenter

                                    ?
                                    <View style={{}}>
                                    <Text style={[VisitsStyle.txtx, { marginLeft: wp('55%') }]} >
                                        لا يوجد بيانات
                                    </Text>
                                </View>

                                    : <View style={{ paddingHorizontal: 20 }}>
                                        {/**Dark Details */}
                                        <Text style={[VisitsStyle.txt, { fontSize: 16 }]}>
                                            {this.props.typeOfReport == 'MIC' ? this.props.reportDetails[0].recommendedMicroLab.nameAr :
                                                this.props.reportDetails[0].recommendedCenter.nameAr}
                                        </Text>

                                        <View style={{ flexDirection: 'row-reverse' }}>
                                            <Icon name='location' type='Ionicons' style={{ color: g.Gray, fontSize: 15, marginTop: 5, marginLeft: 5, }} />

                                            <Text style={[VisitsStyle.txt, { fontSize: 12, fontFamily: g.Regular }]}>

                                                {this.props.typeOfReport == 'MIC' ?
                                                    this.props.reportDetails[0].recommendedMicroLab.locatoin.city.governate.nameAr + ' - ' +
                                                    this.props.reportDetails[0].recommendedMicroLab.locatoin.city.cityNameAr + ' - ' +
                                                    this.props.reportDetails[0].recommendedMicroLab.locatoin.street
                                                    :
                                                    this.props.reportDetails[0].recommendedCenter.locatoin.city.governate.nameAr + ' - ' +
                                                    this.props.reportDetails[0].recommendedCenter.locatoin.city.cityNameAr + ' - ' +
                                                    this.props.reportDetails[0].recommendedCenter.locatoin.street
                                                }
                                            </Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => Linking.openURL(`tel:${this.props.reportDetails[0].recommendedMicroLab.phoneNumber}`)}
                                            style={{ flexDirection: 'row-reverse' }}>
                                            <Icon name='call' type='MaterialIcons' style={{ color: '#4FCE5D', fontSize: 15, marginTop: 5, marginLeft: 5, }} />

                                            <Text style={[VisitsStyle.txt, { fontSize: 12, fontFamily: g.Regular, color: g.Blue }]}>
                                                {
                                                    this.props.typeOfReport == 'MIC' ?
                                                        this.props.reportDetails[0].recommendedMicroLab.phoneNumber :
                                                        this.props.reportDetails[0].recommendedCenter.phoneNumber
                                                }
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>

                            : null}
                        {/**line */}
                        {this.props.walkon ?
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
                            : null}
                    </View>
                </TouchableOpacity>
            </ScrollView>
        )
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    ListFooterComponent={() => { return (<View style={{ height: 50 }} />) }}
                    ListHeaderComponent={this.renderListHeader}
                    key={(item) => { item.id }}
                    nestedScrollEnabled
                    data={this.props.reportDetails}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity activeOpacity={1} >


                            {/**content */}

                            {/**light title */}
                            <Text style={[VisitsStyle.txt, {
                                fontSize: 12, color: g.Light_Gray, marginLeft: 'auto', paddingHorizontal: 40,
                            }]}>
                                {g.Required_analysis}
                            </Text>

                            {/**Dark Details */}
                            <Text style={[VisitsStyle.txt, {
                                fontSize: 16, marginLeft: 'auto', paddingHorizontal: 40, width: wp('80')
                            }]}>
                                {item.reportName}
                            </Text>


                            {this.props.typeOfReport == 'MIC' ? null :
                                <View
                                    style={{
                                        width: '80%', paddingVertical: 15, margin: 0,
                                        borderRadius: 7, marginLeft: 'auto', marginRight: 'auto'
                                    }}>
                                    <Text style={{ fontFamily: g.Regular, paddingHorizontal: 5, textAlign: 'right' }}>
                                        {this.props.reportDetails[0].bodySide == null ? 'null' : this.props.reportDetails[0].bodySide}
                                    </Text>

                                </View>}
                            {/**light title */}
                            <Text style={[VisitsStyle.txt, {
                                fontSize: 12, color: g.Light_Gray, marginLeft: 'auto', paddingHorizontal: 40,
                            }]}>
                                {g.RESULTS}
                            </Text>


                            <View style={{
                                flexDirection: 'row-reverse',
                                paddingHorizontal: 40,
                            }}>

                                <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10, }}>
                                    {item.attachment != '' ?
                                        <TouchableOpacity onPress={() => {
                                            Linking.openURL(item.attachment.attachment)
                                        }}>
                                            <FitImage source={{ uri: 'https://www.valterlongo.com/wp-content/uploads/2019/08/pdf-icon.png' }}
                                                style={{ width: 60, height: 80 }}
                                            />
                                        </TouchableOpacity>
                                        : null}
                                    <Text style={[VisitsStyle.normalTxt, { color: g.Blue }]}>
                                        {item.reportName}
                                    </Text>
                                </View>

                            </View>

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
                            <View style={{ height: 15 }}></View>

                        </TouchableOpacity>

                    )} />
            </View>

        );
    }
}
