import styleLogin from '../LoginScreen/style';
import headerStyle from '../DealsScreen/style';
import React, { Component } from 'react';
import {
    Text, View, ScrollView, TextInput,
    TouchableOpacity, Platform, ImageBackground,
    I18nManager, Modal, KeyboardAvoidingView, FlatList, Dimensions, Image, _View
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


export default class ModalVaccinations extends Component {
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
                        {/**content1 */}
                        <View style={{ marginLeft: 'auto', paddingHorizontal: 40, marginTop: 10 }}>
                            {/**light title */}
                            <Text style={[VisitsStyle.txt, {
                                fontSize: 12, color: g.Light_Gray,
                            }]}>
                                {g.BORN}
                            </Text>
                            {/**Dark Details */}
                            <FlatList
                                key={(item) => {
                                    item.id;
                                }}
                                showsVerticalScrollIndicator={false}
                                data={[1, 1]}
                                //   horizontal={true}
                                renderItem={({ item, index }) => (
                                    <View>

                                        <Text style={[VisitsStyle.txt, {}]}>
                                            {ArabicNumbers('5 ديسمبر 2020')}
                                        </Text>
                                    </View>
                                )}
                            />
                        </View>

                        {/**line */}
                        <View style={{
                            backgroundColor: g.Light_Gray, width: g.windowWidth - 80, height: 1,
                            marginTop: 10, marginBottom: 10, marginLeft: 'auto', marginRight: 'auto'
                        }} />

                        {/**content2 */}
                        <View style={{ marginLeft: 'auto', paddingHorizontal: 40, marginTop: 0 }}>
                            {/**light title */}
                            <Text style={[VisitsStyle.txt, {
                                fontSize: 12, color: g.Light_Gray,
                            }]}>
                                {g.BORN_TWO_MONTHS}
                            </Text>
                            {/**Dark Details */}
                            <FlatList
                                key={(item) => {
                                    item.id;
                                }}
                                showsVerticalScrollIndicator={false}
                                data={[1, 1]}
                                //   horizontal={true}
                                renderItem={({ item, index }) => (
                                    <View>

                                        <Text style={[VisitsStyle.txt, {}]}>
                                            {ArabicNumbers('5 ديسمبر 2020')}
                                        </Text>
                                    </View>
                                )}
                            />
                        </View>



                        {/**line */}
                        <View style={{
                            backgroundColor: g.Light_Gray, width: g.windowWidth - 80, height: 1,
                            marginTop: 10, marginBottom: 10, marginLeft: 'auto', marginRight: 'auto'
                        }} />

                        {/**content3 */}
                        <View style={{ marginLeft: 'auto', paddingHorizontal: 40, marginTop: 0 }}>
                            {/**light title */}
                            <Text style={[VisitsStyle.txt, {
                                fontSize: 12, color: g.Light_Gray,
                            }]}>
                                {g.TWO_MONTHS}
                            </Text>
                            {/**Dark Details */}
                            <FlatList
                                key={(item) => {
                                    item.id;
                                }}
                                showsVerticalScrollIndicator={false}
                                data={[1, 1]}
                                //   horizontal={true}
                                renderItem={({ item, index }) => (
                                    <View>

                                        <Text style={[VisitsStyle.txt, {}]}>
                                            {ArabicNumbers('5 ديسمبر 2020')}
                                        </Text>
                                    </View>
                                )}
                            />
                        </View>





                        {/**line */}
                        <View style={{
                            backgroundColor: g.Light_Gray, width: g.windowWidth - 80, height: 1,
                            marginTop: 10, marginBottom: 10, marginLeft: 'auto', marginRight: 'auto'
                        }} />

                        {/**content4 */}
                        <View style={{ marginLeft: 'auto', paddingHorizontal: 40, marginTop: 0 }}>
                            {/**light title */}
                            <Text style={[VisitsStyle.txt, {
                                fontSize: 12, color: g.Light_Gray,
                            }]}>
                                {g.FOUR_MONTHS}
                            </Text>
                            {/**Dark Details */}
                            <FlatList
                                key={(item) => {
                                    item.id;
                                }}
                                showsVerticalScrollIndicator={false}
                                data={[1, 1]}
                                //   horizontal={true}
                                renderItem={({ item, index }) => (
                                    <View>

                                        <Text style={[VisitsStyle.txt, {}]}>
                                            {ArabicNumbers('5 ديسمبر 2020')}
                                        </Text>
                                    </View>
                                )}
                            />
                        </View>





                        {/**line */}
                        <View style={{
                            backgroundColor: g.Light_Gray, width: g.windowWidth - 80, height: 1,
                            marginTop: 10, marginBottom: 10, marginLeft: 'auto', marginRight: 'auto'
                        }} />

                        {/**content5 */}
                        <View style={{ marginLeft: 'auto', paddingHorizontal: 40, marginTop: 0 }}>
                            {/**light title */}
                            <Text style={[VisitsStyle.txt, {
                                fontSize: 12, color: g.Light_Gray,
                            }]}>
                                {g.SIX_MONTHS}
                            </Text>
                            {/**Dark Details */}
                            <FlatList
                                key={(item) => {
                                    item.id;
                                }}
                                showsVerticalScrollIndicator={false}
                                data={[1, 1]}
                                //   horizontal={true}
                                renderItem={({ item, index }) => (
                                    <View>

                                        <Text style={[VisitsStyle.txt, {}]}>
                                            {ArabicNumbers('5 ديسمبر 2020')}
                                        </Text>
                                    </View>
                                )}
                            />
                        </View>





                        {/**line */}
                        <View style={{
                            backgroundColor: g.Light_Gray, width: g.windowWidth - 80, height: 1,
                            marginTop: 10, marginBottom: 10, marginLeft: 'auto', marginRight: 'auto'
                        }} />

                        {/**content6 */}
                        <View style={{ marginLeft: 'auto', paddingHorizontal: 40, marginTop: 0 }}>
                            {/**light title */}
                            <Text style={[VisitsStyle.txt, {
                                fontSize: 12, color: g.Light_Gray,
                            }]}>
                                {g.NINE_MONTHS}
                            </Text>
                            {/**Dark Details */}
                            <FlatList
                                key={(item) => {
                                    item.id;
                                }}
                                showsVerticalScrollIndicator={false}
                                data={[1, 1]}
                                //   horizontal={true}
                                renderItem={({ item, index }) => (
                                    <View>

                                        <Text style={[VisitsStyle.txt, {}]}>
                                            {ArabicNumbers('5 ديسمبر 2020')}
                                        </Text>
                                    </View>
                                )}
                            />
                        </View>


                        {/**line */}
                        <View style={{
                            backgroundColor: g.Light_Gray, width: g.windowWidth - 80, height: 1,
                            marginTop: 10, marginBottom: 10, marginLeft: 'auto', marginRight: 'auto'
                        }} />

                        {/**content7 */}
                        <View style={{ marginLeft: 'auto', paddingHorizontal: 40, marginTop: 0 }}>
                            {/**light title */}
                            <Text style={[styleLogin.login, {
                                marginRight: 0, marginTop: 0,
                                fontSize: 18
                            }]}>
                                {g.GROWTH_RATE}
                            </Text>
                            {/**Dark Details */}
                            <View style={{ flexDirection: 'row-reverse' }}>
                                <Image source={require('../../Images/headCircumference.png')}
                                    style={{ width: 120, height: 120 }}
                                />
                                <View style={{ paddingHorizontal: 30 }}>
                                    <Text style={[VisitsStyle.normalTxt,{color:g.Light_Gray,fontFamily:g.Bold,textAlign:'right'}]}>
                                        {g.AGE}
                                    </Text>
                                    <Text style={[VisitsStyle.normalTxt,{fontFamily:g.Bold,textAlign:'right',fontSize:14}]}>
                                        3 سنوات 
                                    </Text>

                                    <Text style={[VisitsStyle.normalTxt,{color:g.Light_Gray,fontFamily:g.Bold,textAlign:'right'}]}>
                                        {g.HEAD}
                                    </Text>
                                    <Text style={[VisitsStyle.normalTxt,{fontFamily:g.Bold,textAlign:'right',fontSize:14}]}>
                                        3.5 سم
                                    </Text>

                                    
                                </View>

                            </View>
                        </View>



                        <View style={{ height: 50 }}></View>
                    </TouchableOpacity>
                </ScrollView>
            </View>

        );
    }
}
