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
                                {g.NAME_TYPE}
                            </Text>

                            {this.state.addAnotherItem ?
                                <FlatList
                                    nestedScrollEnabled
                                    key={(item) => { item.id }}
                                    showsVerticalScrollIndicator={false}
                                    data={this.state.selectedMedicines}
                                    extraData={this.state.selectedMedicines}
                                    renderItem={({ item, index }) => (
                                        <View >

                                            <View style={style.viewInput}>
                                                <TextInput
                                                    numberOfLines={1}
                                                    placeholder={'الصنف المطلوب'}
                                                    style={style.inputMedicineName}
                                                    defaultValue={item.medicineName}

                                                    onChangeText={async (val) => {
                                                        if (val) {
                                                            await this.setState({
                                                                // medicineName: val,
                                                                typing: true,
                                                                selectIndex: index
                                                            })
                                                            this.setState({
                                                                filterData: this.state.Medicines.filter((el) => el.medicineName.toLowerCase().match(val.trim().toLowerCase()))
                                                            })

                                                        }
                                                        else {
                                                            await this.setState({
                                                                //  medicineName: val,
                                                                typing: false,
                                                                selectIndex: index
                                                            })
                                                        }
                                                    }}
                                                // {item.medicineName}
                                                />
                                            </View>

                                            {/**searchView */}
                                            {this.state.typing && this.state.selectIndex == index ?
                                                <View>
                                                    <ScrollView nestedScrollEnabled
                                                        style={{ maxHeight: hp('25') }}>
                                                        {
                                                            this.state.filterData.map((item) => {
                                                                return (
                                                                    <View style={{
                                                                        paddingHorizontal: 25, marginTop: hp('1'),
                                                                    }}>
                                                                        <TouchableOpacity
                                                                            onPress={async () => {

                                                                                let items = this.state.selectedMedicines;
                                                                                let specificItem = items[this.state.selectIndex];
                                                                                specificItem.medicineId = item.id;
                                                                                specificItem.medicineName = item.medicineName;
                                                                                specificItem.quantity = this.state.quantity;

                                                                                items[this.state.selectIndex] = specificItem;
                                                                                await this.setState({ selectedMedicines: items });

                                                                                console.log(JSON.stringify(this.state.selectedMedicines));
                                                                                await this.setState({
                                                                                    selectedID: item.id,
                                                                                    // medicineName: item.medicineName,
                                                                                })
                                                                                this.setState({
                                                                                    typing: false
                                                                                })

                                                                            }}
                                                                        >
                                                                            <Text style={style.modalText}>{item.medicineName}</Text>
                                                                        </TouchableOpacity>

                                                                    </View>

                                                                );
                                                            })
                                                        }
                                                        <View style={{ height: hp('2') }} />
                                                    </ScrollView>
                                                </View>
                                                : null}

                                            <View style={{
                                                flexDirection: 'row-reverse',
                                            }} >
                                                <Text style={[style.username1, { marginTop: hp('2.5%') }]}>
                                                    {g.QUANTITY}
                                                </Text>
                                                {/**Box counter */}
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

                                                            <TouchableOpacity onPress={async () => {
                                                                if (item.quantity != 1) {
                                                                    await this.setState({
                                                                        selectIndex: index,
                                                                        quantity: item.quantity - 1
                                                                    })

                                                                    let items = this.state.selectedMedicines;
                                                                    let specificItem = items[index];
                                                                    specificItem.quantity = this.state.quantity;
                                                                    items[this.state.selectIndex] = specificItem;
                                                                    await this.setState({ selectedMedicines: items });
                                                                    console.log(JSON.stringify(this.state.selectedMedicines))
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
                                                                {this.state.selectIndex == index ? this.state.quantity :
                                                                    item.quantity
                                                                }
                                                            </Text>
                                                        </View>

                                                        {/**plus */}
                                                        <View style={{
                                                            alignItems: 'center', justifyContent: 'center',
                                                            borderRightColor: g.Blue, borderRightWidth: 1, width: 45
                                                        }} >
                                                            <TouchableOpacity onPress={async () => {
                                                                await this.setState({
                                                                    selectIndex: index,
                                                                    quantity: item.quantity + 1
                                                                })

                                                                let items = this.state.selectedMedicines;
                                                                let specificItem = items[index];
                                                                specificItem.quantity = this.state.quantity;

                                                                items[this.state.selectIndex] = specificItem;
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
                                        </View>
                                    )} />
                                : null
                            }
                            <TouchableOpacity onPress={async () => {

                                await this.setState({
                                    selectIndex: -1,
                                    quantity: 1,
                                    medicineName: ''
                                    // selectedMedicines: [...this.state.selectedMedicines, {
                                    //     "medicineId": 0,
                                    //     "medicineUsage": null,
                                    //     "quantity": 1,
                                    //     'medicineName': ''
                                    // }]
                                })
                                var newStateArray = this.state.selectedMedicines.slice();
                                newStateArray.push({
                                    "medicineId": 0,
                                    "medicineUsage": null,
                                    "quantity": 1,
                                    'medicineName': ''
                                });
                                await this.setState({ selectedMedicines: newStateArray });



                                console.log(JSON.stringify(this.state.selectedMedicines))


                            }}>
                                <Text style={[style.username1, style.add, { fontFamily: g.Bold }]}>
                                    {g.ADD}
                                </Text>
                            </TouchableOpacity>
                            <View />

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
                            <Text style={[style.username1, { marginTop: hp('2%') }]}>
                                {g.NOTES}
                            </Text>

                            <View style={style.view5}>
                                <TextInput
                                    onChangeText={(val) => { this.setState({ additionalItems: val }) }}
                                    placeholder={g.WRITE_HERE}
                                    placeholderTextColor={g.Light_Gray}
                                    style={style.input} />
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
                                await this.props.Post_order(this.props.pharamcyId,
                                    this.state.additionalItems,
                                    this.state.updatedAddress,
                                    null,
                                    this.state.callMe,
                                    pharmacyOrderDetail
                                )
                                if (this.props.orderResponse.status == 200) {
                                    this.props.cloaseModal()
                                  //  this.toast.show(this.props.orderResponse.data.message, 3000)
                                        this.props.navigation.navigate('ThanksDispense')
                                }
                                else
                                    //this.toast.show(this.props.orderResponse.data.message, 5000)
                                    this.toast.show('يجب إدخال الصنف المطلوب بشكل سليم', 5000)

                            }}>
                                <Text style={style.txt_btn}>{g.SEND_REQUEST}</Text>
                            </TouchableOpacity>

                        </ScrollView>
                        <View style={{ height: 50 }}></View>
                        <Toast
                            ref={(toast) => this.toast = toast}
                            style={{ backgroundColor: '#000' }}
                            position='center'
                            fadeInDuration={120}
                            fadeOutDuration={1000}
                            textStyle={{ color: 'white', fontFamily: g.Regular }}
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

