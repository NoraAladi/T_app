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


export default class ModalReportes extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
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
                                {ArabicNumbers('5 ديسمبر 2020')}
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
                            {g.ORDER_DATE}
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
                                    د. محمد سعدون
                        </Text>
                                <Text style={[VisitsStyle.txt, { fontSize: 12, fontFamily: g.Regular }]}>
                                    إخصائي امراض الباطنة
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
                        <Text style={[VisitsStyle.txt, { fontSize: 16, marginLeft: 'auto', paddingHorizontal: 40, }]}>
                            CRP
                        </Text>
                        {/**Dark Details */}
                        <Text style={[VisitsStyle.txt, { fontSize: 16, marginLeft: 'auto', paddingHorizontal: 40, }]}>
                            CBC
                        </Text>
                        {/**Dark Details */}
                        <Text style={[VisitsStyle.txt, { fontSize: 16, marginLeft: 'auto', paddingHorizontal: 40, }]}>
                            URINE ESR
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
                                <Image source={require('../../Images/pdf.png')}
                                    style={{ width: 60, height: 77 }}
                                />
                                <Text style={[VisitsStyle.normalTxt, { color: g.Blue }]}>
                                    CRP
                        </Text>
                            </View>

                            <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10, }}>
                                <Image source={require('../../Images/pdf.png')}
                                    style={{ width: 60, height: 77 }}
                                />
                                <Text style={[VisitsStyle.normalTxt, { color: g.Blue }]}>
                                    CBC
                        </Text>
                            </View>


                            <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10, }}>
                                <Image source={require('../../Images/pdf.png')}
                                    style={{ width: 60, height: 77 }}
                                />
                                <Text style={[VisitsStyle.normalTxt, { color: g.Blue }]}>
                                    Urine ESR
                        </Text>
                            </View>
                        </View>
                        <View style={{ height: 50 }}></View>
                    </TouchableOpacity>
                </ScrollView>
            </View>

        );
    }
}
