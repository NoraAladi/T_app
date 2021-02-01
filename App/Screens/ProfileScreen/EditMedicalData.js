import styles from '../LoginScreen/style';
import styleLogin from '../LoginScreen/style';

import React, { Component } from 'react';
import {
    Text, View, ScrollView, TextInput,
    TouchableOpacity, Platform, FlatList, ImageBackground, I18nManager
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import AsyncStorage from '@react-native-community/async-storage';
import styleSignUp from '../SignupScreen/styleSignUp';
import RadioForm from 'react-native-simple-radio-button';
import HeaderNav from '../../Navigation/HeaderNav';
import BottomSheet from 'reanimated-bottom-sheet';
import { Icon } from 'native-base'
import { connect } from 'react-redux'
import Spinner from '../../Navigation/Spinner'
import { Get_USER_INFO } from '../../Actions/_get_userInfo';

var radio_props_one = [
    { label: g.YES, value: 0 },
    { label: g.NO, value: 1 }
];
var radio_props_two = [
    { label: g.YES, value: 0 },
    { label: g.NO, value: 1 }
];

class EditMedicalData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weight: 0,
            height: 0,
            smoking: radio_props_one[0].label,
            married: radio_props_two[0].label,

            loader: false,
            tabSelected_1: true,
            tabSelected_2: false,
            tabSelected_3: false,
            heightWithScroll: g.windowHeight,
            Diseases: [],
            selected: false , 
            elevation : 2 
        };
    }

    async componentDidMount() {
        await this.props.Get_USER_INFO()
        this.setState({
            weight: this.props.user_i.weight,
            height: this.props.user_i.height,
        })
    }

    renderContent = () => (
        <View
            style={{
                backgroundColor: '#00000020',
                height: this.state.heightWithScroll,
            }}
        >

            <View style={{
                backgroundColor: g.white, height: 525,
                marginTop: this.state.heightWithScroll - 525,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                width: g.windowWidth,
                // elevation: 3
            }}>
                <View style={{
                    flexDirection: 'row-reverse',
                    paddingHorizontal: 25, width: g.windowWidth,
                    justifyContent: 'space-between'
                }}>
                    <Text style={[styleLogin.login, { marginRight: 0, marginTop: 15, }]}>
                        {g.DISEASE}
                    </Text>
                    <Icon name='close' type='Ionicons'
                        style={{ fontSize: 22, marginTop: 15, }}
                        onPress={() => {
                            this.sheetRef.current.snapTo(0)
                            this.setState({
                                elevation : 2
                            })
                        }}
                    />
                </View>
                <Text style={[styleLogin.username, {
                    marginTop: 0, marginRight: 0,
                    flexDirection: 'row-reverse', paddingHorizontal: 25
                }]}>
                    {g.SELECT_MORE}
                </Text>
                <FlatList
                    extraData={this.state}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    style={{
                        padding: 16, transform: [{ rotateY: '180deg' }]
                    }}
                    data={['سكر', 'ضغط', 'قلب', 'سرطان', 'جلدية', 'مخ واعصاب', 'امراض الكبد', 'الانسحاب الرئوي', 'الذبحة الصدرية', 'متلازمات خارج الهرمية',]}
                    renderItem={({ item, index }) => (
                        <View >
                            <TouchableOpacity onPress={async () => {

                                //   await this.state.Diseases.push(item)
                                // if (!this.state.Diseases.includes(item)) {
                                //     await this.setState({
                                //         Diseases: [...this.state.Diseases, item],
                                //     })
                                // }
                                // else {
                                //     await this.setState({
                                //         Diseases: await this.removeItem(item),
                                //     })  
                                // }
                            }}>
                                <View style={{
                                    height: 40,
                                    margin: 4, borderRadius: 20,
                                    alignItems: 'center', justifyContent: 'center',
                                    backgroundColor: this.state.Diseases.includes(item) ? g.Blue : g.Light_Gray
                                }}>

                                    <Text style={{
                                        fontSize: 12,
                                        color: g.white,
                                        textAlign: 'center',
                                        transform: [{ rotateY: '180deg' }],
                                        padding: 15,
                                        fontFamily: Platform.OS == "android" ?  g.Bold  : g.Regular , fontWeight : Platform.OS == "ios" ? "800": null ,                                    }}>{item}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        </View>
    );

    sheetRef = React.createRef()

    handlePress = () => {
        this.sheetRef.current.snapTo(1)
    }

    render() {
        return (
            <View style={{ zIndex: -1 }}>
                <HeaderNav title={g.EDIT_MEDICAL} />


                {
                    this.props.loading ?
                        <View style={{ marginTop: hp('35%') }} >
                            <Spinner />
                        </View>

                        :
                        <View>


                            <BottomSheet
                                ref={this.sheetRef}
                                snapPoints={[-2000, this.state.heightWithScroll,]}
                                enabledContentGestureInteraction={true}
                                enabledInnerScrolling={true}
                                enabledContentTapInteraction={false}
                                renderContent={this.renderContent}
                                onCloseEnd = {()=>{
                                    this.setState({
                                        elevation : 2
                                    })
                                }}
                            />

                            {/**weight */}
                            <View>
                                <Text style={[styles.username, { marginTop: hp('2%') }]}>
                                    {g.WEIGHT}
                                </Text>

                                <View style={[styles.viewInput]}>

                                    <TextInput
                                        defaultValue={this.state.weight}
                                        placeholder={this.state.weight + ' KG'}
                                        keyboardType={'number-pad'}
                                        onChangeText={(weight) => {
                                            this.setState({
                                                weight: weight,
                                            })

                                        }}

                                        placeholderTextColor={g.Light_Gray}
                                        style={[styles.input]} />
                                </View>
                            </View>

                            {/**height */}
                            <View>
                                <Text style={[styles.username, { marginTop: hp('2%') }]}>
                                    {g.HEIGHT}
                                </Text>

                                <View style={[styles.viewInput]}>

                                    <TextInput
                                        defaultValue={this.state.height}
                                        placeholder={this.state.height + ' KG'}
                                        keyboardType={'number-pad'}
                                        onChangeText={(height) => {
                                            this.setState({
                                                height: height,
                                            })

                                        }}
                                        onEndEditing={async () => {

                                        }}
                                        placeholderTextColor={g.Light_Gray}
                                        style={[styles.input]} />
                                </View>
                            </View>

                            {/**diseases */}
                            <View>
                                <Text style={[styles.username, { marginTop: hp('2%') }]}>
                                    {g.DISEASE}
                                </Text>

                                <TouchableOpacity
                                    style={[styleSignUp.dropDownView,
                                    {
                                        alignItems: 'center', justifyContent: 'center',
                                        elevation:  this.state.elevation ,
                                    }]}
                                    onPress={() => {
                                        this.handlePress()
                                        this.setState({
                                            elevation : 0
                                        })
                                    }}
                                >
                                    <Text style={[styleSignUp.dropDownTxt,
                                    {
                                        textAlign: 'center',
                                        fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null,
                                        color: g.Bold_blue
                                    }]}
                                    >
                                        {g.DISEASE_SELECTED}
                                    </Text>

                                </TouchableOpacity>
                            </View>

                            {/*****Smoking */}
                            <View>
                                <Text style={[styles.login, { marginTop: hp('2'), fontSize: 18, }]}>
                                    {g.U_SMOKING}
                                </Text>

                                <View style={{
                                    flexDirection: 'row',
                                    transform: [{ rotate: '180deg' }],
                                    paddingHorizontal: 40,
                                    marginTop: 10,
                                }}>
                                    <RadioForm
                                        radio_props={radio_props_one}
                                        initial={0}
                                        formHorizontal={true}
                                        labelHorizontal={true}
                                        buttonSize={11}
                                        labelStyle={[styleSignUp.dropDownTxt,
                                        {
                                            transform: [{
                                                rotate: '180deg',
                                            }],
                                            paddingHorizontal: 10,


                                        }]}
                                        selectedButtonColor={'red'}
                                        buttonColor={'#000'}
                                        animation={false}
                                        onPress={async (value) => {
                                            this.setState({ smoking: radio_props_one[value].label })
                                        }}
                                    />
                                </View>
                            </View>

                            {/***Married */}
                            <View>
                                <Text style={[styles.login, { marginTop: hp('2'), fontSize: 18, }]}>
                                    {g.U_MARRIED}
                                </Text>

                                <View style={{
                                    flexDirection: 'row',
                                    transform: [{ rotate: '180deg' }],
                                    paddingHorizontal: 40,
                                    marginTop: 10,
                                }}>
                                    <RadioForm
                                        radio_props={radio_props_two}
                                        initial={0}
                                        formHorizontal={true}
                                        labelHorizontal={true}
                                        buttonSize={11}
                                        labelStyle={[styleSignUp.dropDownTxt,
                                        {
                                            transform: [{
                                                rotate: '180deg',
                                            }],
                                            paddingHorizontal: 10,


                                        }]}
                                        selectedButtonColor={'red'}
                                        buttonColor={'#000'}
                                        animation={false}
                                        onPress={async (value) => {
                                            this.setState({ married: radio_props[value].label })
                                        }}
                                    />
                                </View>
                            </View>

                            <TouchableOpacity style={[styles.btn, { marginTop: hp('6') }]}>
                                <Text style={[styles.txt_btn,]}>
                                    {g.SAVE}</Text>
                            </TouchableOpacity>

                        </View>
                }
            </View>
        );

    }
}

const mapStateToProps = state => {
    return {
        loading: state.user_info.loading,
        user_i: state.user_info.user_i,
    }
}
export default connect(mapStateToProps, { Get_USER_INFO })(withNavigation(EditMedicalData));

