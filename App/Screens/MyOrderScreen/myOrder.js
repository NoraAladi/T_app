import styles from './style';
import React, { Component } from 'react';
import {
    Text, View, ScrollView, TouchableWithoutFeedback,
    TouchableOpacity, Image, ActivityIndicator,
    FlatList, Modal, Platform
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import UserFooter from '../../Navigation/UserFooter';
import { Get_MyOrder } from '../../Actions/getMyOrder';
import { Get_PharmacyOrderDetails } from '../../Actions/PharmacyOrderDetails';
import { Cancel_Order } from '../../Actions/cancelOrderAction';
import Toast from 'react-native-easy-toast'

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
            nameSelected: '',
            selectIndex: -1,
            orderId: -1,
            ModalAlert: false,
            loadPagination: false,
            refreshKey:true


        };
        this.page = 1
    }
    async componentDidMount() {
        this.props.navigation.addListener('willFocus', async () => {
            this.page = 1
            await this.props.Get_MyOrder(1)
            this.setState({
                refreshKey: !this.state.refreshKey
            })
        });
    }
    async _cancelOrder() {
        await this.props.Cancel_Order(this.state.orderId)
        if (this.props.cancelOrder.status == 200) {
            this.toast.show('تم إلغاء الطلب بنجاح', 2000)

            this.setState({
                selectIndex: -1,
                dropDown: false,
            })
            this.page = 1
            await this.props.Get_MyOrder(1)
        }
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
                <Header key={this.state.refreshKey} title={g.REQUEST} />


                <View style={styles.height} />


                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    {this.props.loading && !this.state.loadPagination ?
                        <View style={styles.spinnerTop} >
                            <Spinner />
                        </View>

                        : this.props.MyOrder == '' ?
                            <View style={{
                                height: 200,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Text style={styles.noData}>
                                    {'لم يتم عمل طلبات بعد'}
                                </Text>
                            </View>
                            :
                            <View style={styles.FlatListHeight}>
                                <FlatList

                                    showsVerticalScrollIndicator={false}
                                    nestedScrollEnabled
                                    onEndReachedThreshold={.1}
                                    onEndReached={async () => {
                                        if (this.page < this.props.totalPages) {
                                            this.page = this.page + 1
                                            this.setState({ loadPagination: true })
                                            await this.props.Get_MyOrder(this.page)
                                            this.setState({ loadPagination: false })
                                        }

                                    }}
                                    data={this.props.MyOrder}
                                    renderItem={({ item, index }) => (

                                        <View style={[styles.card, { flexDirection: 'column' }]}>
                                            <TouchableOpacity onPress={async () => {

                                                await this.setState({
                                                    dropDown: !this.state.dropDown,
                                                    selectIndex: index
                                                })
                                                if (this.state.dropDown)
                                                    this.props.Get_PharmacyOrderDetails(item.id)

                                            }}>
                                                <View style={{ flexDirection: 'row-reverse', }}>
                                                    <Text style={[styles.txt, styles.dateRequest]}>
                                                        {g.REQUEST_DATE}
                                                    </Text>
                                                    <Text style={[styles.txt, styles.provider]}>
                                                        {g.PROVIDER}
                                                    </Text>


                                                    <Icon
                                                        name={this.state.dropDown && this.state.selectIndex == index ? 'up' : 'down'} type='AntDesign'
                                                        style={[styles.icon, styles.iconSize]} />

                                                </View>

                                                <View style={styles.viewValues}>
                                                    <Text style={[styles.txt, { fontSize: 16, marginTop: -5, width: wp('40') }]}>

                                                        {ArabicNumbers(this.arabicDate(moment(item.created).format('DD MMMM YYYY')))
                                                        }
                                                        {'\n'}
                                                    </Text>

                                                    <Text style={[styles.txt, { fontSize: 16, marginTop: -5, width: wp('35') }]}>
                                                        {item.pharmacy.nameAr}{'\n'}
                                                    </Text>


                                                </View>
                                            </TouchableOpacity>


                                            {/*** dropDown*/}
                                            {this.state.dropDown && this.state.selectIndex == index ?
                                                <View style={{ flex: 1 }}>
                                                    <Text style={[styles.txt, { color: g.Gray, fontSize: 12 }]}>
                                                        {g.STATUS}
                                                    </Text>
                                                    <View style={{ flexDirection: 'row-reverse' }}>
                                                        <Text style={[styles.txt, {
                                                            fontSize: 16, color:
                                                                this.props.pharmacyOrderDetails.status == 'تم رفض الطلب' ? '#e02020'
                                                                    : this.props.pharmacyOrderDetails.status == 'تم إرسال الطلب' ? g.Blue :
                                                                        '#34D900', marginTop: -5
                                                        }]}>{this.props.pharmacyOrderDetails.status}</Text>
                                                        <Text style={[styles.txt, { fontSize: 12 }]}>{'   '}{this.props.pharmacyOrderDetails.comment == '' ? '' : `( ${this.props.pharmacyOrderDetails.comment} )`}</Text>
                                                    </View>

                                                    <Text style={[styles.txt, { color: g.Gray, fontSize: 12 }]}>
                                                        {g.REQURIED_ITEMS}
                                                    </Text>


                                                    <ScrollView
                                                        nestedScrollEnabled
                                                        scrollEnabled
                                                        style={{ height:this.props.pharmacyOrderDetails.pharmacyOrderDetails==''?0: hp('20'), width: '100%' }}>
                                                        <TouchableWithoutFeedback onPress={() => { }}>
                                                            <FlatList
                                                                showsVerticalScrollIndicator={false}
                                                                nestedScrollEnabled
                                                                onEndReachedThreshold={.1}
                                                                onEndReached={() => { console.log('saad') }}
                                                                data={this.props.pharmacyOrderDetails.pharmacyOrderDetails}
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
                                                                                />
                                                                            </View>

                                                                            <View style={{
                                                                                marginRight: 15, width: wp('55'),
                                                                            }}>


                                                                                <Text style={[styles.txt, { fontSize: 14, marginTop: 10, }]}>
                                                                                    {item.medicine.medicineName}
                                                                                </Text>
                                                                            </View>

                                                                            <Text style={[styles.txt, { fontSize: 14,marginTop:10 }]}>
                                                                                {ArabicNumbers(item.quantity + '×')}
                                                                            </Text>

                                                                        </View>

                                                                    </View>
                                                                )} />
                                                        </TouchableWithoutFeedback>
                                                    </ScrollView>


                                                    {this.props.pharmacyOrderDetails.additionalItems == '' ? null :
                                                        <View
                                                            style={{
                                                                width: '100%', paddingVertical: 10, marginTop:5 ,borderWidth:1,borderColor:g.Light_Gray,
                                                                borderRadius: 7, marginLeft: 'auto', marginRight: 'auto'
                                                            }}>
                                                            <Text style={{ fontFamily: g.Regular, paddingHorizontal: 5, textAlign: 'right' }}>
                                                                {this.props.pharmacyOrderDetails.additionalItems}
                                                            </Text>

                                                        </View>}
                                                    
                                                    {this.props.pharmacyOrderDetails.status == 'تم إرسال الطلب' ?

                                                        <TouchableOpacity style={[styles.btn, { backgroundColor: g.danger }]}
                                                            onPress={async () => {
                                                                await this.setState({
                                                                    ModalAlert: true,
                                                                    orderId: item.id
                                                                })

                                                            }}>
                                                            {this.props.cancelLoading ?
                                                                <Spinner color={'white'} />
                                                                :
                                                                <Text style={styles.txt_btn}>{'إلغاء الطلب'}</Text>
                                                            }
                                                        </TouchableOpacity> : null}
                                                </View>
                                                : null}



                                        </View>
                                    )}
                                />

                            </View>

                    }
                    {this.state.loadPagination ?
                        <ActivityIndicator size='small' color='gray' style={{ marginTop: 5 }} />
                        : null}
                </ScrollView>
                <UserFooter tab={4} />

                <Toast
                    ref={(toast) => this.toast = toast}
                    style={{
                        backgroundColor: g.toast,
                        width: '85%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    position='center'
                    // positionValue={220}
                    fadeInDuration={120}
                    fadeOutDuration={1000}
                    textStyle={{
                        fontFamily: g.Regular,
                        textAlign: 'center',
                        fontSize: 16,
                        color:'#000'
                    }}
                />

                <Modal
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
                            <ScrollView showsVerticalScrollIndicator={false}>
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
                                    {'هل أنت متأكد من إلغاء الطلب؟'}
                                </Text>
                                <Text style={{
                                    fontFamily: g.Regular, fontSize: 14,
                                    textAlign: 'center', width: g.windowWidth - 100,
                                }}>
                                    {`في حالة الإلغاء سيتم حذف الطلب بالكامل من قائمة طلباتك و يجب عليك عمل طلب جديد.`}
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
                                        this.setState({
                                            ModalAlert: false
                                        })
                                        this._cancelOrder()
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
                </Modal>

            </View>
        );

    }
}
const mapStateToProps = state => {
    return {
        MyOrder: state._MyOrder.MyOrder,
        loading: state._MyOrder.loading,
        totalPages: state._MyOrder.totalPages,

        cancelLoading: state.cancelOrder.cancelLoading,
        cancelOrder: state.cancelOrder.cancelOrder,


        pharmacyOrderDetails: state.pharmacyOrderDetails.pharmacyOrderDetails,
        loading2: state.pharmacyOrderDetails.loading,


    }
}
export default connect(mapStateToProps, { Get_MyOrder, Get_PharmacyOrderDetails, Cancel_Order })(withNavigation(myOrder));

