import style from './style';
import React, { Component } from 'react';
import {
    Text, View, FlatList, Image, ScrollView, TextInput, Platform
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CheckBox from 'react-native-check-box'
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux'
import Spinner from '../../Navigation/Spinner'
import { Post_order } from '../../Actions/PostOrderRequest';
import { Get_PrescribedPharmacyOrderDetails } from '../../Actions/getPrescribedPharmacyOrderDetails';

import Toast from 'react-native-easy-toast'

const img = [require('../../Images/syringe.png'), require('../../Images/drugs.png')]
let clinicVisitId = 0
class DispenseScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
            isChecked: false,
            total: 0,
            selectIndex: 0,
            selectedMedicines: [
                {
                    "medicineId": 1,
                    'medicineName': '',
                    "medicineUsage": '',
                    "price": 0,
                    "quantity": 1,
                }
            ],
            additionalItems: '',
            isUpdate: false,
            updatedAddress: ''

        }
    }
    async componentDidMount() {
        clinicVisitId = await AsyncStorage.getItem('clinicId')


        if (this.props.Prescribed.data) {
            this.setState({
                selectedMedicines: this.props.Prescribed.data.pharmacyOrderDetail,
                updatedAddress: this.props.Prescribed.data.deliveryAddress
            })
        }
        else {
            await this.props.Get_PrescribedPharmacyOrderDetails(this.props.navigation.getParam('pharmaID'), clinicVisitId)
            this.setState({
                selectedMedicines: this.props.Prescribed.data.pharmacyOrderDetail,
                updatedAddress: this.props.Prescribed.data.deliveryAddress

            })
        }
        this.props.Prescribed.data.pharmacyOrderDetail.map(item => {
            this.setState({
                total: this.state.total + item.price
            })
        })
    }
    render() {
        return (
            <>
                {
                    this.props.loading ?
                        <View style={{ marginTop: hp('40'), }} >
                            <Spinner />
                        </View>
                        :
                        <View style={{ flex: 1, height: '100%', zIndex: -1, }}>

                            {/* // Header  */}
                            <View style={[style.container, {
                                height: 70,
                                marginTop: Platform.OS == "ios" ? hp('5%') : null,
                            }]}>
                                <View style={{ flexDirection: 'row-reverse', marginRight: wp('8%') }}>
                                    <TouchableOpacity onPress={() => {
                                        this.props.navigation.pop()
                                    }}>
                                        <Icon name="arrowright" type="AntDesign"
                                            style={[style.arrow, { marginTop: Platform.OS == "ios" ? hp('1%') : hp('2%') }]} />
                                    </TouchableOpacity>
                                    <Text>     </Text>
                                    <Text style={style.Title}> {g.ROSHETA_NAME} </Text>
                                </View>
                            </View>

                            <ScrollView nestedScrollEnabled>
                                <View style={{ backgroundColor: g.BACK_SAMA, alignItems: 'center' }}>
                                    <Text style={style.txt2}> {g.REQUIRED_TYPES} </Text>

                                    <View style={[style.info, { flexDirection: 'column', marginTop: hp('2%') }]} >
                                        <FlatList
                                            key={(item) => { item.id }}
                                            showsVerticalScrollIndicator={false}
                                            onEndReachedThreshold={.5}
                                            data={this.state.selectedMedicines}
                                            renderItem={({ item, index }) => (
                                                <View style={{ flexDirection: 'column', }}>
                                                    <View style={{ flexDirection: 'row-reverse' }}>
                                                        <View style={style.view6}>
                                                            <Image source={img[index % img.length]}
                                                                style={{ width: 32, height: 31, marginTop: 0 }} />
                                                        </View>
                                                        <Text style={style.txt3}> {item.medicineName }  </Text>
                                                    </View>

                                                    <View style={{ flexDirection: 'row-reverse', margin: hp('1%') }}>
                                                        <Text style={{
                                                            textAlign: 'right', marginRight: wp('3%'), fontSize: 16,
                                                            fontFamily: g.Regular, marginTop: hp('2%'), color: g.Gray

                                                        }}> {g.QUANTITY} </Text>

                                                        <View style={{ padding: 10, }}>
                                                            <View style={{
                                                                flexDirection: 'row-reverse',
                                                                width: 135, height: 45,
                                                                borderRadius: 5, borderWidth: 1,
                                                                borderColor: g.Blue,
                                                                justifyContent: 'space-around',
                                                            }} >

                                                                {/**minues */}

                                                                <View style={{
                                                                    alignItems: 'center', justifyContent: 'center',
                                                                    borderLeftColor: g.Blue, borderLeftWidth: 1, width: 45
                                                                }} >
                                                                    <TouchableOpacity onPress={() => {
                                                                        if (this.state.quantity != 1) {
                                                                            this.setState({
                                                                                quantity: this.state.quantity - 1
                                                                            })
                                                                        }

                                                                    }}>
                                                                        <Icon name='minus' type='AntDesign'
                                                                            style={{ fontSize: 20, color: g.Blue }} />
                                                                    </TouchableOpacity>
                                                                </View>

                                                                {/**value */}
                                                                <View style={{
                                                                    alignItems: 'center', justifyContent: 'center',
                                                                    width: 45
                                                                }} >
                                                                    <Text style={{ fontSize: 18 }}>
                                                                        {this.state.selectIndex == index ? this.state.quantity : item.quantity}
                                                                    </Text>
                                                                </View>

                                                                {/**plus */}
                                                                <View style={{
                                                                    alignItems: 'center', justifyContent: 'center',
                                                                    borderRightColor: g.Blue, borderRightWidth: 1, width: 45
                                                                }} >
                                                                    <TouchableOpacity onPress={async () => {
                                                                        await this.setState({
                                                                            quantity: this.state.quantity + 1,
                                                                            selectIndex: index
                                                                        })
                                                                        let items = [...this.state.selectedMedicines];
                                                                        let specificItem = { ...items[index] };

                                                                        specificItem.quantity = this.state.quantity;
                                                                        items[index] = specificItem;
                                                                        await this.setState({ selectedMedicines: items });
                                                                        console.log(JSON.stringify(this.state.selectedMedicines))
                                                                    }}>
                                                                        <Icon name='plus' type='AntDesign'
                                                                            style={{ fontSize: 20, color: g.Blue }} />
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </View>
                                                        </View>

                                                    </View>
                                                    <View style={style.line} />
                                                </View>
                                            )} />

                                        

                                    </View>

                                </View>
                                <View style={{ padding: 30, }}>
                                    <CheckBox
                                        onClick={() => {
                                            this.setState({
                                                isChecked: !this.state.isChecked
                                            })
                                        }}
                                        isChecked={this.state.isChecked}
                                        checkBoxColor={g.Light_Gray}
                                        checkedCheckBoxColor={g.Light_Gray}
                                        leftText={g.CHECK_BOX_TEXT}
                                        leftTextStyle={[style.input1, { textAlign: 'right', marginTop: -5 }]}
                                    />
                                </View>
                                <Text style={[style.username1, { marginTop: hp('-2%'), textAlign: 'right' }]}>
                                    {g.NOTES}
                                </Text>

                                <View style={style.view5}>
                                    <TextInput
                                        placeholder={g.WRITE_HERE}
                                        placeholderTextColor={g.Light_Gray}
                                        style={style.input}
                                        onChangeText={(val) => { this.setState({ additionalItems: val }) }}

                                    />
                                </View>

                                <Text style={[style.username1, { marginTop: hp('4%'), textAlign: 'right' }]}>
                                    {g.REQUEST_DATA}
                                </Text>

                                <View style={style.view7} >
                                    <Text style={{
                                        fontSize: 16, fontFamily: g.Regular, marginRight: wp('10'), textAlign: 'right'
                                    }}>
                                        {g.FROM_PARMA}
                                    </Text>

                                    <View style={style.view8}>
                                        <View style={[style.view_img, {
                                            backgroundColor: g.Move
                                        }]}>
                                            <Image source={require('../../Images/listfour.png')}
                                                style={{ width: 30, height: 30, marginTop: 0 }} />
                                        </View>
                                        <View>
                                            <Text style={[style.doctor_name, {
                                                color: 'black',
                                                fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null,
                                            }]}>
                                                {this.props.navigation.getParam('pharmaName')}</Text>

                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={[style.doctor_name, { color: 'black', fontFamily: g.Regular }]}>
                                                    {this.props.Prescribed.data.pharmacyAddress}</Text>
                                                <Icon name="location-pin" type="MaterialIcons"
                                                    style={[style.arrow, { marginTop: 5, color: 'black' }]} />
                                            </View>
                                        </View>
                                    </View>

                                    <View style={[style.view8, { borderBottomWidth: 0 }]}>

                                        <View >
                                            <Text style={[style.doctor_name, {
                                                color: 'black',
                                                fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null,
                                            }]}>
                                                {g.SHIPPING}</Text>

                                            <View style={{ flexDirection: 'row' }}>
                                                <TextInput
                                                    editable={this.state.isUpdate}
                                                    style={[style.doctor_name, {
                                                        color: 'black', fontFamily: g.Regular, marginTop: 5,
                                                        borderWidth: this.state.isUpdate ? .5 : 0, borderColor: g.Gray, borderRadius: 5,
                                                    }]}
                                                    defaultValue={this.state.updatedAddress}
                                                    onChangeText={(val) => { this.setState({ updatedAddress: val }) }}
                                                />

                                                <Icon name="location-pin" type="MaterialIcons"
                                                    style={[style.arrow, { marginTop: 15, color: 'black' }]} />
                                            </View>
                                        </View>

                                        <TouchableOpacity onPress={() => {
                                            this.setState({
                                                isUpdate: !this.state.isUpdate
                                            })

                                        }}>
                                            <Text style={[style.doctor_name, {
                                                color: g.Blue, fontSize: 18,
                                                fontFamily: g.Regular, marginTop: 25,
                                            }]}>
                                                {g.UPDATE}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <TouchableOpacity style={style.btn} onPress={async () => {
                                    let pharmacyOrderDetail = this.state.selectedMedicines.map(function (item) {
                                        delete item.medicineName;
                                        delete item.price;

                                        return item;
                                    });
                                    console.log(pharmacyOrderDetail);
                                    await this.props.Post_order(
                                        this.props.navigation.getParam('pharmaID'),
                                        this.state.additionalItems,
                                        this.state.updatedAddress,
                                        clinicVisitId,
                                        this.state.isChecked,
                                        pharmacyOrderDetail
                                    )
                                    if (this.props.orderResponse.status == 200) {
                                        this.toast.show(this.props.orderResponse.data.message,10000)
                                        setTimeout(() => {
                                            this.props.navigation.navigate('ThanksDispense')
                                        }, 10000);
                                    }
                                    else
                                        this.toast.show(this.props.orderResponse.data.message)

                                    // this.props.navigation.replace('ThanksDispense')
                                }}>
                                    <Text style={style.txt_btn}>{g.SEND_REQUEST}</Text>
                                </TouchableOpacity>



                            </ScrollView>
                            <Toast
                                ref={(toast) => this.toast = toast}
                                style={{ backgroundColor: '#000' }}
                                //    position='center'
                                positionValue={200}
                                fadeInDuration={120}
                                fadeOutDuration={1000}
                                textStyle={{ color: 'white', fontFamily: g.Regular }}
                            />
                        </View>
                }
            </>
        );

    }
}
const mapStateToProps = state => {
    return {
        orderResponse: state.orderResponse.orderResponse,
        Prescribed: state.Prescribed.Prescribed,
        loading: state.Prescribed.loading

    }
}

export default connect(mapStateToProps, { Post_order, Get_PrescribedPharmacyOrderDetails })(withNavigation(DispenseScreen));


