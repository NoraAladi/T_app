import styles from './style';
import React, { Component } from 'react';
import {
    Text, View, ScrollView, TextInput, TouchableWithoutFeedback,
    TouchableOpacity, Platform, ImageBackground, Image,
    I18nManager, Modal, KeyboardAvoidingView, FlatList, Dimensions
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import AsyncStorage from '@react-native-community/async-storage';
import {

    UIActivityIndicator,
} from 'react-native-indicators';
import UserFooter from '../../Navigation/UserFooter';
import LinearGradient from 'react-native-linear-gradient';
import ModalAddUser from '../../Navigation/ModalAddUser';
import Header from '../DealsScreen/header';
import { ArabicNumbers } from 'react-native-arabic-numbers';


class myOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropDown: false,

        };
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header title={g.REQUEST} />
                <View style={{ height: 15 }} />


                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    <View style={{ height: hp('80') }}>
                        <FlatList

                            showsVerticalScrollIndicator={false}
                            nestedScrollEnabled
                            onEndReachedThreshold={.1}
                            onEndReached={() => { console.log('saad') }}
                            data={[1,]}
                            renderItem={({ item, index }) => (

                                <View style={[styles.card, { flexDirection: 'column' }]}>
                                    <View style={{ flexDirection: 'row-reverse', }}>
                                        <Text style={[styles.txt, { color: g.Gray, fontSize: 12, width: wp('40') }]}>
                                            {g.REQUEST_DATE}
                                        </Text>
                                        <Text style={[styles.txt, {
                                            color: g.Gray, fontSize: 12, width: wp('35')

                                        }]}>
                                            {g.PROVIDER}
                                        </Text>

                                        <TouchableOpacity onPress={() => {
                                            this.setState({
                                                dropDown: !this.state.dropDown
                                            })
                                        }}>
                                            <Icon
                                                name={this.state.dropDown ? 'up' : 'down'} type='AntDesign'
                                                style={[styles.icon, { fontSize: 14, marginTop: 5, }]} />
                                        </TouchableOpacity>

                                    </View>

                                    <View style={{
                                        flexDirection: 'row-reverse'
                                        , marginBottom: -10,
                                    }}>
                                        <Text style={[styles.txt, { fontSize: 16, marginTop: -5, width: wp('40') }]}>
                                            {ArabicNumbers('5 ديسمبر 2020')}
                                            {'\n'}
                                        </Text>

                                        <Text style={[styles.txt, { fontSize: 16, marginTop: -5, width: wp('35') }]}>
                                            {'اسم المستخدم '}{'\n'}
                                        </Text>

                                        <Icon
                                            style={[styles.icon, { fontSize: 14, }]} />
                                    </View>


                                    {/*** dropDown*/}
                                    {this.state.dropDown ?
                                        <View style={{ flex: 1 }}>
                                            <Text style={[styles.txt, { color: g.Gray, fontSize: 12 }]}>
                                                {g.STATUS}
                                            </Text>
                                            <View style={{ flexDirection: 'row-reverse' }}>
                                                <Text style={[styles.txt, {
                                                    fontSize: 16, color: '#e02020', marginTop: -5
                                                }]}>تم رفض الطلب</Text>
                                                <Text style={[styles.txt, { fontSize: 12 }]}>{'   '}{g.NOT_AVALIABLE}</Text>
                                            </View>

                                            <Text style={[styles.txt, { color: g.Gray, fontSize: 12 }]}>
                                                {g.REQURIED_ITEMS}
                                            </Text>


                                            <ScrollView
                                                nestedScrollEnabled
                                                scrollEnabled
                                                style={{ height: hp('28'), width: '100%' }}>
                                                <TouchableWithoutFeedback onPress={() => { }}>


                                                    <FlatList


                                                        showsVerticalScrollIndicator={false}
                                                        nestedScrollEnabled
                                                        onEndReachedThreshold={.1}
                                                        onEndReached={() => { console.log('saad') }}
                                                        data={[1, 1, 1, 1, 1, 1, 1,]}
                                                        renderItem={({ item, index }) => (
                                                            <View>
                                                                <View style={{ flexDirection: 'row-reverse', margin: 10, }}>
                                                                    <View style={{
                                                                        width: 50, height: 50,
                                                                        justifyContent: 'center',
                                                                        alignItems: 'center',
                                                                        backgroundColor: '#c2eaff'
                                                                    }}>
                                                                        <Image source={require('../../Images/drugs.png')}
                                                                            resizeMode='center'
                                                                        // style={{ width: 21, height: 20 }}
                                                                        />
                                                                    </View>

                                                                    <View style={{ marginRight: 15, width: wp('55') }}>

                                                                        <Text style={[styles.txt, { fontSize: 14, }]}>
                                                                            {'الاسم'}
                                                                        </Text>
                                                                        <Text style={[styles.txt, { fontSize: 14, marginTop: -5, }]}>
                                                                            {'الاسم'}
                                                                        </Text>
                                                                    </View>

                                                                    <Text style={[styles.txt, { fontSize: 14, }]}>
                                                                        {ArabicNumbers('2×')}
                                                                    </Text>

                                                                </View>

                                                            </View>
                                                        )} />
                                                </TouchableWithoutFeedback>
                                            </ScrollView>



                                        </View>
                                        : null}



                                </View>
                            )}
                        />
                    </View>
                </ScrollView>
                <UserFooter tab={4} />
            </View>
        );

    }
}
export default withNavigation(myOrder);
