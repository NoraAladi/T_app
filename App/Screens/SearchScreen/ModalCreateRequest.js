import style from './style';

import React, { Component } from 'react';
import {
    Text, View, ScrollView, TextInput,
    TouchableOpacity, _View, FlatList
} from 'react-native';
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import Modal from 'react-native-modalbox';
import axios from 'axios';
import CheckBox from 'react-native-check-box'
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux'
import Spinner from '../../Navigation/Spinner'
import { Post_order } from '../../Actions/PostOrderRequest';
import Toast from 'react-native-easy-toast'
import { withNavigation } from 'react-navigation';

class ModalCreateRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
            isChecked: false,
            modal: false,
            Medicines: [],
            selectedMedicines: [
                {
                    "medicineId": 0,
                    "medicineUsage": null,
                    "quantity": 1,
                    'medicineName': ''
                }
            ],
            medicineName: '',
            selectedID: 1,
            selectIndex: -1,
            address: '',
            additionalItems: '',
            callMe: false,

            medicineNameSearch: '',
            typing: false,

            filterData: [],
            isUpdate: false,
            updatedAddress: '',
            addAnotherItem: true


        };
    }




    async getMedicines() {
        const Token = await AsyncStorage.getItem('app_Token');

        try {
            let response = await axios.get(`${g.BASE_URL}/api/MasterData/SafeMedicines`,
                {
                    headers:
                    {
                        'accept': 'text/plain',
                        'authorizationKey': g.authorizationKey,
                        'Authorization': `Bearer ${Token}`,
                    }
                })
            console.log('---- Call SAFE MEDICINE API ----');
            console.log(response.data);
            this.setState({
                Medicines: response.data,
                filterData: response.data,
                medicineName: ''//response.data[0].medicineName
            })
        } catch (error) {
            console.log(error);
        }

    }

    componentDidMount() {
        AsyncStorage.getItem('userAddress').then(val => {
            this.setState({
                address: val,
                updatedAddress: val
            })
        })
        this.getMedicines()
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView nestedScrollEnabled>
                    <TouchableOpacity activeOpacity={1} >
                        <ScrollView nestedScrollEnabled >
                            <Text style={[style.username1, { marginTop: hp('2%') }]}>
                                {'تفاصيل الطلب'}
                            </Text>

                            <View style={style.view5}>
                                <TextInput
                                    onChangeText={(val) => { this.setState({ additionalItems: val }) }}
                                    placeholder={'تفاصيل الطلب ...'}
                                    placeholderTextColor={g.Light_Gray}
                                    style={style.input} />
                            </View>


                            <View style={{ padding: 30, }}>
                                <CheckBox
                                    onClick={() => {
                                        this.setState({
                                            callMe: !this.state.callMe
                                        })
                                    }}
                                    isChecked={this.state.callMe}
                                    checkBoxColor={g.Light_Gray}
                                    checkedCheckBoxColor={g.Light_Gray}
                                    leftText={g.CHECK_BOX_TEXT}
                                    leftTextStyle={[style.input1, { textAlign: 'right', marginTop: -5 }]}
                                />
                            </View>




                            {/**********************address */}

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
                                            multiline
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

                            {/********************** */}




                            <TouchableOpacity style={style.btn} onPress={async () => {

                                let pharmacyOrderDetail = this.state.selectedMedicines.map(function (item) {
                                    delete item.medicineName;
                                    return item;
                                });
                                if (this.state.additionalItems != '') {
                                    await this.props.Post_order(this.props.pharamcyId,
                                        this.state.additionalItems,
                                        this.state.updatedAddress,
                                        null,
                                        this.state.callMe,
                                        null
                                        //  pharmacyOrderDetail
                                    )
                                    if (this.props.orderResponse.status == 200) {
                                        this.props.cloaseModal()
                                        //  this.toast.show(this.props.orderResponse.data.message, 3000)
                                        this.props.navigation.navigate('ThanksDispense')
                                    }
                                    else
                                        //this.toast.show(this.props.orderResponse.data.message, 5000)
                                        this.toast.show('يجب إدخال الصنف المطلوب بشكل سليم', 5000)
                                }
                                else
                                    this.toast.show('تفاصيل الطلب !', 2500)


                            }}>
                                <Text style={style.txt_btn}>{g.SEND_REQUEST}</Text>
                            </TouchableOpacity>

                        </ScrollView>
                        <View style={{ height: 50 }}></View>
                        <Toast
                            ref={(toast) => this.toast = toast}
                            style={{ backgroundColor: g.toast }}
                            position='center'
                            fadeInDuration={120}
                            fadeOutDuration={1000}
                            textStyle={{ color: '#000', fontFamily: g.Regular, fontSize: 16, }}
                        />
                    </TouchableOpacity>
                </ScrollView>


            </View>

        );
    }
}
const mapStateToProps = state => {
    return {
        loading: state.orderResponse.loading,
        orderResponse: state.orderResponse.orderResponse,


    }
}

export default connect(mapStateToProps, { Post_order })(withNavigation(ModalCreateRequest));

