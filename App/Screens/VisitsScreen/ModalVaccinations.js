import styleLogin from '../LoginScreen/style';
import React, { Component } from 'react';
import {
    Text, View, ScrollView,
    TouchableOpacity, Platform, FlatList, Image, _View
} from 'react-native';
import g from '../../Gloabal';
import VisitsStyle from './VisitsStyle';
import { ArabicNumbers } from 'react-native-arabic-numbers';
import { widthPercentageToDP } from 'react-native-responsive-screen';


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
                        {this.props.vaccine == '' ?
                            <Text style={[VisitsStyle.txt, { marginLeft: widthPercentageToDP('40') }]}>
                                {'لا يوجد'}
                            </Text>
                            :
                            <View style=
                                {{ marginLeft: 'auto', paddingHorizontal: 40, marginTop: 10 }}>
                                {/**light title */}

                                {/**Dark Details */}

                                <FlatList
                                    key={(item) => {
                                        item.id;
                                    }}
                                    showsVerticalScrollIndicator={false}
                                    data={this.props.vaccine}
                                    //   horizontal={true}
                                    renderItem={({ item, index }) => (
                                        <View>
                                            <Text style={[VisitsStyle.txt, {
                                                fontSize: 12, color: g.Light_Gray,
                                            }]}>
                                                {item.childAge.ageValue + ' ' + item.childAge.ageTitle}
                                            </Text>
                                            <Text style={[VisitsStyle.txt]}>
                                                {item.vaccination.vaccenName}
                                            </Text>
                                        </View>
                                    )}
                                />

                            </View>
                        }
                        {/**line */}
                        <View style={{
                            backgroundColor: g.Light_Gray, width: g.windowWidth - 80, height: 1,
                            marginTop: 10, marginBottom: 10, marginLeft: 'auto', marginRight: 'auto'
                        }} />


                        <View style={{ paddingHorizontal: 30 }}>
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
                                {this.props.ChildGrowth == '' ?
                                    <Text style={[VisitsStyle.txt, {}]}>
                                        {'لا يوجد'}
                                    </Text>
                                    :
                                    <FlatList
                                        key={(item) => {
                                            item.id;
                                        }}
                                        showsVerticalScrollIndicator={false}
                                        data={this.props.ChildGrowth}
                                        //   horizontal={true}
                                        renderItem={({ item, index }) => (
                                            <View style={{ paddingHorizontal: 30 }}>
                                                <Text style={[VisitsStyle.normalTxt, {
                                                    color: g.Light_Gray,
                                                    fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null, textAlign: 'right'
                                                }]}>
                                                    {g.AGE}
                                                </Text>
                                                <Text style={[VisitsStyle.normalTxt, {
                                                    fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null, textAlign: 'right', fontSize: 14
                                                }]}>
                                                    {item.childAge.ageValue+' '+item.childAge.ageTitle}
                                                </Text>

                                                <Text style={[VisitsStyle.normalTxt, {
                                                    color: g.Light_Gray,
                                                    fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null, textAlign: 'right'
                                                }]}>
                                                    {g.HEAD}
                                                </Text>
                                                <Text style={[VisitsStyle.normalTxt, {
                                                    fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null, textAlign: 'right', fontSize: 14
                                                }]}>
                                                   {item.growthValue}
                                    </Text>


                                            </View>
                                        )}
                                    />
                                }
                            </View>

                        </View>



                        <View style={{ height: 50 }}></View>
                    </TouchableOpacity>
                </ScrollView>
            </View>

        );
    }
}
