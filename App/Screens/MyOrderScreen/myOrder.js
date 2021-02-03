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
import UserFooter from '../../Navigation/UserFooter';
import { Get_MyOrder } from '../../Actions/getMyOrder';
import { connect } from 'react-redux'
import Header from '../DealsScreen/header';
import { ArabicNumbers } from 'react-native-arabic-numbers';
import Spinner from '../../Navigation/Spinner'
import moment from 'moment';

var months = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
var monthsEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


class myOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropDown: false,
            nameSelected:''
        };
    }
    async componentDidMount() {
        await this.props.Get_MyOrder()
    }
    arabicDate(date) {
        for (let index = 0; index < monthsEn.length; index++) {
            if (date.includes(monthsEn[index])) {
                date = ArabicNumbers(date.replace(monthsEn[index], months[index]))
                return date;
            }
        }
        return date
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header title={g.REQUEST} />


                <View style={{ height: 15 }} />


                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    {this.props.loading ?
                        <View style={{ marginTop: hp('35%') }} >
                            <Spinner />
                        </View>

                        :
                        <View style={{ height: hp('80') }}>
                            <FlatList

                                showsVerticalScrollIndicator={false}
                                nestedScrollEnabled
                                onEndReachedThreshold={.1}
                                onEndReached={() => { console.log('saad') }}
                                data={this.props.MyOrder}
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

                                            <TouchableOpacity onPress={async() => {
                                                await this.setState({
                                                    dropDown: !this.state.dropDown,
                                                    nameSelected:item.nameEn
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
                                              
                                                {ArabicNumbers(this.arabicDate(moment(item.created).format('DD MMMM YYYY')))
                                                }
                                                {'\n'}
                                            </Text>

                                            <Text style={[styles.txt, { fontSize: 16, marginTop: -5, width: wp('35') }]}>
                                                {item.pharmacy.nameEn}{'\n'}
                                            </Text>

                                            <Icon
                                                style={[styles.icon, { fontSize: 14, }]} />
                                        </View>


                                        {/*** dropDown*/}
                                        {this.state.dropDown &&item.nameEn==this.state.nameSelected?
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

                    }
                </ScrollView>
                <UserFooter tab={4} />


            </View>
        );

    }
}
const mapStateToProps = state => {
    return {
        MyOrder: state._MyOrder.MyOrder,
        loading: state._MyOrder.loading
    }
}
export default connect(mapStateToProps, { Get_MyOrder })(withNavigation(myOrder));

