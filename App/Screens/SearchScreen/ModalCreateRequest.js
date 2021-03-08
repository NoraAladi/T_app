import style from './style';

import React, { Component } from 'react';
import {
    Text, View, ScrollView, TextInput,
    TouchableOpacity, _View
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
                    "medicineId": 1,
                    "medicineUsage": null,
                    "quantity": 1,
                    'medicineName': 'Med1'
                }
            ],
            medicineName: '',
            selectedID: 1,
            selectIndex: 0,
            address: '',
            additionalItems: '',
            callMe: false

        };
    }




    async getMedicines() {
        try {
            let response = await axios.get(`${g.BASE_URL}/api/MasterData/SafeMedicines`,
                {
                    headers:
                    {
                        'accept': 'text/plain',
                        'authorizationKey': g.authorizationKey,
                    }
                })
            console.log('---- Call SAFE MEDICINE API ----');
            console.log(response.data);
            this.setState({
                Medicines: response.data,
                medicineName: response.data[0].medicineName
            })
        } catch (error) {
            console.log(error);
        }

    }

    componentDidMount() {
        AsyncStorage.getItem('user').then(val => {
            this.setState({
                address: JSON.parse(val).patient.address
            })
        })
        this.getMedicines()
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView nestedScrollEnabled>
                    <TouchableOpacity activeOpacity={1} >
                        <ScrollView   >
                            <Text style={[style.username1, { marginTop: hp('2%') }]}>
                                {g.NAME_TYPE}
                            </Text>

                            {
                                this.state.selectedMedicines.map((item, index) => {
                                    return (
                                        <View>
                                            <TouchableOpacity style={style.viewInput}
                                                onPress={async () => {
                                                    await this.setState({
                                                        modal: true,
                                                        selectIndex: index
                                                    })
                                                }}
                                            >
                                                <Text
                                                    numberOfLines={1}
                                                    style={style.inputMedicineName}>{item.medicineName}</Text>
                                            </TouchableOpacity>

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
                                                                if (this.state.quantity != 1) {
                                                                    await this.setState({
                                                                        selectIndex: index,
                                                                        quantity: item.quantity - 1
                                                                    })

                                                                    let items = [...this.state.selectedMedicines];
                                                                    let specificItem = { ...items[index] };
                                                                    specificItem.medicineId = this.state.selectedID
                                                                    specificItem.medicineName = item.medicineName;
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
                                                                {this.state.selectedID == index ? this.state.quantity : item.quantity}
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

                                                                let items = [...this.state.selectedMedicines];
                                                                let specificItem = { ...items[index] };
                                                                specificItem.medicineId = this.state.selectedID;
                                                                specificItem.medicineName = item.medicineName;
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
                                    );
                                })
                            }
                            <TouchableOpacity onPress={async () => {
                                await this.setState({
                                    selectIndex: 0,
                                    quantity: 1,
                                    selectedMedicines: [...this.state.selectedMedicines, {
                                        "medicineId": 1,
                                        "medicineUsage": null,
                                        "quantity": 1,
                                        'medicineName': 'Med1'

                                    }]
                                })
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

                            <TouchableOpacity style={style.btn} onPress={async () => {
                                let pharmacyOrderDetail = this.state.selectedMedicines.map(function (item) {
                                    delete item.medicineName;
                                    return item;
                                });
                                await this.props.Post_order(this.props.pharamcyId,
                                    this.state.additionalItems,
                                    this.state.address,
                                    null,
                                    this.state.callMe,
                                    pharmacyOrderDetail
                                )
                                if (this.props.orderResponse.status == 200) {
                                    this.props.cloaseModal()
                                    this.toast.show(this.props.orderResponse.data.message,10000)
                                    setTimeout(() => {
                                        this.props.navigation.navigate('ThanksDispense')
                                    }, 1000);
                                }
                                else
                                    this.toast.show(this.props.orderResponse.data.message,10000)

                            }}>
                                <Text style={style.txt_btn}>{g.SEND_REQUEST}</Text>
                            </TouchableOpacity>

                        </ScrollView>
                        <View style={{ height: 50 }}></View>
                        <Toast
                            ref={(toast) => this.toast = toast}
                            style={{ backgroundColor: '#000' }}
                            //    position='center'
                            positionValue={200}
                            fadeInDuration={120}
                            fadeOutDuration={1000}
                            textStyle={{ color: 'white', fontFamily: g.Regular }}
                        />
                    </TouchableOpacity>
                </ScrollView>

                <Modal
                    isOpen={this.state.modal}
                    swipeToClose={false}
                    backButtonClose={true}
                    coverScreen={true}
                    style={{
                        width: g.windowWidth,
                        height: g.windowHeight,
                        backgroundColor: '#00000001',
                    }}
                    onClosed={() => {
                        this.setState({ modal: false })
                    }}
                >
                    <View style={style.ModalContainer}>
                        <Text style={[style.titleModal]}>
                            {g.NAME_TYPE}
                        </Text>
                        <ScrollView nestedScrollEnabled
                            style={{ height: hp('40') }}>
                            {
                                this.state.Medicines.map((item, index) => {
                                    return (

                                        <View style={{
                                            paddingHorizontal: 25, marginTop: hp('1'),
                                        }}>
                                            <CheckBox
                                                onClick={async () => {
                                                    let items = [...this.state.selectedMedicines];
                                                    let specificItem = { ...items[this.state.selectIndex] };
                                                    specificItem.medicineId = item.id;
                                                    specificItem.medicineName = item.medicineName;
                                                    specificItem.quantity = this.state.quantity;

                                                    items[this.state.selectIndex] = specificItem;
                                                    await this.setState({ selectedMedicines: items });

                                                    console.log(JSON.stringify(this.state.selectedMedicines));
                                                    await this.setState({
                                                        selectedID: item.id,
                                                        medicineName: item.medicineName,
                                                        modal: false,
                                                    })


                                                }}
                                                isChecked={this.state.selectedID == item.id}
                                                checkBoxColor={g.Light_Gray}
                                                //    checkedCheckBoxColor={g.Light_Gray}
                                                leftText={item.medicineName}
                                                leftTextStyle={[style.modalText,]}
                                            />
                                        </View>

                                    );
                                })
                            }
                            <View style={{ height: hp('2') }} />

                        </ScrollView>
                    </View>
                </Modal>
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

