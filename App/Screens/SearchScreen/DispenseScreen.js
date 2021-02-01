import style from './style';
import React, { Component } from 'react';
import {
    Text, View, FlatList, Image, ScrollView, TextInput, Platform
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import i18n from '../../i18n';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CheckBox from 'react-native-check-box'

const img = [require('../../Images/syringe.png'), require('../../Images/drugs.png')]

class SearchList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
            isChecked: false

        }
    }

    render() {
        return (

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

                        <View style={[style.info, { marginTop: hp('2%') }]} >
                            <FlatList
                                key={(item) => { item.id }}
                                showsVerticalScrollIndicator={false}
                                onEndReachedThreshold={.5}
                                onEndReached={() => { console.log('hegazy') }}
                                data={[1, 1, 1]}
                                renderItem={({ item, index }) => (
                                    <View style={{ flexDirection: 'column' }}>
                                        <View style={{ flexDirection: 'row-reverse' }}>
                                            <View style={style.view6}>
                                                <Image source={img[index % img.length]}
                                                    style={{ width: 32, height: 31, marginTop: 0 }} />
                                            </View>
                                            <Text style={style.txt3}> hydrochlorothiazide 1G FILM COATED hydrochlorothiazide  </Text>
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
                                                            {this.state.quantity}
                                                        </Text>
                                                    </View>

                                                    {/**plus */}
                                                    <View style={{
                                                        alignItems: 'center', justifyContent: 'center',
                                                        borderRightColor: g.Blue, borderRightWidth: 1, width: 45
                                                    }} >
                                                        <TouchableOpacity onPress={() => {
                                                            this.setState({
                                                                quantity: this.state.quantity + 1
                                                            })
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
                    <Text style={[style.username1, { marginTop: hp('-2%') ,textAlign : 'right' }]}>
                        {g.NOTES}
                    </Text>

                    <View style={style.view5}>
                        <TextInput
                            placeholder={g.WRITE_HERE}
                            placeholderTextColor={g.Light_Gray}
                            style={style.input} />
                    </View>

                    <Text style={[style.username1, { marginTop: hp('4%') , textAlign : 'right' }]}>
                        {g.REQUEST_DATA}
                    </Text>

                    <View style={style.view7} >
                        <Text style={{
                            fontSize: 16, fontFamily: g.Regular, marginRight: wp('10'), textAlign : 'right'
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
                            <TouchableOpacity onPress={() => {

                            }}>
                                <Text style={[style.doctor_name, {
                                    color: 'black',
                                    fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null,
                                }]}>
                                    صيدليات زكري</Text>

                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[style.doctor_name, { color: 'black', fontFamily: g.Regular }]}>
                                        ٢٣ ش صادق الرافعي من شارع الحجاز - مصر الجديدة</Text>
                                    <Icon name="location-pin" type="MaterialIcons"
                                        style={[style.arrow, { marginTop: 5, color: 'black' }]} />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={[style.view8, { borderBottomWidth: 0 }]}>

                            <TouchableOpacity onPress={() => {

                            }}>
                                <Text style={[style.doctor_name, {
                                    color: 'black',
                                    fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null,
                                }]}>
                                    {g.SHIPPING}</Text>

                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[style.doctor_name, { color: 'black', fontFamily: g.Regular }]}>
                                        ٢٣ ش صادق الرافعي من شارع الحجاز - مصر الجديدة</Text>
                                    <Icon name="location-pin" type="MaterialIcons"
                                        style={[style.arrow, { marginTop: 5, color: 'black' }]} />
                                </View>
                            </TouchableOpacity>
                            <View>
                                <Text style={[style.doctor_name, {
                                    color: g.Blue, fontSize: 18,
                                    fontFamily: g.Regular,
                                }]}>
                                    {g.UPDATE}</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={style.btn} onPress={() => {
                        this.props.navigation.replace('ThanksDispense')
                    }}>
                        <Text style={style.txt_btn}>{g.SEND_REQUEST}</Text>
                    </TouchableOpacity>



                </ScrollView>
            </View>
        );

    }
}
export default withNavigation(SearchList);
