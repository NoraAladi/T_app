
import React, { Component } from 'react';
import {
    Text, View, ScrollView,
    TouchableOpacity, Image, FlatList, VirtualizedList, Linking
} from 'react-native';
import g from '../../Gloabal';
import VisitsStyle from './VisitsStyle';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Icon } from 'native-base';

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
                            style={{ width: 45, height: undefined, aspectRatio: 1 }}
                            resizeMode='contain'
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
                <Text style={[VisitsStyle.txt, {
                    fontSize: 12, color: g.Light_Gray, marginLeft: 'auto', paddingHorizontal: 40,
                }]}>
                    {'المعمل الموصي به'}
                </Text>

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
                        <Image source={require('../../Images/listtwo.png')}
                            style={{ width: 45, height: undefined, aspectRatio: 1 }}
                            resizeMode='contain'
                        />
                    </View>
                    {!this.props.reportDetails[0].recommendedMicroLab &&
                        !this.props.reportDetails[0].recommendedCenter

                        ?
                        <View style={{ paddingHorizontal: 20 }}>
                            <Text style={[VisitsStyle.txt, { fontSize: 12,marginTop:25 }]} >
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
                                <Icon name='call' type='MaterialIcons' style={{ color: g.Gray, fontSize: 15, marginTop: 5, marginLeft: 5, }} />

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

            </View>
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
                        <ScrollView nestedScrollEnabled>
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
                                    {g.RESULTS}
                                </Text>

                                <View style={{
                                    flexDirection: 'row-reverse',
                                    paddingHorizontal: 40,
                                }}>

                                    <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10, }}>
                                        {item.resultDate != null ? <Image source={require('../../Images/pdf.png')}
                                            style={{ width: 60, height: 77 }}
                                        /> : null}
                                        <Text style={[VisitsStyle.normalTxt, { color: g.Blue }]}>
                                            {item.resultDate == null ? 'لا يوجد' : item.resultDate}
                                        </Text>
                                    </View>

                                </View>
                                <View style={{ height: 15 }}></View>
                            </TouchableOpacity>

                        </ScrollView>
                    )} />
            </View>

        );
    }
}
