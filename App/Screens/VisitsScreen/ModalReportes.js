
import React, { Component } from 'react';
import {
    Text, View, ScrollView,
    TouchableOpacity, Image, FlatList
} from 'react-native';
import g from '../../Gloabal';
import VisitsStyle from './VisitsStyle';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class ModalReportes extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        console.log('--Modal-- \n' + JSON.stringify(this.props.reportDetails) + ' date--  \n ' +
            this.props.date);
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    key={(item) => { item.id }}
                    nestedScrollEnabled
                    data={this.props.reportDetails}
                    renderItem={({ item, index }) => (
                        <ScrollView nestedScrollEnabled>
                            <TouchableOpacity activeOpacity={1} >
                                {/**content */}
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
                                    flexDirection: 'row-reverse', marginTop: 5, paddingHorizontal: 40,
                                    justifyContent: 'center'
                                }}>
                                    <Image source={require('../../Images/user.png')}
                                        style={{ width: 55, height: 55, borderRadius: 25 }}
                                    />

                                    <View style={{ paddingHorizontal: 20 }}>
                                        {/**Dark Details */}
                                        <Text style={[VisitsStyle.txt, { fontSize: 16 }]}>
                                            {item.clinicVisit.doctor.titleAr + '. ' +
                                                item.clinicVisit.doctor.fullNameAr}
                                        </Text>
                                        <Text style={[VisitsStyle.txt, { fontSize: 12, fontFamily: g.Regular }]}>
                                            {item.clinicVisit.doctor.titlePreSpecialityAR + ' ' +
                                                item.clinicVisit.doctor.speciality.specialityNameAr}
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
                                            {item.resultDate==null?'لا يوجد':item.resultDate}
                                            </Text>
                                    </View>

                                </View>
                                <View style={{ height: 50 }}></View>
                            </TouchableOpacity>
                        </ScrollView>
                    )} />
            </View>

        );
    }
}
